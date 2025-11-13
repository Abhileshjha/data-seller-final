export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  dataPoints: string;
  source: string;
  locations: string;
  downloadUrl: string;
}

export interface TrafficSourceData {
  name: string;
  value: number;
  fill: string;
  // Fix: Add index signature to conform to the data structure expected by the recharts library.
  [key: string]: string | number;
}

export interface VisitorActivityData {
  name: string;
  visitors: number;
}
