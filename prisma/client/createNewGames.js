const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createNewGame (gameInfo) {
  const game = await prisma.game.upsert({
    where: {
      unique_id: gameInfo.unique_id
    },
    create: {
      unique_id: gameInfo.unique_id,
      map_name: gameInfo.map_name,
      max_player: gameInfo.max_player,
      matchtype_id: gameInfo.matchtype_id,
      description: gameInfo.description,
      started: gameInfo.started,
      finished: gameInfo.finished
    },
    update: {}
  })
  return game
}

async function getOrCreatePlayer (gamePlayer) {
  const player = await prisma.player.upsert({
    where: {
      profile_id: gamePlayer.profile_id
    },
    create: {
      profile_id: gamePlayer.profile_id,
      country_code: gamePlayer.country_code,
      alias: gamePlayer.alias,
      last_update_at: new Date()
    },
    update: {}
  })
  return player
}

async function createGamePlayer (playerInfo, game, player) {
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
    return newGamePlayer
  }
}

export async function updatePlayerGames (gameData) {
  try {
    for (const game of gameData) {
      const newGame = await createNewGame(game)
        .catch(async (e) => {
          console.error(e)
          process.exit(1)
        })
      for (const playerInfo of game.gamePlayers) {
        const newPlayer = await getOrCreatePlayer(playerInfo)
          .catch(async (e) => {
            console.error(e)
            process.exit(1)
          })
        createGamePlayer(playerInfo, newGame, newPlayer)
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
