
import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  Search,
  Save
} from 'lucide-react';
import Map from './ui-components/Map';
import CustomButton from './ui-components/Button';
import StatCard from './ui-components/StatCard';
import { routes, RouteInfo, RouteStop } from '@/data/routeData';
import { toast } from "@/hooks/use-toast";

const RouteOptimization = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<number>(1);
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | null>(null);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [routeStops, setRouteStops] = useState<RouteStop[]>([]);
  
  // Stats data
  const [statData, setStatData] = useState({
    optimizedRoutes: 37,
    avgTimeSaved: "27 min",
    fuelSavings: "12.8%",
    co2Reduction: "8.5 tons"
  });

  // Load the selected route data
  useEffect(() => {
    const route = routes.find(r => r.id === selectedRouteId);
    if (route) {
      setSelectedRoute(route);
      setRouteStops(route.stops);
    }
  }, [selectedRouteId]);

  const handleRouteSelection = (routeId: number) => {
    setSelectedRouteId(routeId);
    setIsDropdownOpen(false);
  };

  const handleRecalculate = () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      
      if (selectedRoute) {
        // Create a slightly modified route to simulate optimization
        const optimizedRoute = { 
          ...selectedRoute,
          optimized: true,
          totalDistance: (parseFloat(selectedRoute.totalDistance) * 0.85).toFixed(1) + " miles",
          estimatedTime: Math.floor(parseInt(selectedRoute.estimatedTime) * 0.85) + "h " + 
                         Math.floor(parseInt(selectedRoute.estimatedTime.split('h ')[1]) * 0.85) + "min"
        };
        
        setSelectedRoute(optimizedRoute);
        
        // Update stats
        setStatData(prev => ({
          ...prev,
          optimizedRoutes: prev.optimizedRoutes + 1,
          fuelSavings: (parseFloat(prev.fuelSavings) + 0.3).toFixed(1) + "%"
        }));
        
        toast({
          title: "Route Optimized",
          description: "Route has been successfully optimized, saving approximately 15% of time and distance.",
        });
      }
    }, 2500);
  };

  const toggleStopCompletion = (stopId: number, completed: boolean) => {
    setRouteStops(stops => 
      stops.map(stop => 
        stop.id === stopId ? { ...stop, completed } : stop
      )
    );
    
    toast({
      title: completed ? "Stop Completed" : "Stop Marked Incomplete",
      description: `Stop #${stopId} has been ${completed ? 'marked as completed' : 'marked as incomplete'}.`,
    });
  };

  const handleSendToDrivers = () => {
    toast({
      title: "Routes Sent to Drivers",
      description: "All drivers have been notified about their updated routes.",
    });
  };

  const handleExportRoute = () => {
    toast({
      title: "Route Exported",
      description: "Route data has been exported successfully.",
    });
  };
  
  const handleNewRoute = () => {
    toast({
      title: "New Route Creation",
      description: "Opening route creation wizard...",
    });
  };

  const handleMapClick = (lat: number, lng: number) => {
    toast({
      title: "Location Selected",
      description: `Selected coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    });
  };
  
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
            onClick={handleNewRoute}
          >
            New Route
          </CustomButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Optimized Routes" 
          value={statData.optimizedRoutes.toString()} 
          icon={Route}
          trend={{ value: 12, isPositive: true }}
          className="animate-slide-up"
        />
        <StatCard 
          title="Avg. Time Saved" 
          value={statData.avgTimeSaved} 
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '100ms' }}
        />
        <StatCard 
          title="Fuel Savings" 
          value={statData.fuelSavings} 
          icon={Fuel}
          trend={{ value: 2.3, isPositive: true }}
          className="animate-slide-up"
          style={{ animationDelay: '200ms' }}
        />
        <StatCard 
          title="CO₂ Reduction" 
          value={statData.co2Reduction} 
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
                <button 
                  className="text-sm flex items-center gap-2 px-3 py-1.5 rounded-md border hover:bg-accent"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedRoute?.name || "Select Route"}</span>
                  <ChevronDown size={16} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-background rounded-md shadow-lg border z-10">
                    {routes.map(route => (
                      <button
                        key={route.id}
                        className="w-full text-left px-3 py-2 hover:bg-accent text-sm"
                        onClick={() => handleRouteSelection(route.id)}
                      >
                        {route.name} {route.optimized && '(Optimized)'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <CustomButton 
                size="sm" 
                variant="outline" 
                iconLeft={<RefreshCw size={14} className={isOptimizing ? "animate-spin" : ""} />}
                onClick={handleRecalculate}
                disabled={isOptimizing}
              >
                {isOptimizing ? "Optimizing..." : "Recalculate"}
              </CustomButton>
            </div>
          </div>
          
          <Map 
            className="h-[400px]" 
            routeData={selectedRoute || undefined}
            onMapClick={handleMapClick}
          />
        </div>
        
        <div className="glass-morphism rounded-xl p-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-medium mb-4">Route Details</h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-2 p-3 rounded-lg bg-accent/50">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Route Summary</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedRoute?.optimized 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedRoute?.optimized ? 'Optimized' : 'Standard'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Total Distance:</div>
                <div className="font-medium">{selectedRoute?.totalDistance || "N/A"}</div>
                <div>Estimated Time:</div>
                <div className="font-medium">{selectedRoute?.estimatedTime || "N/A"}</div>
                <div>Delivery Stops:</div>
                <div className="font-medium">{selectedRoute?.deliveryStops || "N/A"}</div>
                <div>Time Window:</div>
                <div className="font-medium">{selectedRoute?.timeWindow || "N/A"}</div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Delivery Sequence</h4>
                <div className="relative">
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md border text-xs">
                    <Search size={12} />
                    <span>Filter</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 max-h-[260px] overflow-y-auto pr-2">
                {routeStops.map((stop, index) => (
                  <div 
                    key={stop.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      stop.completed 
                      ? 'bg-accent/40 border-accent' 
                      : 'bg-background border'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                      stop.completed 
                      ? 'bg-blue-500' 
                      : 'bg-primary'
                    } text-white text-xs`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {stop.customerName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stop.address}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`text-xs px-1.5 py-0.5 rounded ${
                          stop.priority === 'Priority' 
                            ? 'bg-red-100 text-red-800' 
                            : stop.priority === 'Express' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {stop.priority}
                        </div>
                        <div className="text-xs">ETA: {stop.eta}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        className={`p-1 rounded-full hover:bg-accent ${stop.completed ? 'text-blue-500' : 'text-green-500'}`}
                        onClick={() => toggleStopCompletion(stop.id, !stop.completed)}
                        title={stop.completed ? "Mark as incomplete" : "Mark as completed"}
                      >
                        {stop.completed ? <X size={16} /> : <Check size={16} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t flex justify-between">
            <CustomButton 
              size="sm" 
              variant="outline"
              onClick={handleExportRoute}
            >
              Export Route
            </CustomButton>
            <CustomButton 
              size="sm" 
              variant="default"
              onClick={handleSendToDrivers}
            >
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
                    className="w-12 bg-primary/20 hover:bg-primary/30 rounded-t transition-all cursor-pointer"
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
          <div className="flex flex-wrap justify-between gap-2">
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
