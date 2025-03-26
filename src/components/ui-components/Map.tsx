
import React, { useEffect, useRef, useState } from 'react';
import { RouteInfo } from '@/data/routeData';

interface MapProps {
  className?: string;
  routeData?: RouteInfo;
  onMapClick?: (lat: number, lng: number) => void;
}

const Map = ({ className, routeData, onMapClick }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onMapClick) return;
    
    // Simulate getting coordinates from click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert pixel position to simulated lat/lng (just for demo)
    const lat = 40.7128 + (y / rect.height - 0.5) * 0.1;
    const lng = -74.0060 + (x / rect.width - 0.5) * 0.1;
    
    onMapClick(lat, lng);
  };

  return (
    <div className={`relative w-full h-full rounded-xl overflow-hidden min-h-[300px] ${className}`}>
      {isLoading ? (
        <div className="absolute inset-0 bg-accent flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          <div 
            ref={mapRef} 
            className="absolute inset-0 bg-[#F8F9FA]"
            onClick={handleMapClick}
          >
            {/* Map background with grid pattern */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e0e0e0' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}></div>
            
            {/* Render route markers based on routeData */}
            {routeData?.coordinates?.map((coord, index) => (
              <div 
                key={index}
                className={`absolute w-4 h-4 rounded-full ${
                  coord.type === 'depot' ? 'bg-primary' : 'bg-green-500'
                } animate-pulse-slow`}
                style={{
                  top: `${((coord.lat - 40.7) / 0.1) * 100 + 50}%`,
                  left: `${((coord.lng + 74) / 0.1) * 100 + 50}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                title={coord.type === 'depot' ? 'Depot' : `Stop ${index}`}
              >
                {coord.type === 'depot' && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                    Depot
                  </div>
                )}
              </div>
            ))}
            
            {/* Route path connecting points */}
            {routeData?.coordinates && (
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d={routeData.coordinates.map((coord, i) => {
                    const x = ((coord.lng + 74) / 0.1) * 100 + 50;
                    const y = ((coord.lat - 40.7) / 0.1) * 100 + 50;
                    return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                  }).join(' ')}
                  fill="none" 
                  stroke="rgba(59, 130, 246, 0.5)" 
                  strokeWidth="4" 
                  strokeDasharray="8 4"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
          
          <div className="absolute bottom-4 right-4 glass-morphism p-3 rounded-lg">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs">Active ({routeData?.optimized ? 'Optimized' : 'Standard'})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs">Completed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Map;
