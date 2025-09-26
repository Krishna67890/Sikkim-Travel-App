// src/data/mockData/monasteriesData.js

export const monasteriesData = [
  {
    id: 1,
    name: 'Rumtek Monastery',
    image: 'https://images.unsplash.com/photo-1598979341340-a470cf86f098?w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1598979341340-a470cf86f098?w=800',
    location: 'Gangtok',
    district: 'East Sikkim',
    altitude: '1,500 m',
    establishedYear: 1740,
    entryFee: 20,
    rating: 4.7,
    bestTime: ['spring', 'autumn'],
    architecturalStyle: 'tibetan',
    photographyAllowed: true,
    description:
      'Rumtek Monastery, also known as the Dharma Chakra Centre, is one of the most significant monasteries in Sikkim, known for its intricate murals, golden stupa, and serene surroundings.',
    features: ['Golden stupa', 'Prayer wheels', 'Kagyupa seat'],
    monks: 200,
    festivals: [
      { name: 'Losar (Tibetan New Year)', date: 'Feb-Mar', description: 'Colorful celebrations with traditional dances.' },
      { name: 'Kagyed Dance', date: 'Nov-Dec', description: 'Masked dance performed by lamas.' }
    ],
    timings: '6:00 AM - 6:00 PM',
    distance: '24 km',
    duration: '2-3 hrs',
    categories: ['Pilgrimage', 'Heritage'],
    highlights: ['Golden stupa', 'Panoramic views']
  },
  {
    id: 2,
    name: 'Pemayangtse Monastery',
    image: 'https://images.unsplash.com/photo-1542640247-259a400a0f3c?w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1542640247-259a400a0f3c?w=800',
    location: 'Pelling',
    district: 'West Sikkim',
    altitude: '2,085 m',
    establishedYear: 1705,
    entryFee: 30,
    rating: 4.6,
    bestTime: ['autumn', 'winter'],
    architecturalStyle: 'bhutia',
    photographyAllowed: true,
    description:
      'One of the oldest and most prestigious monasteries in Sikkim, offering stunning views of the Himalayas and intricate wooden sculptures.',
    features: ['7-tier wooden sculpture', 'Himalayan views'],
    monks: 120,
    festivals: [
      { name: 'Cham Dance', date: 'Jan-Feb', description: 'Traditional masked dance festival.' }
    ],
    timings: '7:00 AM - 5:00 PM',
    distance: '1 km',
    duration: '1-2 hrs',
    categories: ['Pilgrimage', 'Cultural'],
    highlights: ['Ancient murals', 'Woodwork']
  },
  {
    id: 3,
    name: 'Enchey Monastery',
    image: 'https://images.unsplash.com/photo-1523419440324-3057d1e83c5b?w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1523419440324-3057d1e83c5b?w=800',
    location: 'Gangtok',
    district: 'East Sikkim',
    altitude: '2,000 m',
    establishedYear: 1909,
    entryFee: 0,
    rating: 4.4,
    bestTime: ['spring', 'summer', 'autumn'],
    architecturalStyle: 'mixed',
    photographyAllowed: false,
    description:
      'A peaceful monastery perched on a hilltop, known for its spiritual ambiance, colorful prayer flags, and the annual Chaam festival.',
    features: ['Chaam festival', 'Prayer flags'],
    monks: 80,
    festivals: [
      { name: 'Chaam', date: 'Dec-Jan', description: 'Vibrant masked dance ceremony.' }
    ],
    timings: '6:00 AM - 4:00 PM',
    distance: '3 km',
    duration: '1-2 hrs',
    categories: ['Pilgrimage', 'Scenic'],
    highlights: ['Hilltop views', 'Serene ambience']
  },
  {
    id: 4,
    name: 'Phodong Monastery',
    image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=800',
    location: 'Mangan',
    district: 'North Sikkim',
    altitude: '1,379 m',
    establishedYear: 1740,
    entryFee: 10,
    rating: 4.3,
    bestTime: ['spring', 'autumn'],
    architecturalStyle: 'tibetan',
    photographyAllowed: true,
    description: 'Known for its annual Chaam dance and serene surroundings.',
    features: ['Chaam dance', 'Ancient murals'],
    monks: 60,
    festivals: [{ name: 'Chaam', date: 'Dec-Jan', description: 'Mask dance festival.' }],
    timings: '7:00 AM - 5:00 PM',
    distance: '38 km',
    duration: '1-2 hrs',
    categories: ['Pilgrimage', 'Cultural'],
    highlights: ['Mask dances', 'Murals']
  },
  {
    id: 5,
    name: 'Ralang Monastery',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    location: 'Ravangla',
    district: 'South Sikkim',
    altitude: '2,134 m',
    establishedYear: 1768,
    entryFee: 0,
    rating: 4.5,
    bestTime: ['summer', 'autumn'],
    architecturalStyle: 'tibetan',
    photographyAllowed: true,
    description: 'A significant Kagyu monastery famous for its sacred traditions.',
    features: ['Kagyed dance', 'Prayer flags'],
    monks: 100,
    festivals: [{ name: 'Pang Lhabsol', date: 'Aug-Sep', description: 'Festival honoring Mount Kanchenjunga.' }],
    timings: '6:00 AM - 6:00 PM',
    distance: '6 km',
    duration: '1-2 hrs',
    categories: ['Pilgrimage', 'Scenic'],
    highlights: ['Hill views', 'Festivals']
  }
];

export default monasteriesData;


