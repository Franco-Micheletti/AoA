const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function getOrcreateGame (gameInfo) {
  const gameExist = await prisma.game.findFirst({
    where: {
      unique_id: gameInfo.unique_id
    }
  })
  if (gameExist === null) {
    const game = await prisma.game.create({
      data: {
        unique_id: gameInfo.unique_id,
        map_name: gameInfo.map_name,
        max_player: gameInfo.max_player,
        matchtype_id: gameInfo.matchtype_id,
        description: gameInfo.description,
        started: gameInfo.started,
        finished: gameInfo.finished
      }
    })
    return game
  } else {
    return gameExist
  }
}

async function getOrCreatePlayerFromGame (playerInfo, profiles) {
  const existingPlayer = await prisma.player.findFirst({
    where: {
      profile_id: playerInfo.profile_id
    }
  }
  )

  if (existingPlayer === null) {
    const profile = profiles.filter((profile) => profile.profile_id === playerInfo.profile_id)

    const player = await prisma.player.create({
      data: {
        profile_id: playerInfo.profile_id,
        country_code: playerInfo.country_code,
        alias: playerInfo.alias,
        last_update_at: new Date(),
        steam_id: profile[0].name.split('/')[2],
        hasToBeUpdated: true
      }
    })

    return player
  } else {
    return existingPlayer
  }
}

async function createGamePlayer (playerInfo, game, profiles) {
  const player = await getOrCreatePlayerFromGame(playerInfo, profiles)

  // Check if the gamePlayer exist , this is a M-M relation between a game and a player
  const getExistingGamePlayer = await prisma.gamePlayer.findFirst({
    where: {
      game_id: game.id,
      player_id: player.id
    }
  }
  )

  if (getExistingGamePlayer === null) {
    const newGamePlayer = await prisma.gamePlayer.create({
      data: {
        result_id: playerInfo.result_id,
        team_id: playerInfo.team_id,
        color_id: playerInfo.color_id,
        civ_id: playerInfo.civ_id,
        old_rating: playerInfo.old_rating,
        new_rating: playerInfo.new_rating,
        game: {
          connect: { id: game.id }
        },
        player: {
          connect: { id: player.id }
        }
      }
    })
  }
}

export async function createPlayerGames (gameData, profiles) {
  try {
    for (const game of gameData) {
      const newGame = await getOrcreateGame(game)
        .catch(async (e) => {
          console.error(e)
          process.exit(1)
        })
      for (const playerInfo of game.gamePlayers) {
        createGamePlayer(playerInfo, newGame, profiles)
          .catch(async (e) => {
            console.error(e)
            process.exit(1)
          })
      }
    }
    return { code: 1 }
  } catch (error) {
    return { code: 0, error: error.message }
  }
}
