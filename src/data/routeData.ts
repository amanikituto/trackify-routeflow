
export interface RouteStop {
  id: number;
  customerName: string;
  address: string;
  priority: 'Priority' | 'Regular' | 'Express';
  eta: string;
  completed: boolean;
}

export interface RouteInfo {
  id: number;
  name: string;
  totalDistance: string;
  estimatedTime: string;
  deliveryStops: number;
  timeWindow: string;
  optimized: boolean;
  stops: RouteStop[];
  coordinates: Array<{
    lat: number;
    lng: number;
    type: 'customer' | 'depot';
  }>;
}

// Sample route data
export const routes: RouteInfo[] = [
  {
    id: 1,
    name: "Route #1",
    totalDistance: "47.3 miles",
    estimatedTime: "2h 15min",
    deliveryStops: 14,
    timeWindow: "8AM - 3PM",
    optimized: true,
    coordinates: [
      { lat: 40.7128, lng: -74.0060, type: 'depot' },
      { lat: 40.7328, lng: -73.9860, type: 'customer' },
      { lat: 40.7428, lng: -74.0260, type: 'customer' },
      { lat: 40.7028, lng: -74.0160, type: 'customer' },
      { lat: 40.7228, lng: -73.9960, type: 'customer' },
    ],
    stops: [
      {
        id: 101,
        customerName: "Customer 3845",
        address: "123 Main St, New York",
        priority: "Priority",
        eta: "9:00 AM",
        completed: false
      },
      {
        id: 102,
        customerName: "Customer 5912",
        address: "456 Oak Ave, Brooklyn",
        priority: "Regular",
        eta: "10:30 AM",
        completed: false
      },
      {
        id: 103,
        customerName: "Customer 2734",
        address: "789 Pine Rd, Queens",
        priority: "Express",
        eta: "11:45 AM",
        completed: false
      },
      {
        id: 104,
        customerName: "Customer 6291",
        address: "321 Elm St, Bronx",
        priority: "Priority",
        eta: "1:15 PM",
        completed: false
      },
      {
        id: 105,
        customerName: "Customer 4187",
        address: "654 Maple Ave, Staten Island",
        priority: "Regular",
        eta: "2:30 PM",
        completed: false
      },
      {
        id: 106,
        customerName: "Customer 8521",
        address: "987 Cedar Blvd, Manhattan",
        priority: "Express",
        eta: "3:00 PM",
        completed: false
      }
    ]
  },
  {
    id: 2,
    name: "Route #2",
    totalDistance: "38.9 miles",
    estimatedTime: "1h 45min",
    deliveryStops: 11,
    timeWindow: "9AM - 4PM",
    optimized: true,
    coordinates: [
      { lat: 40.7128, lng: -74.0060, type: 'depot' },
      { lat: 40.7528, lng: -73.9760, type: 'customer' },
      { lat: 40.7628, lng: -74.0160, type: 'customer' },
      { lat: 40.7328, lng: -74.0260, type: 'customer' },
      { lat: 40.7028, lng: -73.9860, type: 'customer' },
    ],
    stops: [
      {
        id: 201,
        customerName: "Customer 7563",
        address: "234 State St, Manhattan",
        priority: "Express",
        eta: "9:30 AM",
        completed: true
      },
      {
        id: 202,
        customerName: "Customer 4128",
        address: "567 Central Ave, Brooklyn",
        priority: "Priority",
        eta: "10:45 AM",
        completed: true
      },
      {
        id: 203,
        customerName: "Customer 9356",
        address: "890 Broadway, Queens",
        priority: "Regular",
        eta: "11:15 AM",
        completed: false
      },
      {
        id: 204,
        customerName: "Customer 2817",
        address: "432 Park Ave, Bronx",
        priority: "Express",
        eta: "12:30 PM",
        completed: false
      },
      {
        id: 205,
        customerName: "Customer 6492",
        address: "765 Madison St, Staten Island",
        priority: "Regular",
        eta: "2:00 PM",
        completed: false
      }
    ]
  },
  {
    id: 3,
    name: "Route #3",
    totalDistance: "52.1 miles",
    estimatedTime: "2h 30min",
    deliveryStops: 16,
    timeWindow: "7AM - 2PM",
    optimized: false,
    coordinates: [
      { lat: 40.7128, lng: -74.0060, type: 'depot' },
      { lat: 40.7428, lng: -74.0360, type: 'customer' },
      { lat: 40.7228, lng: -73.9760, type: 'customer' },
      { lat: 40.7528, lng: -74.0160, type: 'customer' },
      { lat: 40.7328, lng: -73.9860, type: 'customer' },
    ],
    stops: [
      {
        id: 301,
        customerName: "Customer 5817",
        address: "345 River Rd, Manhattan",
        priority: "Priority",
        eta: "8:15 AM",
        completed: true
      },
      {
        id: 302,
        customerName: "Customer 9234",
        address: "678 Ocean Ave, Brooklyn",
        priority: "Regular",
        eta: "9:45 AM",
        completed: true
      },
      {
        id: 303,
        customerName: "Customer 4571",
        address: "901 Mountain Blvd, Queens",
        priority: "Express",
        eta: "11:00 AM",
        completed: true
      },
      {
        id: 304,
        customerName: "Customer 8329",
        address: "543 Valley Way, Bronx",
        priority: "Regular",
        eta: "12:15 PM",
        completed: false
      },
      {
        id: 305,
        customerName: "Customer 6785",
        address: "876 Desert St, Staten Island",
        priority: "Priority",
        eta: "1:30 PM",
        completed: false
      },
      {
        id: 306,
        customerName: "Customer 3142",
        address: "219 Forest Ave, Manhattan",
        priority: "Express",
        eta: "2:45 PM",
        completed: false
      }
    ]
  }
];
