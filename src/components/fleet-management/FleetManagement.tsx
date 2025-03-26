
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Vehicle, 
  Mechanic, 
  RepairJob,
  getVehicles,
  getMechanics,
  getRepairJobs,
  addVehicle,
  updateVehicle,
  removeVehicle,
  addMechanic,
  updateMechanic,
  removeMechanic,
  addRepairJob,
  updateRepairJob,
  removeRepairJob,
  assignMechanicToJob
} from '@/data/fleetData';
import VehicleList from './VehicleList';
import VehicleForm from './VehicleForm';
import RepairJobList from './RepairJobList';
import RepairJobForm from './RepairJobForm';
import MechanicList from './MechanicList';
import MechanicForm from './MechanicForm';
import AssignMechanicDialog from './AssignMechanicDialog';

const FleetManagement = () => {
  const { toast } = useToast();
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [repairJobs, setRepairJobs] = useState<RepairJob[]>([]);
  
  const [vehicleFormOpen, setVehicleFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined);
  
  const [mechanicFormOpen, setMechanicFormOpen] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | undefined>(undefined);
  
  const [repairJobFormOpen, setRepairJobFormOpen] = useState(false);
  const [selectedRepairJob, setSelectedRepairJob] = useState<RepairJob | undefined>(undefined);
  const [preselectedVehicleId, setPreselectedVehicleId] = useState<string | undefined>(undefined);
  
  const [assignMechanicDialogOpen, setAssignMechanicDialogOpen] = useState(false);
  const [jobToAssign, setJobToAssign] = useState<RepairJob | null>(null);
  
  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [vehiclesData, mechanicsData, repairJobsData] = await Promise.all([
          getVehicles(),
          getMechanics(),
          getRepairJobs()
        ]);
        
        setVehicles(vehiclesData);
        setMechanics(mechanicsData);
        setRepairJobs(repairJobsData);
      } catch (error) {
        console.error('Error loading fleet data:', error);
        toast({
          title: "Error loading data",
          description: "Could not load fleet management data.",
          variant: "destructive"
        });
      }
    };
    
    loadData();
  }, [toast]);
  
  // Vehicle management handlers
  const handleAddVehicle = async (vehicle: Omit<Vehicle, 'id'>) => {
    try {
      const newVehicle = await addVehicle(vehicle);
      setVehicles([...vehicles, newVehicle as Vehicle]);
      toast({
        title: "Vehicle added",
        description: "New vehicle has been added to your fleet."
      });
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast({
        title: "Error adding vehicle",
        description: "Could not add the vehicle.",
        variant: "destructive"
      });
    }
  };
  
  const handleUpdateVehicle = async (vehicle: Vehicle) => {
    try {
      const updatedVehicle = await updateVehicle(vehicle);
      setVehicles(vehicles.map(v => v.id === vehicle.id ? updatedVehicle : v));
      toast({
        title: "Vehicle updated",
        description: "Vehicle information has been updated."
      });
    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast({
        title: "Error updating vehicle",
        description: "Could not update the vehicle.",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteVehicle = async (id: string) => {
    try {
      await removeVehicle(id);
      setVehicles(vehicles.filter(v => v.id !== id));
      toast({
        title: "Vehicle removed",
        description: "Vehicle has been removed from your fleet."
      });
    } catch (error) {
      console.error('Error removing vehicle:', error);
      toast({
        title: "Error removing vehicle",
        description: "Could not remove the vehicle.",
        variant: "destructive"
      });
    }
  };
  
  const openVehicleForm = (vehicle?: Vehicle) => {
    setSelectedVehicle(vehicle);
    setVehicleFormOpen(true);
  };
  
  // Mechanic management handlers
  const handleAddMechanic = async (mechanic: Omit<Mechanic, 'id'>) => {
    try {
      const newMechanic = await addMechanic(mechanic);
      setMechanics([...mechanics, newMechanic as Mechanic]);
      toast({
        title: "Mechanic added",
        description: "New mechanic has been added."
      });
    } catch (error) {
      console.error('Error adding mechanic:', error);
      toast({
        title: "Error adding mechanic",
        description: "Could not add the mechanic.",
        variant: "destructive"
      });
    }
  };
  
  const handleUpdateMechanic = async (mechanic: Mechanic) => {
    try {
      const updatedMechanic = await updateMechanic(mechanic);
      setMechanics(mechanics.map(m => m.id === mechanic.id ? updatedMechanic : m));
      toast({
        title: "Mechanic updated",
        description: "Mechanic information has been updated."
      });
    } catch (error) {
      console.error('Error updating mechanic:', error);
      toast({
        title: "Error updating mechanic",
        description: "Could not update the mechanic.",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteMechanic = async (id: string) => {
    try {
      await removeMechanic(id);
      setMechanics(mechanics.filter(m => m.id !== id));
      toast({
        title: "Mechanic removed",
        description: "Mechanic has been removed."
      });
    } catch (error) {
      console.error('Error removing mechanic:', error);
      toast({
        title: "Error removing mechanic",
        description: "Could not remove the mechanic.",
        variant: "destructive"
      });
    }
  };
  
  const openMechanicForm = (mechanic?: Mechanic) => {
    setSelectedMechanic(mechanic);
    setMechanicFormOpen(true);
  };
  
  // Repair job management handlers
  const handleAddRepairJob = async (job: Omit<RepairJob, 'id'>) => {
    try {
      const newJob = await addRepairJob(job);
      setRepairJobs([...repairJobs, newJob as RepairJob]);
      toast({
        title: "Repair job created",
        description: "New repair job has been created."
      });
    } catch (error) {
      console.error('Error adding repair job:', error);
      toast({
        title: "Error creating repair job",
        description: "Could not create the repair job.",
        variant: "destructive"
      });
    }
  };
  
  const handleUpdateRepairJob = async (job: RepairJob) => {
    try {
      const updatedJob = await updateRepairJob(job);
      setRepairJobs(repairJobs.map(j => j.id === job.id ? updatedJob : j));
      toast({
        title: "Repair job updated",
        description: "Repair job information has been updated."
      });
    } catch (error) {
      console.error('Error updating repair job:', error);
      toast({
        title: "Error updating repair job",
        description: "Could not update the repair job.",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteRepairJob = async (id: string) => {
    try {
      await removeRepairJob(id);
      setRepairJobs(repairJobs.filter(j => j.id !== id));
      toast({
        title: "Repair job deleted",
        description: "Repair job has been deleted."
      });
    } catch (error) {
      console.error('Error removing repair job:', error);
      toast({
        title: "Error deleting repair job",
        description: "Could not delete the repair job.",
        variant: "destructive"
      });
    }
  };
  
  const openRepairJobForm = (job?: RepairJob, vehicleId?: string) => {
    setSelectedRepairJob(job);
    setPreselectedVehicleId(vehicleId);
    setRepairJobFormOpen(true);
  };
  
  const openAssignMechanicDialog = (job: RepairJob) => {
    setJobToAssign(job);
    setAssignMechanicDialogOpen(true);
  };
  
  const handleAssignMechanic = async (jobId: string, mechanicId: string | null) => {
    try {
      const updatedJob = await assignMechanicToJob(jobId, mechanicId);
      if (updatedJob) {
        setRepairJobs(repairJobs.map(j => j.id === jobId ? updatedJob : j));
        toast({
          title: mechanicId ? "Mechanic assigned" : "Mechanic unassigned",
          description: mechanicId ? "Mechanic has been assigned to the repair job." : "Mechanic has been unassigned from the repair job."
        });
      }
    } catch (error) {
      console.error('Error assigning mechanic:', error);
      toast({
        title: "Error assigning mechanic",
        description: "Could not assign the mechanic to the repair job.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="h2">Fleet Management</h1>
        <p className="text-muted-foreground">Manage your fleet vehicles, mechanics, and repair jobs</p>
      </div>
      
      <Tabs defaultValue="vehicles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="repairs">Repairs</TabsTrigger>
          <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vehicles" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Vehicle Management</CardTitle>
              <CardDescription>
                Add, update, or remove vehicles in your fleet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VehicleList 
                vehicles={vehicles} 
                onEdit={openVehicleForm} 
                onDelete={handleDeleteVehicle} 
                onAddNew={() => openVehicleForm()} 
                onCreateRepair={(vehicle) => openRepairJobForm(undefined, vehicle.id)}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="repairs" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Repair Jobs</CardTitle>
              <CardDescription>
                Manage repair jobs and assign mechanics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RepairJobList 
                repairJobs={repairJobs} 
                vehicles={vehicles}
                mechanics={mechanics}
                onEdit={openRepairJobForm} 
                onDelete={handleDeleteRepairJob} 
                onAddNew={() => openRepairJobForm()} 
                onAssignMechanic={openAssignMechanicDialog}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mechanics" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Mechanic Management</CardTitle>
              <CardDescription>
                Add, update, or remove mechanics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MechanicList 
                mechanics={mechanics} 
                onEdit={openMechanicForm} 
                onDelete={handleDeleteMechanic} 
                onAddNew={() => openMechanicForm()} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Forms and Dialogs */}
      {vehicleFormOpen && (
        <VehicleForm 
          open={vehicleFormOpen}
          onClose={() => setVehicleFormOpen(false)}
          onSave={selectedVehicle ? handleUpdateVehicle : handleAddVehicle}
          vehicle={selectedVehicle}
        />
      )}
      
      {mechanicFormOpen && (
        <MechanicForm 
          open={mechanicFormOpen}
          onClose={() => setMechanicFormOpen(false)}
          onSave={selectedMechanic ? handleUpdateMechanic : handleAddMechanic}
          mechanic={selectedMechanic}
        />
      )}
      
      {repairJobFormOpen && (
        <RepairJobForm 
          open={repairJobFormOpen}
          onClose={() => {
            setRepairJobFormOpen(false);
            setPreselectedVehicleId(undefined);
          }}
          onSave={selectedRepairJob ? handleUpdateRepairJob : handleAddRepairJob}
          job={selectedRepairJob}
          vehicles={vehicles}
          mechanics={mechanics}
          preselectedVehicleId={preselectedVehicleId}
        />
      )}
      
      {assignMechanicDialogOpen && jobToAssign && (
        <AssignMechanicDialog 
          open={assignMechanicDialogOpen}
          onClose={() => setAssignMechanicDialogOpen(false)}
          onAssign={handleAssignMechanic}
          job={jobToAssign}
          mechanics={mechanics}
        />
      )}
    </div>
  );
};

export default FleetManagement;
