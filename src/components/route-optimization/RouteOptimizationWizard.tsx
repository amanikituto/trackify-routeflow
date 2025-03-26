
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Route, 
  MapPin, 
  Compass, 
  Navigation,
  ArrowRight, 
  ArrowLeft, 
  Save 
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RouteInfo, RouteStop, routes } from '@/data/routeData';
import StopEntry from './StopEntry';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Form schema validation
const routeFormSchema = z.object({
  name: z.string().min(1, { message: "Route name is required" }),
  timeWindow: z.string().min(1, { message: "Time window is required" }),
});

type RouteFormValues = z.infer<typeof routeFormSchema>;

interface RouteOptimizationWizardProps {
  existingRoute?: RouteInfo;
  onComplete?: (route: RouteInfo) => void;
}

const RouteOptimizationWizard = ({ 
  existingRoute, 
  onComplete 
}: RouteOptimizationWizardProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [stops, setStops] = useState<RouteStop[]>(
    existingRoute?.stops || []
  );
  const [optimizationLevel, setOptimizationLevel] = useState(7);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState<RouteInfo | null>(null);
  const isEditMode = !!existingRoute;

  // Form setup
  const form = useForm<RouteFormValues>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: {
      name: existingRoute?.name || "",
      timeWindow: existingRoute?.timeWindow || "",
    },
  });

  const addStop = (stop: RouteStop) => {
    setStops([...stops, stop]);
  };

  const removeStop = (id: number) => {
    setStops(stops.filter(stop => stop.id !== id));
  };

  const updateStop = (updatedStop: RouteStop) => {
    setStops(stops.map(stop => 
      stop.id === updatedStop.id ? updatedStop : stop
    ));
  };

  const moveToNextStep = () => {
    if (step === 1 && !form.formState.isValid) {
      form.trigger();
      return;
    }
    
    if (step === 2 && stops.length === 0) {
      toast({
        title: "No stops added",
        description: "Please add at least one stop to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setStep(prev => prev + 1);
  };

  const moveToPreviousStep = () => {
    setStep(prev => prev - 1);
  };

  const simulateOptimization = () => {
    setIsOptimizing(true);
    
    // Simulate an optimization process
    setTimeout(() => {
      // Create a placeholder optimized route
      const routeData = form.getValues();
      const totalDistance = `${Math.floor(20 + Math.random() * 30)}.${Math.floor(Math.random() * 10)} miles`;
      const estimatedTime = `${1 + Math.floor(Math.random() * 3)}h ${Math.floor(Math.random() * 60)}min`;
      
      const newRoute: RouteInfo = {
        id: existingRoute?.id || routes.length + 1,
        name: routeData.name,
        totalDistance,
        estimatedTime,
        deliveryStops: stops.length,
        timeWindow: routeData.timeWindow,
        optimized: true,
        stops,
        coordinates: [
          { lat: 40.7128, lng: -74.0060, type: 'depot' },
          ...stops.map((_, i) => ({
            lat: 40.7128 + (Math.random() * 0.1 - 0.05),
            lng: -74.0060 + (Math.random() * 0.1 - 0.05),
            type: 'customer' as const
          }))
        ]
      };
      
      setOptimizedRoute(newRoute);
      setIsOptimizing(false);
    }, 2000 + Math.random() * 1000);
  };

  const handleFinish = () => {
    if (!optimizedRoute) return;
    
    // Handle the finishing of the wizard
    if (isEditMode) {
      // Update existing route in the global state
      // In a real app, this would be an API call
      toast({
        title: "Route Updated",
        description: `Route ${optimizedRoute.name} has been successfully updated.`
      });
    } else {
      // Add the new route to global state
      // In a real app, this would be an API call
      toast({
        title: "Route Created",
        description: `Route ${optimizedRoute.name} has been successfully created.`
      });
    }
    
    if (onComplete) {
      onComplete(optimizedRoute);
    } else {
      navigate('/route-optimization');
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="glass-morphism rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {isEditMode ? "Edit Route" : "Create New Route"}
          </h2>
          <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-1 text-sm">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>1</div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>2</div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>3</div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step >= 4 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>4</div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Step 1: Basic Route Information */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Route size={20} />
                Route Information
              </h3>
              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Route Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter route name (e.g., Downtown Loop)" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeWindow"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Window</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter time window (e.g., 9AM - 5PM)" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Start by providing basic information about your route. 
                  The route name should be unique and descriptive.
                  The time window defines when deliveries can be made.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Add Stops */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MapPin size={20} />
                Delivery Stops
              </h3>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {stops.length} stops added
                </span>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" size="sm">Add Stop</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>Add Delivery Stop</DrawerTitle>
                        <DrawerDescription>
                          Add a new delivery stop to your route.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 pb-0">
                        <StopEntry
                          onAdd={addStop}
                          existingStops={stops}
                        />
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
                {stops.length > 0 ? (
                  stops.map((stop, index) => (
                    <div 
                      key={stop.id} 
                      className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary-foreground">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{stop.customerName}</div>
                            <div className="text-sm text-muted-foreground">{stop.address}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Drawer>
                            <DrawerTrigger asChild>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                              <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader>
                                  <DrawerTitle>Edit Delivery Stop</DrawerTitle>
                                </DrawerHeader>
                                <div className="p-4 pb-0">
                                  <StopEntry
                                    existingStop={stop}
                                    onUpdate={updateStop}
                                    existingStops={stops}
                                  />
                                </div>
                                <DrawerFooter>
                                  <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DrawerClose>
                                </DrawerFooter>
                              </div>
                            </DrawerContent>
                          </Drawer>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeStop(stop.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <div className={`text-xs px-2 py-0.5 rounded-full ${
                          stop.priority === 'Priority' 
                            ? 'bg-red-100 text-red-800' 
                            : stop.priority === 'Express' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {stop.priority}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ETA: {stop.eta}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <MapPin size={40} className="text-muted-foreground mb-2 opacity-30" />
                    <p className="text-muted-foreground">No stops added yet</p>
                    <p className="text-sm text-muted-foreground">
                      Click "Add Stop" to start building your route
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Add all delivery stops that need to be included in this route.
                  You can specify priority levels and time estimates for each stop.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Optimization Settings */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Compass size={20} />
                Optimization Settings
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Optimization Level</label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Basic</span>
                    <Slider
                      value={[optimizationLevel]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(val) => setOptimizationLevel(val[0])}
                      className="flex-1"
                    />
                    <span className="text-sm">Advanced</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Higher levels provide more optimal routes but may take longer to calculate
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Optimization Factors</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="distance" className="mr-2" defaultChecked />
                        <label htmlFor="distance" className="text-sm">Distance</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="traffic" className="mr-2" defaultChecked />
                        <label htmlFor="traffic" className="text-sm">Traffic Conditions</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="timeWindows" className="mr-2" defaultChecked />
                        <label htmlFor="timeWindows" className="text-sm">Delivery Time Windows</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="priorities" className="mr-2" defaultChecked />
                        <label htmlFor="priorities" className="text-sm">Stop Priorities</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Additional Options</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="returnToDepot" className="mr-2" defaultChecked />
                        <label htmlFor="returnToDepot" className="text-sm">Return to Depot</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="avoidTolls" className="mr-2" />
                        <label htmlFor="avoidTolls" className="text-sm">Avoid Toll Roads</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="avoidHighways" className="mr-2" />
                        <label htmlFor="avoidHighways" className="text-sm">Avoid Highways</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="minimizeLeftTurns" className="mr-2" defaultChecked />
                        <label htmlFor="minimizeLeftTurns" className="text-sm">Minimize Left Turns</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Configure how the route should be optimized. These settings will affect the
                  efficiency and characteristics of the generated route.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Review and Confirm */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Navigation size={20} />
                Review and Optimize
              </h3>
              
              {!isOptimizing && !optimizedRoute ? (
                <>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-card space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Route Name:</span>
                          <p className="font-medium">{form.getValues().name}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Time Window:</span>
                          <p className="font-medium">{form.getValues().timeWindow}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Number of Stops:</span>
                          <p className="font-medium">{stops.length}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Optimization Level:</span>
                          <p className="font-medium">{optimizationLevel}/10</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center py-4">
                      <Button 
                        variant="default" 
                        size="lg" 
                        className="gap-2"
                        onClick={simulateOptimization}
                      >
                        <Compass className="animate-pulse" />
                        Optimize Route
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Click to calculate the most efficient route based on your settings
                      </p>
                    </div>
                  </div>
                </>
              ) : isOptimizing ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 font-medium">Optimizing Route...</p>
                  <p className="text-sm text-muted-foreground">
                    Calculating the most efficient delivery sequence
                  </p>
                </div>
              ) : optimizedRoute && (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-card space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{optimizedRoute.name}</h4>
                      <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Optimized
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Total Distance:</span>
                        <p className="font-medium">{optimizedRoute.totalDistance}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Estimated Time:</span>
                        <p className="font-medium">{optimizedRoute.estimatedTime}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Delivery Stops:</span>
                        <p className="font-medium">{optimizedRoute.deliveryStops}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Time Window:</span>
                        <p className="font-medium">{optimizedRoute.timeWindow}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <h5 className="text-sm font-medium mb-2">Optimized Stop Sequence:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {optimizedRoute.stops.map((stop, index) => (
                          <div key={stop.id} className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-accent/30">
                            <div className="bg-primary w-5 h-5 rounded-full flex items-center justify-center text-xs text-primary-foreground">
                              {index + 1}
                            </div>
                            <div className="overflow-hidden">
                              <div className="truncate font-medium">{stop.customerName}</div>
                              <div className="truncate text-xs text-muted-foreground">{stop.address}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-2">
                    <Button 
                      variant="default" 
                      size="lg" 
                      className="gap-2"
                      onClick={handleFinish}
                    >
                      <Save size={16} />
                      {isEditMode ? "Save Updated Route" : "Create Route"}
                    </Button>
                  </div>
                </div>
              )}
              
              {!optimizedRoute && (
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Review the route details and click "Optimize Route" to generate the most efficient delivery sequence.
                    Once optimized, you can save the route to your fleet management system.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-6 border-t mt-6">
            {step > 1 ? (
              <Button 
                variant="outline" 
                onClick={moveToPreviousStep}
                className="gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {step < 4 ? (
              <Button 
                variant="default" 
                onClick={moveToNextStep}
                className="gap-2"
              >
                Next
                <ArrowRight size={16} />
              </Button>
            ) : (
              optimizedRoute ? (
                <div></div>
              ) : (
                <div></div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizationWizard;
