import React, { useState, useEffect } from 'react';
import {
  PackageOpen,
  Search,
  Filter,
  Plus,
  ChevronDown,
  CircleCheck,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CustomButton from './ui-components/Button';
import StatCard from './ui-components/StatCard';
import { useToast } from '@/hooks/use-toast';
import { orders, filterOrders, Order } from '@/data/orderData';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, FormProvider } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';

interface OrderFormValues {
  customer: string;
  items: number;
  address: string;
  status: 'Processing' | 'In Transit' | 'Delivered' | 'Delayed';
  scheduledDate: string;
}

const OrderManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [displayedOrders, setDisplayedOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<OrderFormValues>({
    defaultValues: {
      customer: '',
      items: 1,
      address: '',
      status: 'Processing',
      scheduledDate: new Date().toISOString().split('T')[0],
    },
  });
  
  const ordersPerPage = 10;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      performSearch();
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [searchQuery, selectedFilter, currentPage]);

  const performSearch = () => {
    const filtered = filterOrders(orders, selectedFilter).filter(
      order => order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const filteredTotalPages = Math.ceil(filtered.length / ordersPerPage);
    
    if (currentPage > filteredTotalPages && filteredTotalPages > 0) {
      setCurrentPage(1);
    }
    
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    setDisplayedOrders(filtered.slice(startIndex, endIndex));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    if (searchQuery) {
      setSearchQuery('');
      setIsSearching(true);
      setCurrentPage(1);
      
      toast({
        title: "Search Cleared",
        description: "Showing all orders",
      });
    }
  };

  const handleStatusChange = (order: Order, newStatus: Order['status']) => {
    order.status = newStatus;
    setDisplayedOrders([...displayedOrders]);
    
    toast({
      title: "Order Status Updated",
      description: `Order ${order.id} has been marked as ${newStatus}`,
      variant: newStatus === 'Delayed' ? 'destructive' : 'default',
    });
  };

  const handleDeleteOrder = (orderToDelete: Order) => {
    const index = orders.findIndex(order => order.id === orderToDelete.id);
    if (index !== -1) {
      orders.splice(index, 1);
      setDisplayedOrders(displayedOrders.filter(order => order.id !== orderToDelete.id));
      
      toast({
        title: "Order Deleted",
        description: `Order ${orderToDelete.id} has been removed from the system`,
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: OrderFormValues) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customer: data.customer,
      items: data.items,
      address: data.address,
      status: data.status,
      scheduledDate: new Date(data.scheduledDate),
    };
    
    orders.unshift(newOrder);
    setDisplayedOrders([newOrder, ...displayedOrders].slice(0, ordersPerPage));
    
    toast({
      title: "Order Created",
      description: "New order has been added to the system",
    });
    
    form.reset();
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-amber-100 text-amber-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return '';
    }
  };

  const getStatCounts = () => {
    const totals = {
      total: orders.length,
      inTransit: orders.filter(order => order.status === 'In Transit').length,
      delayed: orders.filter(order => order.status === 'Delayed').length,
      delivered: orders.filter(order => order.status === 'Delivered').length
    };
    return totals;
  };

  const stats = getStatCounts();
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="h2">Order Management</h1>
          <p className="text-muted-foreground">Track and manage your delivery orders</p>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton 
            size="sm" 
            variant="outline" 
            iconLeft={<Filter size={16} />}
          >
            Filters
          </CustomButton>
          <Sheet>
            <SheetTrigger asChild>
              <CustomButton 
                size="sm" 
                variant="default" 
                iconLeft={<Plus size={16} />}
              >
                New Order
              </CustomButton>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Order</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer</FormLabel>
                          <FormControl>
                            <Input placeholder="Customer name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="items"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Items</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Number of items" 
                              min="1" 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Delivery address" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <select 
                              className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                              {...field}
                            >
                              <option value="Processing">Processing</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Delayed">Delayed</option>
                            </select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Scheduled Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full mt-4">
                      Create Order
                    </Button>
                  </form>
                </Form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Orders" 
          value={stats.total.toString()} 
          icon={PackageOpen}
          trend={{ value: 8, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '0ms' }}
        />
        <StatCard 
          title="In Transit" 
          value={stats.inTransit.toString()} 
          icon={Truck}
          trend={{ value: 12, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '100ms' }}
        />
        <StatCard 
          title="Delayed" 
          value={stats.delayed.toString()} 
          icon={Clock}
          trend={{ value: 6, isPositive: false }}
          className="animate-slide-up"
          style={{ animationDelay: '200ms' }}
        />
        <StatCard 
          title="Delivered Today" 
          value={stats.delivered.toString()} 
          icon={CircleCheck}
          trend={{ value: 15, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '300ms' }}
        />
      </div>
      
      <div className="glass-morphism rounded-xl p-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Order List</h3>
            <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
              {filterOrders(orders, selectedFilter).filter(
                order => order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.address.toLowerCase().includes(searchQuery.toLowerCase())
              ).length} results
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full sm:w-[250px] rounded-md bg-muted/30 border py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {searchQuery && (
                <button 
                  className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={clearSearch}
                >
                  <XCircle size={16} />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${selectedFilter === 'all' ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                onClick={() => setSelectedFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${selectedFilter === 'pending' ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                onClick={() => setSelectedFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${selectedFilter === 'transit' ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                onClick={() => setSelectedFilter('transit')}
              >
                In Transit
              </button>
              <button 
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${selectedFilter === 'delivered' ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                onClick={() => setSelectedFilter('delivered')}
              >
                Delivered
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-auto">
          {isSearching ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : displayedOrders.length > 0 ? (
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-medium text-sm">Order ID</th>
                  <th className="pb-3 font-medium text-sm">Customer</th>
                  <th className="pb-3 font-medium text-sm">Items</th>
                  <th className="pb-3 font-medium text-sm">Delivery Address</th>
                  <th className="pb-3 font-medium text-sm">Status</th>
                  <th className="pb-3 font-medium text-sm">Scheduled</th>
                  <th className="pb-3 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedOrders.map((order, index) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-accent/20 transition-colors">
                    <td className="py-3 text-sm font-medium">
                      {order.id}
                    </td>
                    <td className="py-3 text-sm">
                      {order.customer}
                    </td>
                    <td className="py-3 text-sm">
                      {order.items} items
                    </td>
                    <td className="py-3 text-sm">
                      {order.address}
                    </td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm">
                      {order.scheduledDate.toLocaleDateString()}
                    </td>
                    <td className="py-3 text-sm">
                      <div className="flex items-center gap-1">
                        <button 
                          className="p-1.5 rounded-md hover:bg-accent text-primary"
                          onClick={() => handleStatusChange(order, 'Delivered')}
                          title="Mark as Delivered"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button 
                          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground"
                          onClick={() => handleStatusChange(order, 'In Transit')}
                          title="Mark as In Transit"
                        >
                          <RefreshCw size={16} />
                        </button>
                        <button 
                          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground"
                          onClick={() => handleDeleteOrder(order)}
                          title="Delete Order"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-40">
              <PackageOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No orders found matching your search criteria</p>
              <Button 
                variant="link" 
                onClick={clearSearch}
                className="mt-2"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {displayedOrders.length > 0 ? (
              <>Showing {(currentPage - 1) * ordersPerPage + 1}-{Math.min(currentPage * ordersPerPage, filterOrders(orders, selectedFilter).filter(
                order => order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.address.toLowerCase().includes(searchQuery.toLowerCase())
              ).length)} of {filterOrders(orders, selectedFilter).filter(
                order => order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.address.toLowerCase().includes(searchQuery.toLowerCase())
              ).length} results</>
            ) : (
              <>No results found</>
            )}
          </div>
          {displayedOrders.length > 0 && (
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                &lt;
              </Button>
              {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button 
                    key={i}
                    variant="outline" 
                    size="sm" 
                    className={`h-8 w-8 p-0 ${currentPage === pageNumber ? 'bg-primary text-white' : ''}`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                &gt;
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
