/*
 * dates are unix timestamps
 * keywords used for news article search
 * names, descriptions and companies pre-determined
 * events are arranged by increasing start date
 */

const Events = {
  p3TAkxj7: {
    name: 'Malaysia Airlines scandal',
    description: 'Future of Malaysia Airlines uncertain after Flight MH370 missing and Flight MH17 shot down',
    start_date: 1394197200, /* date of crash */
    end_date: 1425474000, /* search for mh370 cancelled */
    related_companies: [
      'Malaysia Airlines'
    ],
    keywords: ['malaysia airlines', 'mh370', 'mh17']
  },
  qcHY624B: {
    name: 'Samsung battery scandal',
    description: 'Samsung share prices plummet after Galaxy Note 7 batteries cause explosions',
    start_date: 1471528800, /* release date */
    end_date: 1485003600, /* public apology */
    related_companies: [
      'Samsung'
    ],
    keywords: ['samsung', 'battery']
  },
  wZBNu9hY: {
    name: 'Royal Commission into banking',
    description: 'The Commonwealth launches a royal commision into the financial services industry to investigate allegations of misconduct',
    start_date: 1511960400, /* royal commission announced */
    end_date: 1517317200, /* royal commission began */
    related_companies: [
      'AMP',
      'CBA',
      'Westpac',
      'ANZ',
      'NAB',
      'BT Financial',
      'Aussie Home Loans',
      'St George'
    ],
    keywords: ['banking', 'royal', 'commission']
  },
  Kr3muXpn: {
    name: 'Cambridge Analytica scandal',
    description: 'Facebook in the spotlight after Cambridge Analytica involved in alleged harvesting and use of personal data',
    start_date: 1519822800, /* scandal made public */
    end_date: 'ongoing', /* ongoing - developing story */
    related_companies: [
      'Facebook',
      'Cambridge Analytica'
    ],
    keywords: ['facebook', 'cambridge', 'analytica']
  },
  r8Mhx8UT: {
    name: 'James Packer resigns from Crown resorts directorship',
    description: 'Crown stock plummeted instantly on open of trading after CEO resigned due to mental health issues',
    start_date: 1520168400, /* disciplinary action against crown */
    end_date: 1522328400, /* past date of scandal */
    related_companies: [
      'Crown Resorts',
      'PBL'
    ],
    keywords: ['james packer', 'crown resorts', 'resigns', 'mental health']
  },
  r7F3SepB: {
    name: 'Elon Musk dismissive of analysts',
    description: 'Elon Musk\'s refusal to answer \'boring\' questions sinks Tesla shares',
    start_date: 1525010400, /* initial instance */
    end_date: 'ongoing', /* ongoing - recent event */
    related_companies: [
      'Tesla'
    ],
    keywords: ['tesla', 'elon musk', 'analysts']
  },
  /*
  g3F6aUb7: {
    name: '',
    description: '',
    start_date: ,
    end_date: ,
    related_companies: [
      '',
      ''
    ],
    keywords: ['', '', '']
  },
  Hf3dG22P: {
    name: '',
    description: '',
    start_date: ,
    end_date: ,
    related_companies: [
      '',
      ''
    ],
    keywords: ['', '', '']
  }
  */
}

export default Events
