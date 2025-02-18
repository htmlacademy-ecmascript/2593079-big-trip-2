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
        id: '4a2abed0-85dd-432c-9fde-177bff1fe565',
        title: 'Upgrade to a business class',
        price: 30
      },
      {
        id: '5058ab37-a445-4c6a-871b-88ea10b166ef',
        title: 'Choose the radio station',
        price: 51
      },
      {
        id: '5819b80e-c055-402e-a525-9c2b234e1813',
        title: 'Choose temperature',
        price: 79
      },
      {
        id: '604db66b-1f0c-4b0c-808d-30668eb10393',
        title: 'Drive quickly, I\'m in a hurry',
        price: 30
      },
      {
        id: 'bc71dd1e-713b-4b53-aca5-daabf2b64cf4',
        title: 'Drive slowly',
        price: 152
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '92f4ce87-34cc-4486-91f6-e96fb681ab4a',
        title: 'Infotainment system',
        price: 189
      },
      {
        id: 'f704ed24-48cf-40f6-8e2e-c587e78265ad',
        title: 'Order meal',
        price: 56
      },
      {
        id: '8688de29-f44e-492e-9f01-c6604d22d24a',
        title: 'Choose seats',
        price: 136
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'b3bd4067-5cae-4f4d-b379-6d018014727c',
        title: 'Book a taxi at the arrival point',
        price: 130
      },
      {
        id: '8c12bc5f-6dd4-484a-854b-bfc3f563f20c',
        title: 'Order a breakfast',
        price: 72
      },
      {
        id: '30b4d025-33e8-4be2-b7cb-ae4a25f51b4c',
        title: 'Wake up at a certain time',
        price: 154
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '991b41c9-d7f4-4cc2-ad62-7f2bb282dc6d',
        title: 'Choose meal',
        price: 138
      },
      {
        id: '151861b6-48ae-4a66-8dde-f142799554b8',
        title: 'Choose seats',
        price: 135
      },
      {
        id: '475f400f-7a0c-45c7-9c8d-e98ca1d79e47',
        title: 'Upgrade to comfort class',
        price: 38
      },
      {
        id: 'bbeda7c0-9c74-47a9-b2d5-19de9f18ef20',
        title: 'Upgrade to business class',
        price: 159
      },
      {
        id: 'b7dc1b70-7c81-4133-bccc-db4a9b84944f',
        title: 'Add luggage',
        price: 56
      },
      {
        id: '3659f72a-4b30-4304-b5ff-d01a626c7958',
        title: 'Business lounge',
        price: 34
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '75f277b9-20eb-4ad7-af1c-e1292c2e670a',
        title: 'Choose the time of check-in',
        price: 37
      },
      {
        id: '5e678ea9-0735-4f8c-9936-b7b0828c027a',
        title: 'Choose the time of check-out',
        price: 148
      },
      {
        id: '2bda23b2-d8d1-4353-a68b-dc81109f1a42',
        title: 'Add breakfast',
        price: 79
      },
      {
        id: 'd30f0684-7d97-40f7-8a4c-efd9e6a370a4',
        title: 'Laundry',
        price: 138
      },
      {
        id: '54a0cc6e-3ac0-48a8-851d-529e8dbf8e61',
        title: 'Order a meal from the restaurant',
        price: 73
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
        id: '43bf6991-2b16-4f9b-81b8-4b25f3efac29',
        title: 'Choose meal',
        price: 42
      },
      {
        id: 'fe022e53-68b4-4add-aaf6-0413c15eb56a',
        title: 'Choose seats',
        price: 77
      },
      {
        id: '5ccb92f8-19a5-491c-a8c4-f31412f2b1f2',
        title: 'Upgrade to comfort class',
        price: 79
      },
      {
        id: 'aa7ff8ed-b3b4-4e56-9bde-02c68d6fe01d',
        title: 'Upgrade to business class',
        price: 104
      },
      {
        id: '46fac752-60f1-4709-903f-a20cf1c6a1f7',
        title: 'Add luggage',
        price: 60
      },
      {
        id: 'e1cf9783-59d1-411d-8459-c8fe49c4bed8',
        title: 'Business lounge',
        price: 46
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'cf4e9583-5001-4577-a0d6-3fa851cbcde3',
        title: 'With automatic transmission',
        price: 175
      },
      {
        id: 'caf8ba99-90d2-4fba-91e6-2c969b2dde50',
        title: 'With air conditioning',
        price: 178
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '9e68af73-d9fe-475a-90d9-c59d991708dc',
        title: 'Choose live music',
        price: 43
      },
      {
        id: '3b9f60dc-9972-4d89-a373-c2c590766ebd',
        title: 'Choose VIP area',
        price: 198
      }
    ]
  }
];


const getMockOffers = () => mockOffers;
const getMockDestinations = () => mockDestinations;
const getRandomEvent = getRandomArrayElement(mockEvents);


export { getRandomEvent, getMockOffers, getMockDestinations };
