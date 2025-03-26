
// Sample data for fleet management
export type Vehicle = {
  id: string;
  name: string;
  type: 'Truck' | 'Van' | 'Car' | 'Motorcycle';
  licensePlate: string;
  status: 'Active' | 'Maintenance' | 'Out of Service';
  lastMaintenance: string;
  mileage: number;
};

export type Mechanic = {
  id: string;
  name: string;
  specialization: string;
  availability: 'Available' | 'Busy' | 'Off Duty';
  contactNumber: string;
};

export type RepairJob = {
  id: string;
  vehicleId: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  assignedMechanicId: string | null;
  createdAt: string;
  estimatedCompletionDate: string | null;
  actualCompletionDate: string | null;
  cost: number | null;
};

// Initial sample data
export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Delivery Truck 01',
    type: 'Truck',
    licensePlate: 'TR-5432',
    status: 'Active',
    lastMaintenance: '2023-09-15',
    mileage: 45289,
  },
  {
    id: '2',
    name: 'City Van 03',
    type: 'Van',
    licensePlate: 'VN-7821',
    status: 'Maintenance',
    lastMaintenance: '2023-10-20',
    mileage: 28734,
  },
  {
    id: '3',
    name: 'Courier Bike 05',
    type: 'Motorcycle',
    licensePlate: 'MB-1234',
    status: 'Active',
    lastMaintenance: '2023-11-05',
    mileage: 12903,
  },
  {
    id: '4',
    name: 'Delivery Car 02',
    type: 'Car',
    licensePlate: 'CR-9876',
    status: 'Out of Service',
    lastMaintenance: '2023-08-30',
    mileage: 67421,
  },
];

export const mechanics: Mechanic[] = [
  {
    id: '1',
    name: 'John Smith',
    specialization: 'Engine Repairs',
    availability: 'Available',
    contactNumber: '555-123-4567',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    specialization: 'Electrical Systems',
    availability: 'Busy',
    contactNumber: '555-234-5678',
  },
  {
    id: '3',
    name: 'Ahmed Khan',
    specialization: 'Brake Systems',
    availability: 'Available',
    contactNumber: '555-345-6789',
  },
];

export const repairJobs: RepairJob[] = [
  {
    id: '1',
    vehicleId: '2',
    description: 'Transmission fluid leak',
    priority: 'High',
    status: 'In Progress',
    assignedMechanicId: '1',
    createdAt: '2023-10-18',
    estimatedCompletionDate: '2023-10-22',
    actualCompletionDate: null,
    cost: 450,
  },
  {
    id: '2',
    vehicleId: '4',
    description: 'Engine overheating',
    priority: 'Critical',
    status: 'Pending',
    assignedMechanicId: null,
    createdAt: '2023-10-15',
    estimatedCompletionDate: null,
    actualCompletionDate: null,
    cost: null,
  },
];

// Mock API functions
let mockVehicles = [...vehicles];
let mockMechanics = [...mechanics];
let mockRepairJobs = [...repairJobs];

// Vehicle management functions
export const getVehicles = () => {
  return Promise.resolve([...mockVehicles]);
};

export const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
  const newVehicle = {
    ...vehicle,
    id: Math.random().toString(36).substring(2, 9),
  };
  mockVehicles.push(newVehicle as Vehicle);
  return Promise.resolve(newVehicle);
};

export const updateVehicle = (vehicle: Vehicle) => {
  mockVehicles = mockVehicles.map(v => v.id === vehicle.id ? vehicle : v);
  return Promise.resolve(vehicle);
};

export const removeVehicle = (id: string) => {
  mockVehicles = mockVehicles.filter(v => v.id !== id);
  return Promise.resolve(id);
};

// Mechanic management functions
export const getMechanics = () => {
  return Promise.resolve([...mockMechanics]);
};

export const addMechanic = (mechanic: Omit<Mechanic, 'id'>) => {
  const newMechanic = {
    ...mechanic,
    id: Math.random().toString(36).substring(2, 9),
  };
  mockMechanics.push(newMechanic as Mechanic);
  return Promise.resolve(newMechanic);
};

export const updateMechanic = (mechanic: Mechanic) => {
  mockMechanics = mockMechanics.map(m => m.id === mechanic.id ? mechanic : m);
  return Promise.resolve(mechanic);
};

export const removeMechanic = (id: string) => {
  mockMechanics = mockMechanics.filter(m => m.id !== id);
  return Promise.resolve(id);
};

// Repair job management functions
export const getRepairJobs = () => {
  return Promise.resolve([...mockRepairJobs]);
};

export const addRepairJob = (job: Omit<RepairJob, 'id'>) => {
  const newJob = {
    ...job,
    id: Math.random().toString(36).substring(2, 9),
  };
  mockRepairJobs.push(newJob as RepairJob);
  return Promise.resolve(newJob);
};

export const updateRepairJob = (job: RepairJob) => {
  mockRepairJobs = mockRepairJobs.map(j => j.id === job.id ? job : j);
  return Promise.resolve(job);
};

export const removeRepairJob = (id: string) => {
  mockRepairJobs = mockRepairJobs.filter(j => j.id !== id);
  return Promise.resolve(id);
};

export const assignMechanicToJob = (jobId: string, mechanicId: string | null) => {
  mockRepairJobs = mockRepairJobs.map(job => {
    if (job.id === jobId) {
      return {
        ...job,
        assignedMechanicId: mechanicId,
        status: mechanicId ? 'In Progress' : job.status,
      };
    }
    return job;
  });
  
  return Promise.resolve(mockRepairJobs.find(job => job.id === jobId));
};
