
import React, { useState } from 'react';
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

const OrderManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isTableView, setIsTableView] = useState(true);
  
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
          <CustomButton 
            size="sm" 
            variant="default" 
            iconLeft={<Plus size={16} />}
          >
            New Order
          </CustomButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Orders" 
          value="1,287" 
          icon={PackageOpen}
          trend={{ value: 8, isPositive: true }}
          className="animate-slide-up"
        />
        <StatCard 
          title="In Transit" 
          value="156" 
          icon={Truck}
          trend={{ value: 12, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '100ms' }}
        />
        <StatCard 
          title="Delayed" 
          value="23" 
          icon={Clock}
          trend={{ value: 6, isPositive: false }}
          className="animate-slide-up"
          style={{ animationDelay: '200ms' }}
        />
        <StatCard 
          title="Delivered Today" 
          value="89" 
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
            <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">245 results</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search orders..."
                className="w-full sm:w-[250px] rounded-md bg-muted/30 border py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
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
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-accent/20 transition-colors">
                  <td className="py-3 text-sm font-medium">
                    #ORD-{Math.floor(10000 + Math.random() * 90000)}
                  </td>
                  <td className="py-3 text-sm">
                    Customer {index + 1}
                  </td>
                  <td className="py-3 text-sm">
                    {Math.floor(1 + Math.random() * 5)} items
                  </td>
                  <td className="py-3 text-sm">
                    {index % 2 === 0 ? '123 Main St, City' : '456 Oak Ave, Town'}
                  </td>
                  <td className="py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      index % 4 === 0 ? 'bg-green-100 text-green-800' : 
                      index % 4 === 1 ? 'bg-blue-100 text-blue-800' : 
                      index % 4 === 2 ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {index % 4 === 0 ? 'Delivered' : 
                       index % 4 === 1 ? 'In Transit' : 
                       index % 4 === 2 ? 'Processing' :
                       'Delayed'}
                    </span>
                  </td>
                  <td className="py-3 text-sm">
                    {new Date(Date.now() + (index * 86400000)).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-sm">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-md hover:bg-accent text-primary">
                        <CheckCircle size={16} />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground">
                        <RefreshCw size={16} />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground">
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing 1-10 of 245 results
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
              &lt;
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-white">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
