// Mock Georgian real estate data
export interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  district: string;
  type: 'apartment' | 'house' | 'commercial';
  size: number;
  rooms?: number;
  dateAdded: string;
  coordinates: [number, number];
}

export interface PriceHistory {
  date: string;
  avgPrice: number;
  city: string;
  type: string;
}

export interface MarketStats {
  totalProperties: number;
  avgPrice: number;
  monthlyChange: number;
  topCities: Array<{
    city: string;
    count: number;
    avgPrice: number;
  }>;
}

// Generate realistic Georgian property data
export const mockProperties: Property[] = [
  // Tbilisi properties
  { id: '1', title: 'Modern Apartment in Vake', price: 185000, city: 'Tbilisi', district: 'Vake', type: 'apartment', size: 85, rooms: 3, dateAdded: '2024-07-10', coordinates: [44.8176, 41.7151] },
  { id: '2', title: 'Luxury Villa in Mtatsminda', price: 450000, city: 'Tbilisi', district: 'Mtatsminda', type: 'house', size: 280, rooms: 5, dateAdded: '2024-07-08', coordinates: [44.8176, 41.7151] },
  { id: '3', title: 'Business Center Office', price: 320000, city: 'Tbilisi', district: 'Saburtalo', type: 'commercial', size: 150, dateAdded: '2024-07-12', coordinates: [44.8176, 41.7151] },
  { id: '4', title: 'Cozy Apartment in Old Tbilisi', price: 125000, city: 'Tbilisi', district: 'Old Tbilisi', type: 'apartment', size: 65, rooms: 2, dateAdded: '2024-07-05', coordinates: [44.8176, 41.7151] },
  { id: '5', title: 'Spacious House in Didube', price: 210000, city: 'Tbilisi', district: 'Didube', type: 'house', size: 180, rooms: 4, dateAdded: '2024-07-11', coordinates: [44.8176, 41.7151] },
  { id: '6', title: 'Studio in Vera', price: 95000, city: 'Tbilisi', district: 'Vera', type: 'apartment', size: 45, rooms: 1, dateAdded: '2024-07-09', coordinates: [44.8176, 41.7151] },
  { id: '7', title: 'Penthouse in Sololaki', price: 380000, city: 'Tbilisi', district: 'Sololaki', type: 'apartment', size: 150, rooms: 4, dateAdded: '2024-07-07', coordinates: [44.8176, 41.7151] },
  { id: '8', title: 'Family Home in Isani', price: 155000, city: 'Tbilisi', district: 'Isani', type: 'house', size: 120, rooms: 3, dateAdded: '2024-07-13', coordinates: [44.8176, 41.7151] },
  
  // Batumi properties
  { id: '9', title: 'Beachfront Apartment', price: 165000, city: 'Batumi', district: 'Old Boulevard', type: 'apartment', size: 75, rooms: 2, dateAdded: '2024-07-06', coordinates: [41.6168, 41.6086] },
  { id: '10', title: 'Hotel Building', price: 850000, city: 'Batumi', district: 'New Boulevard', type: 'commercial', size: 500, dateAdded: '2024-07-04', coordinates: [41.6168, 41.6086] },
  { id: '11', title: 'Sea View Villa', price: 290000, city: 'Batumi', district: 'Khelvachauri', type: 'house', size: 200, rooms: 4, dateAdded: '2024-07-14', coordinates: [41.6168, 41.6086] },
  { id: '12', title: 'Modern Complex Unit', price: 135000, city: 'Batumi', district: 'Angisa', type: 'apartment', size: 68, rooms: 2, dateAdded: '2024-07-03', coordinates: [41.6168, 41.6086] },
  
  // Kutaisi properties
  { id: '13', title: 'Historic House in Center', price: 85000, city: 'Kutaisi', district: 'Center', type: 'house', size: 140, rooms: 3, dateAdded: '2024-07-08', coordinates: [42.2679, 42.2679] },
  { id: '14', title: 'Apartment near University', price: 65000, city: 'Kutaisi', district: 'University District', type: 'apartment', size: 55, rooms: 2, dateAdded: '2024-07-10', coordinates: [42.2679, 42.2679] },
  { id: '15', title: 'Commercial Space', price: 120000, city: 'Kutaisi', district: 'Industrial Zone', type: 'commercial', size: 200, dateAdded: '2024-07-12', coordinates: [42.2679, 42.2679] },
  
  // Rustavi properties
  { id: '16', title: 'Family Apartment', price: 55000, city: 'Rustavi', district: 'Rustavi Center', type: 'apartment', size: 70, rooms: 3, dateAdded: '2024-07-09', coordinates: [44.9967, 41.5495] },
  { id: '17', title: 'Industrial Property', price: 180000, city: 'Rustavi', district: 'Industrial District', type: 'commercial', size: 350, dateAdded: '2024-07-07', coordinates: [44.9967, 41.5495] },
  
  // Zugdidi properties
  { id: '18', title: 'Traditional House', price: 48000, city: 'Zugdidi', district: 'Central Zugdidi', type: 'house', size: 110, rooms: 3, dateAdded: '2024-07-11', coordinates: [41.8709, 42.5088] },
  { id: '19', title: 'Small Apartment', price: 35000, city: 'Zugdidi', district: 'Residential Area', type: 'apartment', size: 45, rooms: 2, dateAdded: '2024-07-13', coordinates: [41.8709, 42.5088] },
  
  // Gori properties
  { id: '20', title: 'Countryside Villa', price: 92000, city: 'Gori', district: 'Gori Center', type: 'house', size: 160, rooms: 4, dateAdded: '2024-07-05', coordinates: [44.1085, 41.9833] },
  { id: '21', title: 'City Apartment', price: 42000, city: 'Gori', district: 'New District', type: 'apartment', size: 60, rooms: 2, dateAdded: '2024-07-14', coordinates: [44.1085, 41.9833] },
];

// Price history data for trends
export const priceHistory: PriceHistory[] = [
  // Tbilisi trends
  { date: '2024-01', avgPrice: 1820, city: 'Tbilisi', type: 'apartment' },
  { date: '2024-02', avgPrice: 1850, city: 'Tbilisi', type: 'apartment' },
  { date: '2024-03', avgPrice: 1875, city: 'Tbilisi', type: 'apartment' },
  { date: '2024-04', avgPrice: 1890, city: 'Tbilisi', type: 'apartment' },
  { date: '2024-05', avgPrice: 1910, city: 'Tbilisi', type: 'apartment' },
  { date: '2024-06', avgPrice: 1925, city: 'Tbilisi', type: 'apartment' },
  { date: '2024-07', avgPrice: 1940, city: 'Tbilisi', type: 'apartment' },
  
  // Batumi trends
  { date: '2024-01', avgPrice: 1650, city: 'Batumi', type: 'apartment' },
  { date: '2024-02', avgPrice: 1670, city: 'Batumi', type: 'apartment' },
  { date: '2024-03', avgPrice: 1680, city: 'Batumi', type: 'apartment' },
  { date: '2024-04', avgPrice: 1695, city: 'Batumi', type: 'apartment' },
  { date: '2024-05', avgPrice: 1710, city: 'Batumi', type: 'apartment' },
  { date: '2024-06', avgPrice: 1725, city: 'Batumi', type: 'apartment' },
  { date: '2024-07', avgPrice: 1745, city: 'Batumi', type: 'apartment' },
  
  // Kutaisi trends
  { date: '2024-01', avgPrice: 920, city: 'Kutaisi', type: 'apartment' },
  { date: '2024-02', avgPrice: 930, city: 'Kutaisi', type: 'apartment' },
  { date: '2024-03', avgPrice: 945, city: 'Kutaisi', type: 'apartment' },
  { date: '2024-04', avgPrice: 955, city: 'Kutaisi', type: 'apartment' },
  { date: '2024-05', avgPrice: 965, city: 'Kutaisi', type: 'apartment' },
  { date: '2024-06', avgPrice: 975, city: 'Kutaisi', type: 'apartment' },
  { date: '2024-07', avgPrice: 985, city: 'Kutaisi', type: 'apartment' },
];

// Seasonal data for best time to buy analysis
export const seasonalData = [
  { month: 'Jan', avgPrice: 158000, listingCount: 245 },
  { month: 'Feb', avgPrice: 152000, listingCount: 220 },
  { month: 'Mar', avgPrice: 165000, listingCount: 280 },
  { month: 'Apr', avgPrice: 172000, listingCount: 315 },
  { month: 'May', avgPrice: 178000, listingCount: 350 },
  { month: 'Jun', avgPrice: 185000, listingCount: 380 },
  { month: 'Jul', avgPrice: 188000, listingCount: 295 },
  { month: 'Aug', avgPrice: 190000, listingCount: 275 },
  { month: 'Sep', avgPrice: 175000, listingCount: 265 },
  { month: 'Oct', avgPrice: 168000, listingCount: 240 },
  { month: 'Nov', avgPrice: 155000, listingCount: 210 },
  { month: 'Dec', avgPrice: 149000, listingCount: 195 },
];

// Market stats
export const marketStats: MarketStats = {
  totalProperties: mockProperties.length,
  avgPrice: Math.round(mockProperties.reduce((sum, p) => sum + p.price, 0) / mockProperties.length),
  monthlyChange: 2.8,
  topCities: [
    { city: 'Tbilisi', count: 8, avgPrice: 246250 },
    { city: 'Batumi', count: 4, avgPrice: 360000 },
    { city: 'Kutaisi', count: 3, avgPrice: 90000 },
    { city: 'Rustavi', count: 2, avgPrice: 117500 },
    { city: 'Zugdidi', count: 2, avgPrice: 41500 },
    { city: 'Gori', count: 2, avgPrice: 67000 },
  ]
};