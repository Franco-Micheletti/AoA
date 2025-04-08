const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export async function createPlayerPersonalInfo (playerPersonalInfo) {
  const data = await prisma.player.create({
    data: {
      profile_id: playerPersonalInfo.profile_id,
      country_code: playerPersonalInfo.country_code,
      alias: playerPersonalInfo.alias,
      last_update_at: new Date(),
      steam_id: playerPersonalInfo.steam_id,
      hasToBeUpdated: false
    }
  })
  return data
}
