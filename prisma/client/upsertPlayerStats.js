const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function upsertPlayerPersonalInfo (playerPersonalInfo) {
  const data = await prisma.player.upsert({
    where: {
      profile_id: playerPersonalInfo.profile_id
    },
    create: {
      profile_id: playerPersonalInfo.profile_id,
      country_code: playerPersonalInfo.country_code,
      alias: playerPersonalInfo.alias,
      last_update_at: new Date(),
      steam_id: playerPersonalInfo.steam_id
    },
    update: {
      last_update_at: new Date()
    }
  })
  return data
}

async function updatePlayerLeaderboards (leaderboardInfo, player) {
  const checkIfLeaderboardExists = await prisma.playerLeaderboardStats.findFirst({
    where: {
      AND: {
        player_id: player.id,
        leaderboard_id: leaderboardInfo.leaderboard_id
      }
    }
  })
  if (checkIfLeaderboardExists === null) {
    await prisma.playerLeaderboardStats.create({
      data: {
        profile_id: leaderboardInfo.profile_id,
        leaderboard_id: leaderboardInfo.leaderboard_id,
        wins: leaderboardInfo.wins,
        losses: leaderboardInfo.losses,
        streak: leaderboardInfo.streak,
        disputes: leaderboardInfo.disputes,
        drops: leaderboardInfo.drops,
        rank: leaderboardInfo.rank,
        ranktotal: leaderboardInfo.ranktotal,
        rating: leaderboardInfo.rating,
        regionrank: leaderboardInfo.regionrank,
        regionranktotal: leaderboardInfo.regionranktotal,
        lastmatchdate: leaderboardInfo.lastmatchdate,
        highestrank: leaderboardInfo.highestrank,
        highestrating: leaderboardInfo.highestrating,
        player: {
          connect: { id: player.id }
        }
      }
    })
  } else {
    await prisma.playerLeaderboardStats.update({
      where: {
        id: checkIfLeaderboardExists.id
      },
      data: {
        profile_id: leaderboardInfo.profile_id,
        leaderboard_id: leaderboardInfo.leaderboard_id,
        wins: leaderboardInfo.wins,
        losses: leaderboardInfo.losses,
        streak: leaderboardInfo.streak,
        disputes: leaderboardInfo.disputes,
        drops: leaderboardInfo.drops,
        rank: leaderboardInfo.rank,
        ranktotal: leaderboardInfo.ranktotal,
        rating: leaderboardInfo.rating,
        regionrank: leaderboardInfo.regionrank,
        regionranktotal: leaderboardInfo.regionranktotal,
        lastmatchdate: leaderboardInfo.lastmatchdate,
        highestrank: leaderboardInfo.highestrank,
        highestrating: leaderboardInfo.highestrating,
        player: {
          connect: { id: player.id }
        }
      }
    })
    await prisma.player.update({
      where: {
        id: player.id
      },
      data: {
        last_update_at: new Date()
      }
    })
  }
}

export async function updatePlayerInfo (playerData) {
  try {
    const player = await upsertPlayerPersonalInfo(playerData.personalInfo)
      .catch((e) => {
        console.log(e)
      })
    if (playerData.leaderboards.length > 0 && playerData.leaderboards !== null) {
      for (const leaderboard of playerData.leaderboards) {
        await updatePlayerLeaderboards(leaderboard, player)
          .catch((e) => {
            console.log(e)
          })
      }
    }
    return { code: 1 }
  } catch (e) {
    return { code: 0, error: e.message }
  }
}
