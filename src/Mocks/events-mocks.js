import { getRandomArrayElement } from '../utils';

const mockEvents = [
  {
    id: '2ff78ee5-45cd-4af2-8a2a-673545b0f54d',
    basePrice: 7741,
    dateFrom: '2025-02-07T14:40:12.542Z',
    dateTo: '2025-02-08T02:24:12.542Z',
    destination: '0e1aadd9-0275-40d7-a9d5-bb7bcd1ba005',
    isFavorite: true,
    offers: [],
    type: 'drive'
  },
  {
    id: 'a23d37aa-e4db-4aca-ba9c-6a5a41d9c821',
    basePrice: 2617,
    dateFrom: '2025-02-08T20:17:12.542Z',
    dateTo: '2025-02-10T12:01:12.542Z',
    destination: '0e1aadd9-0275-40d7-a9d5-bb7bcd1ba005',
    isFavorite: false,
    offers: [
      'fe022e53-68b4-4add-aaf6-0413c15eb56a',
      '5ccb92f8-19a5-491c-a8c4-f31412f2b1f2',
      'aa7ff8ed-b3b4-4e56-9bde-02c68d6fe01d',
      '46fac752-60f1-4709-903f-a20cf1c6a1f7',
      'e1cf9783-59d1-411d-8459-c8fe49c4bed8'
    ],
    type: 'ship'
  },
  {
    id: 'a23d9b45-7d72-4fff-9ac3-a054528b543b',
    basePrice: 428,
    dateFrom: '2025-02-11T19:11:12.542Z',
    dateTo: '2025-02-13T13:36:12.542Z',
    destination: 'b8f55c42-278f-441c-ae8f-7ea3f9033beb',
    isFavorite: false,
    offers: [],
    type: 'restaurant'
  },
  {
    id: '1b79bfa7-b0be-4adf-b182-f6ac42016d22',
    basePrice: 6018,
    dateFrom: '2025-03-01T06:23:12.957Z',
    dateTo: '2025-03-01T17:12:12.957Z',
    destination: 'a734ae85-9fce-4e1a-af06-ee28e9c10dd2',
    isFavorite: true,
    offers: [],
    type: 'ship'
  },
  {
    id: 'c26e54b8-b86f-4a70-8bc9-44dd1ef51f35',
    basePrice: 7902,
    dateFrom: '2025-03-03T05:25:12.957Z',
    dateTo: '2025-03-03T12:50:12.957Z',
    destination: '14ca415e-fc87-4c30-aea8-cddf7d32337e',
    isFavorite: true,
    offers: [
      'eb272342-702c-4d96-bc21-2f9ff124dad0',
      '51cf52ed-e73b-4b2e-99da-ba7a19e4fe97',
      '8ef71e66-fe4f-41c2-90f0-84e761cacc01'
    ],
    type: 'taxi'
  },
  {
    id: 'f3b41fbc-0bcd-40e6-a9b1-5eef9371c15b',
    basePrice: 1721,
    dateFrom: '2025-03-05T13:09:12.957Z',
    dateTo: '2025-03-07T01:28:12.957Z',
    destination: 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    isFavorite: true,
    offers: [
      '1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c',
      '659142a4-1ea2-4d02-b31f-082eba1afc8e',
      'aea4e17c-0069-4884-9ffa-8bc5f7899075'
    ],
    type: 'train'
  },
  {
    id: '4a255034-a019-42a0-bce5-1e602a99d1ef',
    basePrice: 7280,
    dateFrom: '2025-03-07T14:43:12.957Z',
    dateTo: '2025-03-08T01:34:12.957Z',
    destination: '62a21ac4-e085-4f48-8fb5-cbd0905b67c0',
    isFavorite: true,
    offers: [
      'aea4e17c-0069-4884-9ffa-8bc5f7899075'
    ],
    type: 'train'
  },
  {
    id: '7f34ab6b-32a8-404d-b697-41a088dd53c3',
    basePrice: 2707,
    dateFrom: '2025-03-08T11:55:12.957Z',
    dateTo: '2025-03-09T00:27:12.957Z',
    destination: '3202b202-7d98-4b23-9100-bf18c0615947',
    isavorite: false,
    offers: [
      'b2615390-dfab-4c38-bca9-3116f44d25f7'
    ],
    type: 'bus'
  },
];

const mockDestinations = [
  {
    id: 'b8f55c42-278f-441c-ae8f-7ea3f9033beb',
    description: 'Saint Petersburg - is a beautiful city',
    name: 'Saint Petersburg',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/10.jpg',
        description: 'Saint Petersburg famous for its crowded street markets with the best street food in Asia'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/17.jpg',
        description: 'Saint Petersburg full of of cozy canteens where you can try the best coffee in the Middle East'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Saint Petersburg with a beautiful old town'
      }
    ]
  },
  {
    id: 'cb8f3a2d-c7c1-4c9e-9b6e-f614e3bdf09b',
    description: '',
    name: 'Rome',
    pictures: []
  },
  {
    id: '04c00bdd-f003-493f-8abf-abc082ab638d',
    description: 'Naples - with an embankment of a mighty river as a centre of attraction',
    name: 'Naples',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/20.jpg',
        description: 'Naples is a beautiful city'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/4.jpg',
        description: 'Naples famous for its crowded street markets with the best street food in Asia'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/20.jpg',
        description: 'Naples a true asian pearl'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/14.jpg',
        description: 'Naples middle-eastern paradise'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/20.jpg',
        description: 'Naples a true asian pearl'
      }
    ]
  },
  {
    id: '841f7cc0-0c1f-4d32-858e-d6fae78024d7',
    description: 'Oslo - for those who value comfort and coziness',
    name: 'Oslo',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/11.jpg',
        description: 'Oslo for those who value comfort and coziness'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/7.jpg',
        description: 'Oslo for those who value comfort and coziness'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Oslo in a middle of Europe'
      }
    ]
  },
  {
    id: '3d1cf9e7-a378-44bd-af66-a6628a88f67a',
    description: '',
    name: 'Milan',
    pictures: []
  },
  {
    id: '2f76e9f0-ac64-4864-b3c6-ff2df6dc118f',
    description: 'Monaco - famous for its crowded street markets with the best street food in Asia',
    name: 'Monaco',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/20.jpg',
        description: 'Monaco in a middle of Europe'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Monaco middle-eastern paradise'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/9.jpg',
        description: 'Monaco a true asian pearl'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/4.jpg',
        description: 'Monaco with crowded streets'
      }
    ]
  },
  {
    id: '23f410e5-c757-437d-acf3-a6b2d80779d9',
    description: '',
    name: 'Venice',
    pictures: []
  },
  {
    id: '854a39b5-0de2-43aa-998b-ce55a4e9ec59',
    description: '',
    name: 'Den Haag',
    pictures: []
  },
  {
    id: '275c6b39-16b6-4e50-8784-1299293132e8',
    description: 'Paris - famous for its crowded street markets with the best street food in Asia',
    name: 'Paris',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/7.jpg',
        description: 'Paris full of of cozy canteens where you can try the best coffee in the Middle East'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/19.jpg',
        description: 'Paris in a middle of Europe'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/12.jpg',
        description: 'Paris middle-eastern paradise'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Paris with an embankment of a mighty river as a centre of attraction'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/14.jpg',
        description: 'Paris a perfect place to stay with a family'
      }
    ]
  },
  {
    id: '0e1aadd9-0275-40d7-a9d5-bb7bcd1ba005',
    description: 'Helsinki - with a beautiful old town',
    name: 'Helsinki',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/16.jpg',
        description: 'Helsinki full of of cozy canteens where you can try the best coffee in the Middle East'
      }
    ]
  }
];

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'e4ac9df6-fe5a-40e4-a7f2-f7389e2c445e',
        title: 'Upgrade to a business class',
        price: 123
      },
      {
        id: '60fd0dc8-f396-4a75-92f6-6940a785059d',
        title: 'Choose the radio station',
        price: 55
      },
      {
        id: 'eb272342-702c-4d96-bc21-2f9ff124dad0',
        title: 'Choose temperature',
        price: 38
      },
      {
        id: '51cf52ed-e73b-4b2e-99da-ba7a19e4fe97',
        title: 'Drive quickly, I\'m in a hurry',
        price: 70
      },
      {
        id: '8ef71e66-fe4f-41c2-90f0-84e761cacc01',
        title: 'Drive slowly',
        price: 175
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'ae99069c-c246-430d-8c90-effad77d4831',
        title: 'Infotainment system',
        price: 36
      },
      {
        id: 'c28c7abe-fbf2-46ec-aec5-e673654289c7',
        title: 'Order meal',
        price: 173
      },
      {
        id: 'b2615390-dfab-4c38-bca9-3116f44d25f7',
        title: 'Choose seats',
        price: 67
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: '1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c',
        title: 'Book a taxi at the arrival point',
        price: 66
      },
      {
        id: '659142a4-1ea2-4d02-b31f-082eba1afc8e',
        title: 'Order a breakfast',
        price: 174
      },
      {
        id: 'aea4e17c-0069-4884-9ffa-8bc5f7899075',
        title: 'Wake up at a certain time',
        price: 60
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '1b22fb31-acef-4d01-9c62-9ac18b176387',
        title: 'Choose meal',
        price: 166
      },
      {
        id: '02db9a9c-6ea4-471f-9904-c4c969a26e63',
        title: 'Choose seats',
        price: 173
      },
      {
        id: '530f0e32-9f97-492b-aee5-b10dd2d815a5',
        title: 'Upgrade to comfort class',
        price: 108
      },
      {
        id: '3344000b-4079-425a-a188-0f8be957d1c5',
        title: 'Upgrade to business class',
        price: 100
      },
      {
        id: 'fc5e302b-6231-4c1d-85ba-05ce2dd9e1c6',
        title: 'Add luggage',
        price: 124
      },
      {
        id: 'cf67a33c-dbea-4788-833e-e140bfbc03d0',
        title: 'Business lounge',
        price: 120
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'bf55fdef-d2c3-4a39-8a8f-dd6d40f6b954',
        title: 'Choose the time of check-in',
        price: 90
      },
      {
        id: 'cfd32a95-916e-43bb-ac0b-ac92215e7ea8',
        title: 'Choose the time of check-out',
        price: 61
      },
      {
        id: 'dc7e4af4-1371-42fe-9f60-e75e82f96dca',
        title: 'Add breakfast',
        price: 195
      },
      {
        id: 'cf351d11-b6cd-4ce6-86b1-09ba32e6a271',
        title: 'Laundry',
        price: 139
      },
      {
        id: 'a749c843-4981-4d38-892b-076437c24597',
        title: 'Order a meal from the restaurant',
        price: 197
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'be02a8b1-e2ba-48f3-82a3-79f690f9638a',
        title: 'Choose meal',
        price: 112
      },
      {
        id: '6f99087f-2b81-4654-9c2b-efe1d4ef615c',
        title: 'Choose seats',
        price: 115
      },
      {
        id: 'cba06821-0983-48e1-a3e0-af055ab42e69',
        title: 'Upgrade to comfort class',
        price: 79
      },
      {
        id: '601f1aa7-01b5-4c99-9c64-8270b76ee1ed',
        title: 'Upgrade to business class',
        price: 75
      },
      {
        id: 'a2026208-7504-446b-ae62-f71e89879210',
        title: 'Add luggage',
        price: 135
      },
      {
        id: 'f3a8c33b-3019-4bc8-9881-fdcf296b9027',
        title: 'Business lounge',
        price: 165
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'a37cb8b6-aa11-496e-aac7-e2480b457255',
        title: 'With automatic transmission',
        price: 142
      },
      {
        id: 'c2918495-5349-4436-a729-305f578c2684',
        title: 'With air conditioning',
        price: 174
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '24281514-431e-4ace-a858-a5895913ef5b',
        title: 'Choose live music',
        price: 177
      },
      {
        id: '5ba171bd-9f4f-44e5-bc09-92ed8b2fb9e8',
        title: 'Choose VIP area',
        price: 198
      }
    ]
  }
];


const getMockOffers = () => mockOffers;
const getMockDestinations = () => mockDestinations;
const getRandomEvent = () => getRandomArrayElement(mockEvents);

export { getRandomEvent, getMockOffers, getMockDestinations };
