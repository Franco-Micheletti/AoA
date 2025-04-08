const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function updateHasToBeUpdatedField (playerInfo) {
  try {
    const player = await prisma.player.update({
      where: {
        profile_id: playerInfo.profile_id
      },
      data: {
        hasToBeUpdated: false
      }
    })
    return { code: 1 }
  } catch (e) {
    return { code: 0, error: e.message }
  }
}
