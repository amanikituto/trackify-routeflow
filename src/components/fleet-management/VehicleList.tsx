
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, Edit, Trash2, Plus, Wrench } from 'lucide-react';
import { Vehicle } from '@/data/fleetData';
import { useToast } from '@/hooks/use-toast';

interface VehicleListProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  onCreateRepair: (vehicle: Vehicle) => void;
}

const VehicleList = ({ vehicles, onEdit, onDelete, onAddNew, onCreateRepair }: VehicleListProps) => {
  const { toast } = useToast();
  const [expandedVehicleId, setExpandedVehicleId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this vehicle?')) {
      onDelete(id);
      toast({
        title: "Vehicle removed",
        description: "The vehicle has been removed from your fleet.",
      });
    }
  };

  const getStatusBadge = (status: Vehicle['status']) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'Maintenance':
        return <Badge className="bg-amber-500">Maintenance</Badge>;
      case 'Out of Service':
        return <Badge className="bg-red-500">Out of Service</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedVehicleId(expandedVehicleId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Fleet Vehicles</h2>
        <Button onClick={onAddNew} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Mileage</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <React.Fragment key={vehicle.id}>
                <TableRow className="cursor-pointer" onClick={() => toggleExpand(vehicle.id)}>
                  <TableCell className="font-medium">{vehicle.name}</TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.licensePlate}</TableCell>
                  <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                  <TableCell>{vehicle.lastMaintenance}</TableCell>
                  <TableCell>{vehicle.mileage.toLocaleString()} km</TableCell>
                  <TableCell>
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => onEdit(vehicle)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDelete(vehicle.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedVehicleId === vehicle.id && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="p-4 bg-accent/30 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Vehicle Details</h3>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onCreateRepair(vehicle)}
                          >
                            <Wrench className="mr-2 h-4 w-4" />
                            Create Repair Job
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Vehicle ID</p>
                            <p>{vehicle.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p>{vehicle.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Type</p>
                            <p>{vehicle.type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">License Plate</p>
                            <p>{vehicle.licensePlate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p>{vehicle.status}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Maintenance</p>
                            <p>{vehicle.lastMaintenance}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Mileage</p>
                            <p>{vehicle.mileage.toLocaleString()} km</p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
            {vehicles.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  <Truck className="mx-auto h-10 w-10 mb-2 opacity-20" />
                  <p>No vehicles found</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onAddNew} 
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Vehicle
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VehicleList;
