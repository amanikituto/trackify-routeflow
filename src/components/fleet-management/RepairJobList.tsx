
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, Wrench, UserCircle2 } from 'lucide-react';
import { RepairJob, Vehicle, Mechanic } from '@/data/fleetData';
import { useToast } from '@/hooks/use-toast';

interface RepairJobListProps {
  repairJobs: RepairJob[];
  vehicles: Vehicle[];
  mechanics: Mechanic[];
  onEdit: (job: RepairJob) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  onAssignMechanic: (job: RepairJob) => void;
}

const RepairJobList = ({ 
  repairJobs, 
  vehicles, 
  mechanics, 
  onEdit, 
  onDelete, 
  onAddNew,
  onAssignMechanic
}: RepairJobListProps) => {
  const { toast } = useToast();
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this repair job?')) {
      onDelete(id);
      toast({
        title: "Repair job deleted",
        description: "The repair job has been deleted successfully.",
      });
    }
  };

  const getStatusBadge = (status: RepairJob['status']) => {
    switch (status) {
      case 'Pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'Completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="outline" className="text-gray-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: RepairJob['priority']) => {
    switch (priority) {
      case 'Low':
        return <Badge variant="outline">Low</Badge>;
      case 'Medium':
        return <Badge className="bg-blue-500">Medium</Badge>;
      case 'High':
        return <Badge className="bg-amber-500">High</Badge>;
      case 'Critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getVehicleName = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.name : 'Unknown Vehicle';
  };

  const getMechanicName = (mechanicId: string | null) => {
    if (!mechanicId) return 'Unassigned';
    const mechanic = mechanics.find(m => m.id === mechanicId);
    return mechanic ? mechanic.name : 'Unknown Mechanic';
  };

  const toggleExpand = (id: string) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Repair Jobs</h2>
        <Button onClick={onAddNew} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Repair Job
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Mechanic</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repairJobs.map((job) => (
              <React.Fragment key={job.id}>
                <TableRow className="cursor-pointer" onClick={() => toggleExpand(job.id)}>
                  <TableCell className="font-medium">{getVehicleName(job.vehicleId)}</TableCell>
                  <TableCell>{job.description}</TableCell>
                  <TableCell>{getPriorityBadge(job.priority)}</TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell>{getMechanicName(job.assignedMechanicId)}</TableCell>
                  <TableCell>{job.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => onEdit(job)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDelete(job.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedJobId === job.id && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="p-4 bg-accent/30 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Repair Job Details</h3>
                          {!job.assignedMechanicId && job.status !== 'Completed' && job.status !== 'Cancelled' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => onAssignMechanic(job)}
                            >
                              <UserCircle2 className="mr-2 h-4 w-4" />
                              Assign Mechanic
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Job ID</p>
                            <p>{job.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Vehicle</p>
                            <p>{getVehicleName(job.vehicleId)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Description</p>
                            <p>{job.description}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Priority</p>
                            <p>{job.priority}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p>{job.status}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Assigned Mechanic</p>
                            <p>{getMechanicName(job.assignedMechanicId)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Created</p>
                            <p>{job.createdAt}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Estimated Completion</p>
                            <p>{job.estimatedCompletionDate || 'Not set'}</p>
                          </div>
                          {job.actualCompletionDate && (
                            <div>
                              <p className="text-sm text-muted-foreground">Actual Completion</p>
                              <p>{job.actualCompletionDate}</p>
                            </div>
                          )}
                          {job.cost !== null && (
                            <div>
                              <p className="text-sm text-muted-foreground">Cost</p>
                              <p>${job.cost.toFixed(2)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
            {repairJobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  <Wrench className="mx-auto h-10 w-10 mb-2 opacity-20" />
                  <p>No repair jobs found</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onAddNew} 
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Repair Job
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

export default RepairJobList;
