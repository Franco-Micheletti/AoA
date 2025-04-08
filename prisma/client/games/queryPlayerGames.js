const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main (id, pageNumber) {
  const data = await prisma.gamePlayer.findMany({
    skip: pageNumber <= 0 ? 1 : pageNumber * 50 - 50,
    take: 50,
    orderBy: {
      game: {
        finished: 'desc'
      }
    },
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

export async function queryPlayerGames (id, pageNumber) {
  const playerGames = await main(id, pageNumber)
    .catch((e) => {
      console.error(e)
    })
  return playerGames
}
