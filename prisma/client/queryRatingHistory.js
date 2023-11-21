const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main (playerInfo, matchType) {
  const data = await prisma.gamePlayer.findMany({
    select: {
      new_rating: true,
      game: {
        select: {
          finished: true
        }
      }
    },
    where: {
      AND: {
        player: {
          profile_id: playerInfo.profile_id
        },
        game: matchType === 'rmTeam'
          ? { matchtype_id: 7 || 8 || 9 }
          : matchType === 'rmSolo'
            ? { matchtype_id: 6 }
            : { matchtype_id: 6 }
      }
    },
    orderBy: [
      {
        game: {
          finished: 'asc'
        }
      }
    ]
  })
  return data
}

export async function queryRatingHistory (playerInfo, matchTypeId) {
  const ratingHistory = await main(playerInfo, matchTypeId)
    .catch((e) => {
      console.error(e)
    })
  return ratingHistory
}
