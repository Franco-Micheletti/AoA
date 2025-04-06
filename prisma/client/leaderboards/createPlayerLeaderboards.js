const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function createPlayerLeaderboards (leaderboardInfo, player) {
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
  }
}
