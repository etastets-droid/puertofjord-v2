export const HOUSES = [
  {
    id: 'nest',
    slug: 'nest',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    guests: 6,
    bedrooms: 2,
    rateFrom: 2042,
    peak: true,
  },
  {
    id: 'cliff',
    slug: 'cliff',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=80',
    guests: 9,
    bedrooms: 3,
    rateFrom: 2000,
    peak: false,
  },
  {
    id: 'icefield',
    slug: 'icefield',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    guests: 10,
    bedrooms: 4,
    rateFrom: 2500,
    peak: true,
  },
  {
    id: 'loft',
    slug: 'loft',
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=80',
    guests: 4,
    bedrooms: 2,
    rateFrom: 894,
    peak: true,
  },
  {
    id: 'woods',
    slug: 'woods',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=900&q=80',
    guests: 6,
    bedrooms: 2,
    rateFrom: 715,
    peak: false,
  },
] as const

export type HouseId = typeof HOUSES[number]['id']
