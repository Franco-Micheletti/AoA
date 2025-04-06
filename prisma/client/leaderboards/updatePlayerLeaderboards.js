const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function UpdatePlayerLeaderboards (leaderboardInfo, player) {
    const checkIfLeaderboardExists = await prisma.playerLeaderboardStats.findFirst({
        where: {
            AND: {
                player_id: player.id,
                leaderboard_id: leaderboardInfo.leaderboard_id
            }
        }
    })
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


