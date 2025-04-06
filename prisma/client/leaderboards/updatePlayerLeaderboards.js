const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function updateLeaderboards (leaderboardInfo, profileId) {
  const player = await prisma.player.findUnique({
    where: {
      profile_id: profileId
    }
  })
  const checkIfLeaderboardExists = await prisma.playerLeaderboardStats.findFirst({
    where: {
      AND: {
        player_id: player.id,
        leaderboard_id: leaderboardInfo.leaderboard_id
      }
    }
  })
  if (checkIfLeaderboardExists !== null) {
    await prisma.playerLeaderboardStats.update({
      where: {
        id: checkIfLeaderboardExists.id
      },
      data: {
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
    await prisma.playerLeaderboardStats.create({
      data: {
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
  }
  await prisma.player.update({
    where: {
      id: player.id
    },
    data: {
      last_update_at: new Date()
    }
  })
}

export async function updatePlayerLeaderboards (leaderboards, profileId) {
  try {
    if (leaderboards.length > 0 && leaderboards !== null) {
      for (const leaderboard of leaderboards) {
        await updateLeaderboards(leaderboard, profileId)
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
