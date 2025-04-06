import { createPlayerPersonalInfo } from '../playerInfo/createPlayerPersonalInfo'
import { createPlayerLeaderboards } from '../leaderboards/createPlayerLeaderboards'
export async function createPlayerInfo (playerData) {
  try {
    const player = await createPlayerPersonalInfo(playerData.personalInfo)
      .catch((e) => {
        console.log(e)
      })
    if (playerData.leaderboards.length > 0 && playerData.leaderboards !== null) {
      for (const leaderboard of playerData.leaderboards) {
        await createPlayerLeaderboards(leaderboard, player)
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
