
import { Product, TrafficSourceData, VisitorActivityData } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Yamuna Expressway Leads",
    description: "Highly targeted data for real estate opportunities along the Yamuna Expressway.",
    price: 699,
    dataPoints: "3,500+",
    source: "Google Ads",
    locations: "Yamuna Expressway",
    downloadUrl: "/downloads/Yamuna-Expressway-Data.csv",
  },
  {
    id: 2,
    name: "Mixed Metro Leads",
    description: "A broad mix of high-intent leads from key metropolitan areas.",
    price: 1299,
    dataPoints: "10,000+",
    source: "Google & Meta Ads",
    locations: "Delhi-NCR",
    downloadUrl: "/downloads/Mixed-Metro-Leads.csv",
  },
  {
    id: 3,
    name: "Comprehensive Noida+ Leads",
    description: "Exhaustive dataset covering the entire commercial and residential landscape.",
    price: 1799,
    dataPoints: "45,000+",
    source: "Google & Meta Ads",
    locations: "Noida, Ghaziabad, Gr. Noida",
    downloadUrl: "/downloads/Noida-High-Quality-Leads.csv",
  },
];

export const TRAFFIC_SOURCE_DATA: TrafficSourceData[] = [
  { name: 'Google Ads', value: 400, fill: '#4F46E5' },
  { name: 'Meta Ads', value: 300, fill: '#8A2BE2' },
  { name: 'Organic', value: 150, fill: '#10B981' },
  { name: 'Direct', value: 100, fill: '#F59E0B' },
];

export const VISITOR_ACTIVITY_DATA: VisitorActivityData[] = [
  { name: 'Mon', visitors: 120 },
  { name: 'Tue', visitors: 180 },
  { name: 'Wed', visitors: 150 },
  { name: 'Thu', visitors: 210 },
  { name: 'Fri', visitors: 250 },
  { name: 'Sat', visitors: 310 },
  { name: 'Sun', visitors: 290 },
];
