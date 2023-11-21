export const leaderboardLongName = {
  0: 'Unranked',
  1: 'Deathmatch 1v1',
  2: 'Deathmatch Team',
  3: 'Random Map 1v1',
  4: 'Random Map Team',
  13: 'Empire Wars 1v1',
  14: 'Empire Wars Team',
  25: 'Return of Rome 1v1',
  26: 'Return of Rome Team'
}

export const leaderboardShortName = {
  0: 'Unranked',
  1: 'DM 1v1',
  2: 'DM Team',
  3: 'RM 1v1',
  4: 'RM Team',
  13: 'EW 1v1',
  14: 'EW Team',
  25: 'RoR 1v1',
  26: 'RoR Team'
}

export const filterRM1v1 = (game) => {
  if (game.game.matchtype_id === 6) {
    return game
  }
}

export const matchTypeIdMapping = {
  6: 'RM 1v1',
  7: 'RM 2v2',
  8: 'RM 3v3',
  9: 'RM 4v4'
}

export const filterRMTeam = (game) => {
  if (game.game.matchtype_id === 7 ||
    game.game.matchtype_id === 8 ||
    game.game.matchtype_id === 9) {
    return game
  }
}

export const filterAll = (game) => {
  return game
}

export const filterLobby = (game) => {
  if (game.game.matchtype_id === 0) {
    return game
  }
}

export const filterEW1v1 = (game) => {
  if (game.game.matchtype_id === 26) {
    return game
  }
}

export const filterEWTeam = (game) => {
  if (game.game.matchtype_id === 27) {
    return game
  }
}

export const filterRoR1v1 = (game) => {
  if (game.game.matchtype_id === 120) {
    return game
  }
}

export const filterRoRTeam = (game) => {
  if (game.game.matchtype_id === 121) {
    return game
  }
}

export const filterDM1v1 = (game) => {
  if (game.game.matchtype_id === 25) {
    return game
  }
}

export const filterDMTeam = (game) => {
  if (game.game.matchtype_id === 26) {
    return game
  }
}

export const filterFunctions = {
  'RM 1v1': filterRM1v1,
  'RM Team': filterRMTeam,
  all: filterAll,
  lobby: filterLobby,
  'EW 1v1': filterEW1v1,
  'EW Team': filterEWTeam,
  'DM 1v1': filterDM1v1,
  'DM Team': filterDMTeam,
  'RoR 1v1': filterRoR1v1,
  'RoR Team': filterRoRTeam
}

export const playerColorNames = {
  1: 'rgb(0 0 255 / 50%)',
  2: 'rgb(255 0 0 / 50%)',
  3: 'rgb(0 255 0 / 50%)',
  4: 'rgb(255 255 0 / 50%)',
  5: 'rgb(0 255 255 / 50%)',
  6: 'rgb(255 0 255 / 50%)',
  7: 'rgb(200 200 200 / 50%)',
  8: 'rgb(255 165 0 / 50%)'
}

export const getPlayerStatsColumnNames = {
  leaderboard_id: 'Match Type',
  wins: 'W',
  losses: 'L',
  streak: 'Streak',
  rating: 'Rating',
  highestrating: 'Best'
}

export const optionsMap = {

  0: 'starting_age',
  1: 'allow_cheats',
  4: 'ending_age',
  5: 'game_mode',
  8: 'map_size',
  10: 'location',
  28: 'population',
  37: 'resources',
  41: 'speed',
  56: 'privacy',
  57: 'treaty_length',
  61: 'difficulty',
  62: 'full_tech_tree',
  65: 'lock_speed',
  66: 'lock_teams',
  75: 'record_game',
  76: 'shared_exploration',
  77: 'team_positions',
  78: 'team_together',
  79: 'turbo_mode',
  81: 'victory',
  82: 'reveal_map',
  89: 'empire_wars_mode',
  90: 'sudden_death_mode',
  91: 'regicide_mode',
  97: 'game_variant'

}

export const mapNames = {
  10875: 'Arabia',
  10876: 'Archipelago',
  10877: 'Baltic',
  10878: 'Black Forest',
  10879: 'Coastal',
  10880: 'Continental',
  10881: 'Crater Lake',
  10882: 'Fortress',
  10883: 'Gold Rush',
  10884: 'Highland',
  10885: 'Islands',
  10886: 'Mediterranean',
  10887: 'Migration',
  10888: 'Rivers',
  10889: 'Team Islands',
  10891: 'Scandinavia',
  10892: 'Mongolia',
  10893: 'Salt Marsh',
  10894: 'Yucatan',
  10895: 'Arena',
  10897: 'Oasis',
  10898: 'Ghost Lake',
  10901: 'Nomad',
  10914: 'Acropolis',
  10915: 'Budapest',
  10916: 'Cenotes',
  10917: 'City of lakes',
  10918: 'Goldenpit',
  10919: 'Hideout',
  10920: 'Hillfort',
  10921: 'Lombardia',
  10922: 'Steppe',
  10923: 'Valley',
  10924: 'Megarandom',
  10925: 'Hamburger',
  10926: 'Ctr Random',
  10927: 'Ctr Monsoon',
  10928: 'Ctr PyramidDescent',
  10929: 'Ctr Spiral',
  10930: 'Golden Swamp',
  10931: 'FourLakes',
  10932: 'Land Nomad',
  10933: 'BattleOnTheIce',
  10934: 'El Dorado',
  10935: 'Fall Of Axum',
  10936: 'Fall Of Rome',
  10937: 'The Majapahit Empire',
  10938: 'Amazon Tunnel',
  10939: 'Coastal Forest',
  10940: 'African Clearing',
  10941: 'Atacama',
  10942: 'SeizeTheMountain',
  10943: 'Crater',
  10944: 'Crossroads',
  10945: 'Michi',
  10946: 'Moats',
  10947: 'Volcanic Island',
  10948: 'Acclivity',
  10949: 'Eruption',
  10950: 'Frigid Lake',
  10951: 'Greenland',
  10952: 'Lowland',
  10953: 'Marketplace',
  10954: 'Meadow',
  10955: 'Mountain Range',
  10956: 'Northern Isles',
  10957: 'Ring Fortress',
  10958: 'Runestones',
  10959: 'Aftermath',
  10960: 'Enclosed',
  10961: 'Haboob',
  10962: 'Kawasan',
  10963: 'Land Madness',
  10964: 'Sacred Springs',
  10965: 'Wade',
  10966: 'Morass',
  10967: 'Shoals',
  10985: 'Canals',
  10986: 'Capricious',
  10987: 'Dingos',
  10988: 'Graveyards',
  10989: 'Metropolis',
  10991: 'Paradise Island',
  10992: 'Pilgrims',
  10993: 'Prairie',
  10994: 'Seasons',
  10995: 'Sherwood Forest',
  10996: 'Sherwood Heroes',
  10997: 'Shipwreck',
  10998: 'Team Glaciers',
  10999: 'The Unknown',
  13544: 'RealWorld Spain',
  13545: 'RealWorld England',
  13546: 'RealWorld Mideast',
  13547: 'RealWorld Texas',
  13548: 'RealWorld Italy',
  13549: 'RealWorld Caribbean',
  13550: 'RealWorld France',
  13551: 'RealWorld Jutland',
  13552: 'RealWorld Nippon',
  13553: 'RealWorld Byzantium',
  301100: 'Kilimanjaro',
  301101: 'Mountain Pass',
  301102: 'Nile Delta',
  301103: 'Serengeti',
  301104: 'Socotra',
  301105: 'RealWorld Amazon',
  301106: 'RealWorld China',
  301107: 'RealWorld HornOfAfrica',
  301108: 'RealWorld India',
  301109: 'RealWorld Madagascar',
  301110: 'RealWorld WestAfrica',
  301111: 'RealWorld Bohemia',
  301112: 'RealWorld Earth',
  301113: 'SpecialMap Canyons',
  301114: 'SpecialMap Archipelago',
  301115: 'SpecialMap EnemyIslands',
  301116: 'SpecialMap FarOut',
  301117: 'SpecialMap FrontLine',
  301118: 'SpecialMap InnerCircle',
  301119: 'SpecialMap Motherland',
  301120: 'SpecialMap Open Plains',
  301121: 'SpecialMap Ring Of Water',
  301122: 'SpecialMap Snake Pit',
  301123: 'SpecialMap The Eye',
  301124: 'RealWorld Australia',
  301125: 'RealWorld Indochina',
  301126: 'RealWorld Indonesia',
  301127: 'RealWorld Malacca',
  301128: 'RealWorld Philippines',
  301129: 'Bog Islands',
  301130: 'Mangrove Jungle',
  301131: 'Pacific Islands',
  301132: 'Sandbank',
  301133: 'Water Nomad',
  301134: 'SpecialMap JungleIslands',
  301135: 'SpecialMap HolyLine',
  301136: 'SpecialMap BorderStones',
  301137: 'SpecialMap YinYang',
  301138: 'SpecialMap JungleLanes',
  301139: 'Alpine Lakes',
  301141: 'Bogland',
  301142: 'Mountain Ridge',
  301143: 'Ravines',
  301144: 'Wolf Hill',
  301145: 'RealWorld Antarctica',
  301146: 'RealWorld AralSea',
  301147: 'RealWorld BlackSea',
  301148: 'RealWorld Caucasus',
  301149: 'RealWorld Siberia',
  301150: 'Swirling River Special',
  301151: 'Twin Forests Special',
  301152: 'Journey South Special',
  301153: 'Snake Forest Special',
  301154: 'Sprawling Streams Special'
}

export const getDateList = (timestampList) => {
  const dateList = timestampList.map((data) => {
    const date = new Date(data.game.finished * 1000)
    const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    return formattedDate
  })
  return dateList
}
