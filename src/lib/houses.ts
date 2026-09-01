export const HOUSES = [
  {
    id: 'nest',
    slug: 'nest',
    image: 'https://www.puertofjord.com/lovable-uploads/d1a96e69-1766-4e4b-8806-c2769640ce1d.png',
    guests: 6,
    bedrooms: 2,
    rateFrom: 2042,
  },
  {
    id: 'cliff',
    slug: 'cliff',
    image: 'https://www.puertofjord.com/lovable-uploads/c09c8416-c052-4bd1-88cd-5cbb6ffadbd5.png',
    guests: 9,
    bedrooms: 3,
    rateFrom: 2000,
  },
  {
    id: 'icefield',
    slug: 'icefield',
    image: 'https://www.puertofjord.com/lovable-uploads/icefield-house-6.jpg',
    guests: 10,
    bedrooms: 4,
    rateFrom: 2500,
  },
  {
    id: 'loft',
    slug: 'loft',
    image: 'https://www.puertofjord.com/lovable-uploads/7d18abe5-d372-4a27-94b7-d2a39f1d5206.png',
    guests: 4,
    bedrooms: 2,
    rateFrom: 894,
  },
  {
    id: 'woods',
    slug: 'woods',
    image: 'https://www.puertofjord.com/lovable-uploads/woods-house-new.jpg',
    guests: 6,
    bedrooms: 2,
    rateFrom: 715,
  },
] as const

export type HouseId = typeof HOUSES[number]['id']
