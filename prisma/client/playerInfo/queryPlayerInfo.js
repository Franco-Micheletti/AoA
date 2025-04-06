const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main (profileId) {
  const data = await prisma.player.findUnique({
    where: {
      profile_id: profileId
    },
    include: {
      playerLeaderboardStats: true
    }
  })
  return data
}

export async function queryPlayerInfo (profileId) {
  const playerInfo = await main(profileId)
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
  return playerInfo
}
