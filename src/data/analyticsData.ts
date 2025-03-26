
// Analytics data types and mock data
import { subDays, format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export interface DailyStat {
  date: string;
  deliveries: number;
  onTime: number;
  delayed: number;
}

export interface DeliveryPerformance {
  name: string;
  value: number;
  color: string;
}

export interface DriverPerformance {
  name: string;
  deliveries: number;
  rating: number;
  onTimePercentage: number;
}

// Generate the last 30 days of delivery data
export const generateDailyStats = (): DailyStat[] => {
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);
  
  return Array.from({ length: 30 }).map((_, index) => {
    const date = subDays(today, 30 - index - 1);
    const formattedDate = format(date, 'MMM dd');
    const dayOfWeek = date.getDay();
    
    // Generate slightly higher values for weekdays, lower for weekends
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseDailyDeliveries = isWeekend ? 
      Math.floor(70 + Math.random() * 30) : 
      Math.floor(100 + Math.random() * 50);
    
    // Random fluctuation with an upward trend as we approach today
    const trendFactor = 1 + (index * 0.01);
    const deliveries = Math.floor(baseDailyDeliveries * trendFactor);
    
    // 80-95% of deliveries are on time
    const onTimePercentage = 0.8 + (Math.random() * 0.15);
    const onTime = Math.floor(deliveries * onTimePercentage);
    const delayed = deliveries - onTime;
    
    return {
      date: formattedDate,
      deliveries,
      onTime,
      delayed
    };
  });
};

// Performance breakdown data
export const deliveryPerformanceData: DeliveryPerformance[] = [
  { name: 'On Time', value: 82, color: '#22c55e' }, // Green
  { name: 'Delayed', value: 13, color: '#f97316' }, // Orange
  { name: 'Rescheduled', value: 5, color: '#3b82f6' } // Blue
];

// Top performing drivers
export const driverPerformanceData: DriverPerformance[] = [
  { name: 'Alex Johnson', deliveries: 342, rating: 4.9, onTimePercentage: 97 },
  { name: 'Maria Garcia', deliveries: 315, rating: 4.8, onTimePercentage: 95 },
  { name: 'James Wilson', deliveries: 287, rating: 4.7, onTimePercentage: 94 },
  { name: 'Sarah Lee', deliveries: 276, rating: 4.9, onTimePercentage: 96 },
  { name: 'Robert Chen', deliveries: 254, rating: 4.6, onTimePercentage: 92 }
];

// Vehicle utilization data (percentage of capacity utilized)
export const vehicleUtilizationData = [
  { name: 'Van Fleet', value: 87 },
  { name: 'Truck Fleet', value: 76 },
  { name: 'Motorcycle Fleet', value: 92 }
];

// Current month deliveries by region
export const generateRegionalData = () => {
  const now = new Date();
  const firstDay = startOfMonth(now);
  const lastDay = endOfMonth(now);
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  
  return regions.map(region => {
    // Generate a somewhat different pattern for each region
    const baseValue = 20 + Math.floor(Math.random() * 30);
    const variability = 0.2 + (Math.random() * 0.3); // 20-50% variability
    
    return {
      name: region,
      data: daysInMonth.map((day) => {
        const dayOfWeek = day.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const weekendFactor = isWeekend ? 0.7 : 1;
        
        // Slight upward trend through the month
        const dayOfMonth = day.getDate();
        const trendFactor = 1 + (dayOfMonth * 0.005);
        
        // Random variation
        const randomFactor = 1 - variability + (Math.random() * variability * 2);
        
        return {
          date: format(day, 'MMM dd'),
          value: Math.floor(baseValue * weekendFactor * trendFactor * randomFactor)
        };
      })
    };
  });
};
