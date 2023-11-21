const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main (id) {
  const data = await prisma.gamePlayer.findMany({
    select: {
      game: {
        select: {
          id: true,
          map_name: true,
          description: true,
          started: true,
          finished: true,
          matchtype_id: true,
          gamePlayer: {
            select: {
              result_id: true,
              team_id: true,
              color_id: true,
              civ_id: true,
              old_rating: true,
              new_rating: true,
              player: {
                select: {
                  profile_id: true,
                  alias: true,
                  country_code: true
                }
              }
            }
          }
        }
      }
    },
    where: {
      player: {
        profile_id: {
          equals: id
        }
      }
    }
  })
  return data
}

export async function queryGamesOfPlayer (id) {
  const gamesOfPlayer = await main(id)
    .catch((e) => {
      console.error(e)
    })
  return gamesOfPlayer
}
