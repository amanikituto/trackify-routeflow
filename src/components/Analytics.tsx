
import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, BarChart3, Users, TrendingUp, Clock } from 'lucide-react';
import { 
  generateDailyStats, 
  deliveryPerformanceData, 
  driverPerformanceData, 
  vehicleUtilizationData, 
  generateRegionalData 
} from '@/data/analyticsData';

const Analytics = () => {
  const dailyStats = React.useMemo(() => generateDailyStats(), []);
  const regionalData = React.useMemo(() => generateRegionalData(), []);
  
  const chartConfig = {
    deliveries: { label: 'Deliveries', theme: { light: '#9b87f5', dark: '#8B5CF6' } },
    onTime: { label: 'On Time', theme: { light: '#22c55e', dark: '#22c55e' } },
    delayed: { label: 'Delayed', theme: { light: '#f97316', dark: '#f97316' } },
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Delivery performance insights and metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyStats.reduce((sum, day) => sum + day.deliveries, 0)}</div>
            <div className="text-xs text-muted-foreground">in the last 30 days</div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyStats.slice(-7)} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Bar dataKey="deliveries" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (dailyStats.reduce((sum, day) => sum + day.onTime, 0) / 
                 dailyStats.reduce((sum, day) => sum + day.deliveries, 0)) * 100
              )}%
            </div>
            <div className="text-xs text-muted-foreground">in the last 30 days</div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyStats.slice(-7)} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Line 
                    type="monotone" 
                    dataKey={(item) => (item.onTime / item.deliveries) * 100} 
                    stroke="#22c55e" 
                    strokeWidth={2} 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Driver Performance</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(driverPerformanceData.reduce((sum, driver) => sum + driver.rating, 0) / 
                driverPerformanceData.length).toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">avg. driver rating</div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={driverPerformanceData.slice(0, 3)} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Bar dataKey="onTimePercentage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="daily" className="w-full">
        <TabsList>
          <TabsTrigger value="daily">Daily Trends</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Delivery Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ChartContainer id="daily-stats" config={chartConfig}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    axisLine={{ stroke: '#e5e7eb' }}
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ marginTop: '10px' }} />
                  <Bar 
                    type="monotone" 
                    dataKey="deliveries" 
                    name="deliveries" 
                    fill="var(--color-deliveries)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    type="monotone" 
                    dataKey="onTime" 
                    name="onTime" 
                    fill="var(--color-onTime)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    type="monotone" 
                    dataKey="delayed" 
                    name="delayed" 
                    fill="var(--color-delayed)"
                    radius={[4, 4, 0, 0]}
                  />
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deliveryPerformanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {deliveryPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>Deliveries</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>On-Time %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {driverPerformanceData.map((driver) => (
                      <TableRow key={driver.name}>
                        <TableCell className="font-medium">{driver.name}</TableCell>
                        <TableCell>{driver.deliveries}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className={driver.rating > 4.7 ? "text-green-500" : "text-amber-500"}>
                              {driver.rating}
                            </span>
                            {driver.rating > 4.7 && <ArrowUpRight className="ml-1 h-4 w-4 text-green-500" />}
                          </div>
                        </TableCell>
                        <TableCell>{driver.onTimePercentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="regional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deliveries by Region</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      type="category" 
                      allowDuplicatedCategory={false} 
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      axisLine={{ stroke: '#e5e7eb' }}
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                    />
                    <Tooltip />
                    <Legend wrapperStyle={{ marginTop: '10px' }} />
                    {regionalData.map((region, index) => (
                      <Line
                        key={region.name}
                        data={region.data}
                        name={region.name}
                        type="monotone"
                        dataKey="value"
                        stroke={
                          index === 0 ? "#9b87f5" : 
                          index === 1 ? "#f97316" : 
                          index === 2 ? "#22c55e" : 
                          index === 3 ? "#3b82f6" : 
                          "#d946ef"
                        }
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
