import Image from 'next/image'

export default function CivImage ({ code }) {
  const civNames = {
    0: 'Armenians',
    1: 'Aztec',
    2: 'Bengalis',
    3: 'Berbers',
    4: 'Bohemians',
    5: 'Britons',
    6: 'Bulgarians',
    7: 'Burgundians',
    8: 'Burmese',
    9: 'Byzantines',
    10: 'Celts',
    11: 'Chinese',
    12: 'Cumans',
    13: 'Dravidians',
    14: 'Ethiopians',
    15: 'Franks',
    16: 'Georgians',
    17: 'Goths',
    18: 'Gurjaras',
    19: 'Huns',
    20: 'Incas',
    21: 'Indians',
    22: 'Italians',
    23: 'Japanese',
    24: 'Khmer',
    25: 'Koreans',
    26: 'Lithuanians',
    27: 'Magyars',
    28: 'Malay',
    29: 'Malians',
    30: 'Mayans',
    31: 'Mongols',
    32: 'Persians',
    33: 'Poles',
    34: 'Portuguese',
    35: 'Romans',
    36: 'Saracens',
    37: 'Sicilians',
    38: 'Slavs',
    39: 'Spanish',
    40: 'Tatars',
    41: 'Teutons',
    42: 'Turks',
    43: 'Vietnamese',
    44: 'Vikings',
    45: 'Achaemenids',
    46: 'Athenians',
    47: 'Spartans'
  }
  return (
    <div>
      <Image alt='civ' width={35} height={35} src={`/images/civ_icons/${civNames[code]}.png`}></Image>
    </div>
  )
}
