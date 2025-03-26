
import React, { useState } from 'react';
import { RouteStop } from '@/data/routeData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StopEntryProps {
  existingStop?: RouteStop;
  existingStops: RouteStop[];
  onAdd?: (stop: RouteStop) => void;
  onUpdate?: (stop: RouteStop) => void;
}

const StopEntry: React.FC<StopEntryProps> = ({ 
  existingStop, 
  existingStops,
  onAdd, 
  onUpdate 
}) => {
  const [customerName, setCustomerName] = useState(existingStop?.customerName || '');
  const [address, setAddress] = useState(existingStop?.address || '');
  const [priority, setPriority] = useState<'Priority' | 'Regular' | 'Express'>(
    existingStop?.priority || 'Regular'
  );
  const [eta, setEta] = useState(existingStop?.eta || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !address || !eta) {
      return; // Basic validation
    }
    
    const stopData: RouteStop = {
      id: existingStop?.id || Math.max(0, ...existingStops.map(s => s.id)) + 1,
      customerName,
      address,
      priority,
      eta,
      completed: existingStop?.completed || false
    };
    
    if (existingStop && onUpdate) {
      onUpdate(stopData);
    } else if (onAdd) {
      onAdd(stopData);
    }
    
    // Reset form if adding
    if (!existingStop) {
      setCustomerName('');
      setAddress('');
      setPriority('Regular');
      setEta('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter customer name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter delivery address"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select
          value={priority}
          onValueChange={(value: 'Priority' | 'Regular' | 'Express') => setPriority(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Regular">Regular</SelectItem>
            <SelectItem value="Priority">Priority</SelectItem>
            <SelectItem value="Express">Express</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="eta">Estimated Arrival Time</Label>
        <Input
          id="eta"
          value={eta}
          onChange={(e) => setEta(e.target.value)}
          placeholder="e.g., 10:30 AM"
          required
        />
      </div>
      
      <Button type="submit" className="w-full">
        {existingStop ? 'Update Stop' : 'Add Stop'}
      </Button>
    </form>
  );
};

export default StopEntry;
