
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, UserCircle2 } from 'lucide-react';
import { Mechanic } from '@/data/fleetData';
import { useToast } from '@/hooks/use-toast';

interface MechanicListProps {
  mechanics: Mechanic[];
  onEdit: (mechanic: Mechanic) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const MechanicList = ({ mechanics, onEdit, onDelete, onAddNew }: MechanicListProps) => {
  const { toast } = useToast();
  const [expandedMechanicId, setExpandedMechanicId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this mechanic?')) {
      onDelete(id);
      toast({
        title: "Mechanic removed",
        description: "The mechanic has been removed successfully.",
      });
    }
  };

  const getAvailabilityBadge = (availability: Mechanic['availability']) => {
    switch (availability) {
      case 'Available':
        return <Badge className="bg-green-500">Available</Badge>;
      case 'Busy':
        return <Badge className="bg-amber-500">Busy</Badge>;
      case 'Off Duty':
        return <Badge variant="outline" className="text-gray-500">Off Duty</Badge>;
      default:
        return <Badge>{availability}</Badge>;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedMechanicId(expandedMechanicId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mechanics</h2>
        <Button onClick={onAddNew} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Mechanic
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mechanics.map((mechanic) => (
              <React.Fragment key={mechanic.id}>
                <TableRow className="cursor-pointer" onClick={() => toggleExpand(mechanic.id)}>
                  <TableCell className="font-medium">{mechanic.name}</TableCell>
                  <TableCell>{mechanic.specialization}</TableCell>
                  <TableCell>{getAvailabilityBadge(mechanic.availability)}</TableCell>
                  <TableCell>{mechanic.contactNumber}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => onEdit(mechanic)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDelete(mechanic.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedMechanicId === mechanic.id && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="p-4 bg-accent/30 rounded-md">
                        <h3 className="font-medium mb-2">Mechanic Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Mechanic ID</p>
                            <p>{mechanic.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p>{mechanic.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Specialization</p>
                            <p>{mechanic.specialization}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Availability</p>
                            <p>{mechanic.availability}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Contact Number</p>
                            <p>{mechanic.contactNumber}</p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
            {mechanics.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  <UserCircle2 className="mx-auto h-10 w-10 mb-2 opacity-20" />
                  <p>No mechanics found</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onAddNew} 
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Mechanic
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

export default MechanicList;
