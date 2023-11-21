import Image from 'next/image'

export default function CivImage ({ code }) {
  const civNames = {
    0: 'Aztecs',
    1: 'Bengalis',
    2: 'Berbers',
    3: 'Bohemians',
    4: 'Britons',
    5: 'Bulgarians',
    6: 'Burgundians',
    7: 'Burmese',
    8: 'Byzantines',
    9: 'Celts',
    10: 'Chinese',
    11: 'Cumans',
    12: 'Dravidians',
    13: 'Ethiopians',
    14: 'Franks',
    15: 'Goths',
    16: 'Gurjaras',
    17: 'Hindustanis',
    18: 'Huns',
    19: 'Incas',
    20: 'Italians',
    21: 'Japanese',
    22: 'Khmer',
    23: 'Koreans',
    24: 'Lithuanians',
    25: 'Magyars',
    26: 'Malay',
    27: 'Malians',
    28: 'Mayans',
    29: 'Mongols',
    30: 'Persians',
    31: 'Poles',
    32: 'Portuguese', // Romans 33 // Georgians 15 // Armenians -1 //
    33: 'Romans',
    34: 'Saracens',
    35: 'Sicilians',
    36: 'Slavs',
    37: 'Spanish',
    38: 'Tatars',
    39: 'Teutons',
    40: 'Turks',
    41: 'Vietnamese',
    42: 'Vikings'
  }
  return (
    <div>
        <Image alt='civ' width={25} height={25} src={`/images/civ_icons/${civNames[code]}.png`}></Image>
    </div>
  )
}
