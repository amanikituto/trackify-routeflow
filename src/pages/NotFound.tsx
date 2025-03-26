
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center animate-fade-in">
      <div className="glass-morphism p-12 rounded-xl text-center max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
            <MapPin className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Route Not Found</h2>
          
          <p className="text-muted-foreground mb-8">
            We couldn't find the page you're looking for. The route <span className="font-mono text-primary/70">{location.pathname}</span> doesn't exist on our map.
          </p>
          
          <Button 
            className="flex items-center gap-2" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
