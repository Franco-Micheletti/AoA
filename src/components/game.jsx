import Team from './team'
import { matchTypeIdMapping } from '@/utilities/utilities'
import { MapImage } from './mapImage'
export default function Game ({ game }) {
  const gameData = game.game
  const dateNow = Math.round(new Date().getTime() / 1000, 2)
  const daysAgo = Math.round((dateNow - gameData.finished) / 86400, 2)
  const mapName = gameData.map_name
  const winnerTeam = gameData.gamePlayer.filter((player) => player.result_id === 1)
  const loserTeam = gameData.gamePlayer.filter((player) => player.result_id === 0)

  return (
    <div className='bg-zinc-50 flex flex-col p-3 border-b-2 text-black odd:bg-gray-100 even:bg-gray-50'>
      {/* Game Info */}
      <div className='flex flex-col justify-center items-center game-info p-2'>
        {/* Map */}
        <div className='flex flex-col justify-center items-center gap-2 p-2 map'>
          {
            <div className='flex flex-col justify-center items-center'>
              <div className='flex text-lg font-semibold'>{mapName !== null ? mapName.toUpperCase() : 'Unknown'}</div>
              {
                gameData.description !== 'AUTOMATCH'
                  ? <div className='flex text-base justify-center'>{gameData.description.slice(0, 30)}</div>
                  : <div className='flex text-base justify-center'>{matchTypeIdMapping[gameData.matchtype_id]}</div>
              }
            </div>
          }
          <MapImage height={140} width={140} src={`/images/map_icons/${mapName}.png`} />
        </div>
        <div className='flex flex-col justify-around items-center gap-5 all-teams mt-3'>
          {/* Winner team */}
          <Team playerList={winnerTeam} isWinner={1} />
          <div className='flex text-lg font-bold justify-center items-center'>VS</div>
          {/* Loser Team */}
          <Team playerList={loserTeam} isWinner={0} />
        </div>
      </div>
      {/* Played at */}
      <div className='flex flex-col justify-center items-center p-3'>
        {
          daysAgo > 0
            ? daysAgo > 1
              ? <div className='text-sm'>{daysAgo} days ago</div>
              : <div className='text-sm'>{daysAgo} day ago</div>
            : <div className='text-sm'>Today</div>
        }
      </div>
    </div>
  )
}
