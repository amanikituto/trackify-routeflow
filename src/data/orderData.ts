
export interface Order {
  id: string;
  customer: string;
  items: number;
  address: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Delayed';
  scheduledDate: Date;
  driver?: string;
  deliveryTime?: string;
  region?: string;
}

// Sample order data with more diverse entries for better search testing
export const orders: Order[] = Array.from({ length: 25 }).map((_, index) => {
  const statuses = ['Delivered', 'In Transit', 'Processing', 'Delayed'] as const;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Create more diverse addresses and customer names for better search testing
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Broadway', 'Park Lane'];
  const customerTypes = ['Individual', 'Business', 'Corporate', 'Government', 'Non-profit'];
  const drivers = ['James Wilson', 'Maria Garcia', 'Alex Johnson', 'Sarah Lee', 'Robert Chen'];
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  
  const city = cities[index % cities.length];
  const street = streets[index % streets.length];
  const customerPrefix = customerTypes[index % customerTypes.length];
  const driver = drivers[index % drivers.length];
  const region = regions[index % regions.length];
  
  // Generate a random delivery time between 9 AM and 5 PM
  const hour = 9 + Math.floor(Math.random() * 8);
  const minute = Math.floor(Math.random() * 60);
  const deliveryTime = `${hour}:${minute < 10 ? '0' + minute : minute} ${hour < 12 ? 'AM' : 'PM'}`;
  
  return {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    customer: `${customerPrefix} Customer ${index + 1}`,
    items: Math.floor(1 + Math.random() * 5),
    address: `${123 + index} ${street}, ${city}`,
    status,
    scheduledDate: new Date(Date.now() + (index * 86400000)),
    driver,
    deliveryTime,
    region
  };
});

// Helper function to filter orders
export const filterOrders = (orders: Order[], filter: string): Order[] => {
  if (filter === 'all') return orders;
  return orders.filter(order => {
    switch (filter) {
      case 'pending': return order.status === 'Processing';
      case 'transit': return order.status === 'In Transit';
      case 'delivered': return order.status === 'Delivered';
      case 'delayed': return order.status === 'Delayed';
      default: return true;
    }
  });
};

// Search function that can be used for more advanced search requirements
export const searchOrders = (orders: Order[], query: string): Order[] => {
  if (!query.trim()) return orders;
  
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  return orders.filter(order => {
    // Check if any search term matches any field
    return searchTerms.some(term => 
      order.id.toLowerCase().includes(term) ||
      order.customer.toLowerCase().includes(term) ||
      order.address.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term) ||
      (order.driver && order.driver.toLowerCase().includes(term)) ||
      (order.region && order.region.toLowerCase().includes(term))
    );
  });
};

// Calculate analytics based on orders
export const getOrderAnalytics = (orders: Order[]) => {
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const inTransitOrders = orders.filter(o => o.status === 'In Transit').length;
  const processingOrders = orders.filter(o => o.status === 'Processing').length;
  const delayedOrders = orders.filter(o => o.status === 'Delayed').length;
  
  // Calculate on-time rate (delivered orders that weren't delayed)
  const onTimeRate = totalOrders > 0 ? 
    ((deliveredOrders - delayedOrders) / totalOrders) * 100 : 0;
  
  // Get orders by region
  const regionCounts = orders.reduce((acc, order) => {
    if (order.region) {
      acc[order.region] = (acc[order.region] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Get driver performance
  const driverPerformance = orders.reduce((acc, order) => {
    if (order.driver) {
      if (!acc[order.driver]) {
        acc[order.driver] = { 
          totalDeliveries: 0, 
          onTimeDeliveries: 0,
          delayedDeliveries: 0 
        };
      }
      
      acc[order.driver].totalDeliveries += 1;
      
      if (order.status === 'Delivered') {
        acc[order.driver].onTimeDeliveries += 1;
      } else if (order.status === 'Delayed') {
        acc[order.driver].delayedDeliveries += 1;
      }
    }
    return acc;
  }, {} as Record<string, { totalDeliveries: number, onTimeDeliveries: number, delayedDeliveries: number }>);
  
  return {
    totalOrders,
    deliveredOrders,
    inTransitOrders,
    processingOrders,
    delayedOrders,
    onTimeRate,
    regionCounts,
    driverPerformance
  };
};
