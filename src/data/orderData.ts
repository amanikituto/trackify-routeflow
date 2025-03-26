
export interface Order {
  id: string;
  customer: string;
  items: number;
  address: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Delayed';
  scheduledDate: Date;
}

// Sample order data with more diverse entries for better search testing
export const orders: Order[] = Array.from({ length: 25 }).map((_, index) => {
  const statuses = ['Delivered', 'In Transit', 'Processing', 'Delayed'] as const;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Create more diverse addresses and customer names for better search testing
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Broadway', 'Park Lane'];
  const customerTypes = ['Individual', 'Business', 'Corporate', 'Government', 'Non-profit'];
  
  const city = cities[index % cities.length];
  const street = streets[index % streets.length];
  const customerPrefix = customerTypes[index % customerTypes.length];
  
  return {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    customer: `${customerPrefix} Customer ${index + 1}`,
    items: Math.floor(1 + Math.random() * 5),
    address: `${123 + index} ${street}, ${city}`,
    status,
    scheduledDate: new Date(Date.now() + (index * 86400000)),
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
      order.status.toLowerCase().includes(term)
    );
  });
};
