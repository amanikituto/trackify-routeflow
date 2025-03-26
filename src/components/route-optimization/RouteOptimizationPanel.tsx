
import React, { useState } from 'react';
import { Plus, Route as RouteIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { routes, RouteInfo } from '@/data/routeData';
import RouteOptimizationWizard from './RouteOptimizationWizard';

const RouteOptimizationPanel = () => {
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | null>(null);
  
  const handleRouteUpdate = (updatedRoute: RouteInfo) => {
    // In a real application, this would update the global state or make an API call
    console.log('Route updated:', updatedRoute);
    setSelectedRoute(null);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Route Management</h2>
          <p className="text-sm text-muted-foreground">
            Create and optimize delivery routes
          </p>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="default" size="sm" className="gap-2">
              <Plus size={16} />
              New Route
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh] max-h-[90vh]">
            <div className="mx-auto w-full max-w-4xl">
              <DrawerHeader>
                <DrawerTitle>Create New Route</DrawerTitle>
                <DrawerDescription>
                  Use the wizard to create and optimize a new delivery route
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <RouteOptimizationWizard 
                  onComplete={handleRouteUpdate}
                />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      
      <div className="space-y-4">
        <div className="text-sm font-medium text-muted-foreground">
          Existing Routes
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className="glass-morphism p-4 rounded-lg space-y-3 hover:bg-accent/10 transition-colors cursor-pointer"
              onClick={() => setSelectedRoute(route)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <RouteIcon size={18} className="text-primary" />
                  <span className="font-medium">{route.name}</span>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full ${
                  route.optimized 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {route.optimized ? 'Optimized' : 'Standard'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Distance:</div>
                <div className="font-medium">{route.totalDistance}</div>
                <div>Time:</div>
                <div className="font-medium">{route.estimatedTime}</div>
                <div>Stops:</div>
                <div className="font-medium">{route.deliveryStops}</div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRoute(route);
                }}
              >
                View & Edit
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Edit Route Drawer */}
      <Drawer open={!!selectedRoute} onOpenChange={(open) => !open && setSelectedRoute(null)}>
        <DrawerContent className="h-[90vh] max-h-[90vh]">
          <div className="mx-auto w-full max-w-4xl">
            <DrawerHeader>
              <DrawerTitle>Edit Route {selectedRoute?.name}</DrawerTitle>
              <DrawerDescription>
                Modify and re-optimize the selected route
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
              {selectedRoute && (
                <RouteOptimizationWizard
                  existingRoute={selectedRoute}
                  onComplete={handleRouteUpdate}
                />
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RouteOptimizationPanel;
