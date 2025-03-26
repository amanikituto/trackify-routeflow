
import React from 'react';
import {
  Truck,
  PackageOpen,
  Clock,
  Users,
  BarChart3,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import StatCard from './ui-components/StatCard';
import Map from './ui-components/Map';
import CustomButton from './ui-components/Button'; // Renamed to avoid conflict
import Analytics from './Analytics';

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="h2">Dashboard</h1>
          <p className="text-muted-foreground">Track your fleet and deliveries in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton size="sm" variant="outline">
            Export Report
          </CustomButton>
          <CustomButton size="sm" variant="default">
            Fleet Overview
          </CustomButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Vehicles" 
          value="24" 
          icon={Truck}
          trend={{ value: 12, isPositive: true }}
          className="animate-slide-up"
        />
        <StatCard 
          title="Deliveries Today" 
          value="156" 
          icon={PackageOpen}
          trend={{ value: 8, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '100ms' }}
        />
        <StatCard 
          title="Avg. Delivery Time" 
          value="45 min" 
          icon={Clock}
          trend={{ value: 3, isPositive: false }}
          className="animate-slide-up"
          style={{ animationDelay: '200ms' }}
        />
        <StatCard 
          title="Active Customers" 
          value="1,892" 
          icon={Users}
          trend={{ value: 5, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '300ms' }}
        />
      </div>
      
      <Analytics />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-morphism rounded-xl p-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Live Fleet Tracking</h3>
            <div className="flex items-center gap-2">
              <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">All Systems Operational</div>
            </div>
          </div>
          <Map className="h-[350px]" />
        </div>
        
        <div className="glass-morphism rounded-xl p-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Delivery Success Rate</span>
                <span className="text-sm font-medium">98.3%</span>
              </div>
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '98.3%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                <span className="text-sm font-medium">92.7%</span>
              </div>
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '92.7%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Fuel Efficiency</span>
                <span className="text-sm font-medium">87.4%</span>
              </div>
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '87.4%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Route Optimization</span>
                <span className="text-sm font-medium">76.1%</span>
              </div>
              <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '76.1%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-sm font-medium mb-3">Recent Alerts</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm">Vehicle #TR-3421 maintenance required</p>
                  <p className="text-xs text-muted-foreground">20 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm">Warehouse #3 inventory low alert</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-morphism rounded-xl p-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Recent Deliveries</h3>
          <CustomButton size="sm" variant="outline">View All</CustomButton>
        </div>
        <div className="overflow-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 font-medium text-sm">Order ID</th>
                <th className="pb-3 font-medium text-sm">Customer</th>
                <th className="pb-3 font-medium text-sm">Status</th>
                <th className="pb-3 font-medium text-sm">Driver</th>
                <th className="pb-3 font-medium text-sm">Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-3 text-sm">#ORD-{Math.floor(10000 + Math.random() * 90000)}</td>
                  <td className="py-3 text-sm">Customer {index + 1}</td>
                  <td className="py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      index % 3 === 0 ? 'bg-green-100 text-green-800' : 
                      index % 3 === 1 ? 'bg-blue-100 text-blue-800' : 
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {index % 3 === 0 ? 'Delivered' : index % 3 === 1 ? 'In Transit' : 'Preparing'}
                    </span>
                  </td>
                  <td className="py-3 text-sm">Driver {index + 1}</td>
                  <td className="py-3 text-sm">{index % 3 === 0 ? '10:24 AM' : index % 3 === 1 ? 'ETA 11:30 AM' : 'Scheduled 12:00 PM'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
