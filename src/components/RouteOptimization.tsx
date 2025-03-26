
import React, { useState } from 'react';
import {
  Map as MapIcon,
  Route,
  Clock,
  Fuel,
  TrendingDown,
  BarChart,
  RefreshCw,
  Settings,
  Plus,
  Check,
  X,
  ChevronDown
} from 'lucide-react';
import Map from './ui-components/Map';
import CustomButton from './ui-components/Button';
import StatCard from './ui-components/StatCard';

const RouteOptimization = () => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(1);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="h2">Route Optimization</h1>
          <p className="text-muted-foreground">Plan and optimize delivery routes with AI assistance</p>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton 
            size="sm" 
            variant="outline" 
            iconLeft={<Settings size={16} />}
          >
            Settings
          </CustomButton>
          <CustomButton 
            size="sm" 
            variant="default" 
            iconLeft={<Plus size={16} />}
          >
            New Route
          </CustomButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Optimized Routes" 
          value="37" 
          icon={Route}
          trend={{ value: 12, isPositive: true }}
          className="animate-slide-up"
        />
        <StatCard 
          title="Avg. Time Saved" 
          value="27 min" 
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '100ms' }}
        />
        <StatCard 
          title="Fuel Savings" 
          value="12.8%" 
          icon={Fuel}
          trend={{ value: 2.3, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '200ms' }}
        />
        <StatCard 
          title="CO₂ Reduction" 
          value="8.5 tons" 
          icon={TrendingDown}
          trend={{ value: 3.2, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '300ms' }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-morphism rounded-xl p-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Route Visualization</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button className="text-sm flex items-center gap-2 px-3 py-1.5 rounded-md border hover:bg-accent">
                  <span>Route #{selectedRoute}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              <CustomButton 
                size="sm" 
                variant="outline" 
                iconLeft={<RefreshCw size={14} />}
              >
                Recalculate
              </CustomButton>
            </div>
          </div>
          <Map className="h-[400px]" />
        </div>
        
        <div className="glass-morphism rounded-xl p-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-medium mb-4">Route Details</h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-2 p-3 rounded-lg bg-accent/50">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Route Summary</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">Optimized</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Total Distance:</div>
                <div className="font-medium">47.3 miles</div>
                <div>Estimated Time:</div>
                <div className="font-medium">2h 15min</div>
                <div>Delivery Stops:</div>
                <div className="font-medium">14</div>
                <div>Time Window:</div>
                <div className="font-medium">8AM - 3PM</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Delivery Sequence</h4>
              <div className="space-y-4 max-h-[260px] overflow-y-auto pr-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background border"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        Customer {Math.floor(1000 + Math.random() * 9000)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {index % 2 === 0 ? '123 Main St, City' : '456 Oak Ave, Town'}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                          {index % 3 === 0 ? 'Priority' : index % 3 === 1 ? 'Regular' : 'Express'}
                        </div>
                        <div className="text-xs">ETA: {9 + index}:{index < 30 ? '00' : '30'} AM</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded-full hover:bg-accent text-green-500">
                        <Check size={16} />
                      </button>
                      <button className="p-1 rounded-full hover:bg-accent text-red-500">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t flex justify-between">
            <CustomButton size="sm" variant="outline">
              Export Route
            </CustomButton>
            <CustomButton size="sm" variant="default">
              Send to Drivers
            </CustomButton>
          </div>
        </div>
      </div>
      
      <div className="glass-morphism rounded-xl p-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Optimization Analytics</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Last 30 days</span>
            <button className="p-1 rounded hover:bg-accent">
              <BarChart size={16} />
            </button>
          </div>
        </div>
        
        <div className="h-64 flex items-center justify-center">
          <div className="w-full max-w-xl h-full flex items-end justify-around gap-2 px-4">
            {Array.from({ length: 14 }).map((_, index) => {
              const height = 30 + Math.random() * 70;
              return (
                <div key={index} className="relative flex flex-col items-center group">
                  <div 
                    className="w-12 bg-primary/20 hover:bg-primary/30 rounded-t transition-all"
                    style={{ height: `${height}%` }}
                  >
                    <div
                      className="absolute bottom-0 left-0 w-full bg-primary rounded-t transition-all"
                      style={{ height: `${height * 0.65}%` }}
                    ></div>
                  </div>
                  <span className="text-xs mt-2">{index + 1}</span>
                  <div className="absolute bottom-full mb-2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {Math.floor(5 + Math.random() * 20)}% optimized
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary"></div>
              <span className="text-xs">Optimized Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary/20"></div>
              <span className="text-xs">Standard Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500"></div>
              <span className="text-xs">Savings: $3,542</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimization;
