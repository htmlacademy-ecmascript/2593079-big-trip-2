import { getRandomArrayElement } from '../utils';

const mockEvents = [
  {
    id: '5e52eb63-20bf-48e3-824c-d5d4538101c7',
    basePrice: 2511,
    dateFrom: '2025-02-10T02:17:12.957Z',
    dateTo: '2025-02-10T11:33:12.957Z',
    destination: 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    isFavorite: true,
    offers: [
      'cba06821-0983-48e1-a3e0-af055ab42e69',
      '601f1aa7-01b5-4c99-9c64-8270b76ee1ed',
      'a2026208-7504-446b-ae62-f71e89879210',
      'f3a8c33b-3019-4bc8-9881-fdcf296b9027'
    ],
    type: 'ship'
  },
  {
    id: '35a8c6bd-951f-4e5b-b181-7bdae43956f5',
    basePrice: 8626,
    dateFrom: '2025-02-11T22:40:12.957Z',
    dateTo: '2025-02-12T19:35:12.957Z',
    destination: 'c068f6d3-e08c-4817-98a2-5b8cbd13df72',
    isFavorite: true,
    offers: [
      'cfd32a95-916e-43bb-ac0b-ac92215e7ea8',
      'dc7e4af4-1371-42fe-9f60-e75e82f96dca',
      'cf351d11-b6cd-4ce6-86b1-09ba32e6a271',
      'a749c843-4981-4d38-892b-076437c24597'
    ],
    type: 'check-in'
  },
  {
    id: '8e33271f-8de9-4ff4-916b-d0577bca5862',
    basePrice: 6698,
    dateFrom: '2025-02-13T05:06:12.957Z',
    dateTo: '2025-02-14T21:37:12.957Z',
    destination: '4724a5e7-1dc5-4da2-ac2b-5315f91ff1fa',
    isFavorite: false,
    offers: [
      '1b22fb31-acef-4d01-9c62-9ac18b176387',
      '02db9a9c-6ea4-471f-9904-c4c969a26e63',
      '530f0e32-9f97-492b-aee5-b10dd2d815a5',
      '3344000b-4079-425a-a188-0f8be957d1c5',
      'fc5e302b-6231-4c1d-85ba-05ce2dd9e1c6',
      'cf67a33c-dbea-4788-833e-e140bfbc03d0'
    ],
    type: 'flight'
  },
  {
    id: '887055c2-ef2e-4ee2-b9cf-b37994b0203b',
    basePrice: 9261,
    dateFrom: '2025-02-15T19:52:12.957Z',
    dateTo: '2025-02-16T11:48:12.957Z',
    destination: 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    isFavorite: false,
    offers: [
      'c28c7abe-fbf2-46ec-aec5-e673654289c7',
      'b2615390-dfab-4c38-bca9-3116f44d25f7'
    ],
    type: 'bus'
  },
  {
    id: '530ede94-ec70-4a49-818f-07853b5411e1',
    basePrice: 4557,
    dateFrom: '2025-02-16T19:36:12.957Z',
    dateTo: '2025-02-18T08:27:12.957Z',
    destination: '3113e602-f294-4341-a775-d43045a3add9',
    isFavorite: false,
    offers: [
      '3344000b-4079-425a-a188-0f8be957d1c5',
      'fc5e302b-6231-4c1d-85ba-05ce2dd9e1c6',
      'cf67a33c-dbea-4788-833e-e140bfbc03d0'
    ],
    type: 'flight'
  },
  {
    id: '9230c1c5-a720-4dea-913f-75143dfbf3e6',
    basePrice: 1451,
    dateFrom: '2025-02-19T11:51:12.957Z',
    dateTo: '2025-02-20T13:04:12.957Z',
    destination: '14ca415e-fc87-4c30-aea8-cddf7d32337e',
    isFavorite: true,
    offers: [
      '5ba171bd-9f4f-44e5-bc09-92ed8b2fb9e8'
    ],
    type: 'restaurant'
  },
  {
    id: '6697e2dc-75a2-40fb-b5f9-905bb98a6ec6',
    basePrice: 5312,
    dateFrom: '2025-02-21T19:52:12.957Z',
    dateTo: '2025-02-23T20:12:12.957Z',
    destination: '95a5a841-a2d5-48bd-83e1-ca44ac9869ea',
    isFavorite: false,
    offers: [
      'a749c843-4981-4d38-892b-076437c24597'
    ],
    type: 'check-in'
  },
  {
    id: 'eb868096-16d9-4cf6-9794-5fb0cbe9d180',
    basePrice: 9374,
    dateFrom: '2025-02-25T15:53:12.957Z',
    dateTo: '2025-02-26T13:07:12.957Z',
    destination: 'a734ae85-9fce-4e1a-af06-ee28e9c10dd2',
    isFavorite: true,
    offers: [
      '601f1aa7-01b5-4c99-9c64-8270b76ee1ed',
      'a2026208-7504-446b-ae62-f71e89879210',
      'f3a8c33b-3019-4bc8-9881-fdcf296b9027'
    ],
    type: 'ship'
  },
  {
    id: '135ae796-b739-4e79-ac23-26af62dd1d40',
    basePrice: 9467,
    dateFrom: '2025-02-28T10:42:12.957Z',
    dateTo: '2025-02-28T18:00:12.957Z',
    destination: 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    isFavorite: true,
    offers: [
      'f3a8c33b-3019-4bc8-9881-fdcf296b9027'
    ],
    type: 'ship'
  },
  {
    id: 'afaa2a2e-359f-4c0e-bab9-7dda1aa3c355',
    basePrice: 6018,
    dateFrom: '2025-03-01T06:23:12.957Z',
    dateTo: '2025-03-01T17:12:12.957Z',
    destination: 'a734ae85-9fce-4e1a-af06-ee28e9c10dd2',
    isFavorite: true,
    offers: [],
    type: 'ship'
  },
  {
    id: '0aa74724-2cfd-40e0-a430-605f89b302ff',
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
    id: 'ed96bdbb-7a7d-444c-a060-7c19e8c2a99e',
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
    id: 'f8916817-173c-4cb1-8a2d-e7c291a721eb',
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
    id: '9a792a95-f12d-4e77-9975-ff7b2cb4bb0c',
    basePrice: 2707,
    dateFrom: '2025-03-08T11:55:12.957Z',
    dateTo: '2025-03-09T00:27:12.957Z',
    destination: '3202b202-7d98-4b23-9100-bf18c0615947',
    isFavorite: false,
    offers: [
      'b2615390-dfab-4c38-bca9-3116f44d25f7'
    ],
    type: 'bus'
  },
  {
    id: 'f5471658-eacd-4827-a923-86396f11fa48',
    basePrice: 2198,
    dateFrom: '2025-03-10T18:59:12.957Z',
    dateTo: '2025-03-12T13:10:12.957Z',
    destination: '62a21ac4-e085-4f48-8fb5-cbd0905b67c0',
    isFavorite: false,
    offers: [
      'cfd32a95-916e-43bb-ac0b-ac92215e7ea8',
      'dc7e4af4-1371-42fe-9f60-e75e82f96dca',
      'cf351d11-b6cd-4ce6-86b1-09ba32e6a271',
      'a749c843-4981-4d38-892b-076437c24597'
    ],
    type: 'check-in'
  },
  {
    id: '5814c117-808c-47dc-a1b0-6f6c2e1fdde4',
    basePrice: 6519,
    dateFrom: '2025-03-13T19:40:12.957Z',
    dateTo: '2025-03-15T01:29:12.957Z',
    destination: '62a21ac4-e085-4f48-8fb5-cbd0905b67c0',
    isFavorite: true,
    offers: [
      '5ba171bd-9f4f-44e5-bc09-92ed8b2fb9e8'
    ],
    type: 'restaurant'
  },
  {
    id: 'a70d3709-3f26-403a-8b50-dab331adc07f',
    basePrice: 2520,
    dateFrom: '2025-03-16T11:39:12.957Z',
    dateTo: '2025-03-17T08:46:12.957Z',
    destination: '3202b202-7d98-4b23-9100-bf18c0615947',
    isFavorite: true,
    offers: [
      '8ef71e66-fe4f-41c2-90f0-84e761cacc01'
    ],
    type: 'taxi'
  },
  {
    id: '499e04b4-92df-4dda-817d-12e97aa314a8',
    basePrice: 3545,
    dateFrom: '2025-03-17T16:28:12.957Z',
    dateTo: '2025-03-18T00:29:12.957Z',
    destination: '14ca415e-fc87-4c30-aea8-cddf7d32337e',
    isFavorite: false,
    offers: [],
    type: 'train'
  },
  {
    id: 'a23ca076-992a-4dc7-ac17-ad67c3b24f6b',
    basePrice: 5092,
    dateFrom: '2025-03-18T12:26:12.957Z',
    dateTo: '2025-03-19T13:25:12.957Z',
    destination: '3113e602-f294-4341-a775-d43045a3add9',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: 'dbc26672-bc74-4c46-b5f1-673a1f41c3ce',
    basePrice: 7269,
    dateFrom: '2025-03-20T17:45:12.957Z',
    dateTo: '2025-03-21T07:33:12.957Z',
    destination: '95a5a841-a2d5-48bd-83e1-ca44ac9869ea',
    isFavorite: true,
    offers: [
      'ae99069c-c246-430d-8c90-effad77d4831',
      'c28c7abe-fbf2-46ec-aec5-e673654289c7',
      'b2615390-dfab-4c38-bca9-3116f44d25f7'
    ],
    type: 'bus'
  },
  {
    id: '3dc8b5b2-f5f5-4c5f-af84-22f65d94ce68',
    basePrice: 1839,
    dateFrom: '2025-03-23T01:52:12.957Z',
    dateTo: '2025-03-24T04:30:12.957Z',
    destination: '62a21ac4-e085-4f48-8fb5-cbd0905b67c0',
    isFavorite: false,
    offers: [
      '1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c',
      '659142a4-1ea2-4d02-b31f-082eba1afc8e',
      'aea4e17c-0069-4884-9ffa-8bc5f7899075'
    ],
    type: 'train'
  },
  {
    id: '94f40d8d-8922-4d0a-818a-de955c80db83',
    basePrice: 6244,
    dateFrom: '2025-03-26T01:07:12.957Z',
    dateTo: '2025-03-27T08:06:12.957Z',
    destination: '4724a5e7-1dc5-4da2-ac2b-5315f91ff1fa',
    isFavorite: false,
    offers: [
      '1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c',
      '659142a4-1ea2-4d02-b31f-082eba1afc8e',
      'aea4e17c-0069-4884-9ffa-8bc5f7899075'
    ],
    type: 'train'
  },
];

const mockDestinations = [

  {
    id: 'a734ae85-9fce-4e1a-af06-ee28e9c10dd2',
    description: 'Den Haag - for those who value comfort and coziness',
    name: 'Den Haag',
    pictures: []
  },
  {
    id: '4724a5e7-1dc5-4da2-ac2b-5315f91ff1fa',
    description: 'Rome - a perfect place to stay with a family',
    name: 'Rome',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/11.jpg',
        description: 'Rome a perfect place to stay with a family'
      }
    ]
  },
  {
    id: 'c068f6d3-e08c-4817-98a2-5b8cbd13df72',
    description: 'Milan - with crowded streets',
    name: 'Milan',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Milan for those who value comfort and coziness'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/20.jpg',
        description: 'Milan is a beautiful city'
      }
    ]
  },
  {
    id: '95a5a841-a2d5-48bd-83e1-ca44ac9869ea',
    description: 'Tokio - a perfect place to stay with a family',
    name: 'Tokio',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Tokio a perfect place to stay with a family'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/16.jpg',
        description: 'Tokio middle-eastern paradise'
      }
    ]
  },
  {
    id: 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    description: 'Munich - full of of cozy canteens where you can try the best coffee in the Middle East',
    name: 'Munich',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/15.jpg',
        description: 'Munich with crowded streets'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/10.jpg',
        description: 'Munich famous for its crowded street markets with the best street food in Asia'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/3.jpg',
        description: 'Munich middle-eastern paradise'
      }
    ]
  },
  {
    id: '62a21ac4-e085-4f48-8fb5-cbd0905b67c0',
    description: 'Valencia - for those who value comfort and coziness',
    name: 'Valencia',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/2.jpg',
        description: 'Valencia a true asian pearl'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/10.jpg',
        description: 'Valencia with an embankment of a mighty river as a centre of attraction'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/3.jpg',
        description: 'Valencia for those who value comfort and coziness'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/10.jpg',
        description: 'Valencia a true asian pearl'
      }
    ]
  },
  {
    id: 'f67d6e7e-ca5f-4e35-a680-4ace452e934b',
    description: 'Kopenhagen - with a beautiful old town',
    name: 'Kopenhagen',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/17.jpg',
        description: 'Kopenhagen famous for its crowded street markets with the best street food in Asia'
      }
    ]
  },
  {
    id: '3202b202-7d98-4b23-9100-bf18c0615947',
    description: '',
    name: 'Amsterdam',
    pictures: []
  },
  {
    id: '14ca415e-fc87-4c30-aea8-cddf7d32337e',
    description: 'Chamonix - with a beautiful old town',
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/16.jpg',
        description: 'Chamonix in a middle of Europe'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Chamonix a perfect place to stay with a family'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/10.jpg',
        description: 'Chamonix in a middle of Europe'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/1.jpg',
        description: 'Chamonix in a middle of Europe'
      }
    ]
  },
  {
    id: '3113e602-f294-4341-a775-d43045a3add9',
    description: 'Barcelona - for those who value comfort and coziness',
    name: 'Barcelona',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/19.jpg',
        description: 'Barcelona with crowded streets'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/6.jpg',
        description: 'Barcelona a perfect place to stay with a family'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/7.jpg',
        description: 'Barcelona a true asian pearl'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Barcelona full of of cozy canteens where you can try the best coffee in the Middle East'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/20.jpg',
        description: 'Barcelona famous for its crowded street markets with the best street food in Asia'
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
