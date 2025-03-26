
export interface Order {
  id: string;
  customer: string;
  items: number;
  address: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Delayed';
  scheduledDate: Date;
}

// Sample order data
export const orders: Order[] = Array.from({ length: 25 }).map((_, index) => {
  const statuses = ['Delivered', 'In Transit', 'Processing', 'Delayed'] as const;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    customer: `Customer ${index + 1}`,
    items: Math.floor(1 + Math.random() * 5),
    address: index % 2 === 0 ? '123 Main St, City' : '456 Oak Ave, Town',
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
