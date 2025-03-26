
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RepairJob, Vehicle, Mechanic } from '@/data/fleetData';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface RepairJobFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (job: Omit<RepairJob, 'id'> | RepairJob) => void;
  job?: RepairJob;
  vehicles: Vehicle[];
  mechanics: Mechanic[];
  preselectedVehicleId?: string;
}

const repairJobSchema = z.object({
  vehicleId: z.string().min(1, 'Vehicle is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  status: z.enum(['Pending', 'In Progress', 'Completed', 'Cancelled']),
  assignedMechanicId: z.string().nullable(),
  createdAt: z.string(),
  estimatedCompletionDate: z.string().nullable(),
  actualCompletionDate: z.string().nullable(),
  cost: z.preprocess(
    (val) => (val === '' ? null : Number(val)),
    z.number().nullable()
  ),
});

type RepairJobFormValues = z.infer<typeof repairJobSchema>;

const RepairJobForm = ({ 
  open, 
  onClose, 
  onSave, 
  job, 
  vehicles, 
  mechanics,
  preselectedVehicleId 
}: RepairJobFormProps) => {
  const form = useForm<RepairJobFormValues>({
    resolver: zodResolver(repairJobSchema),
    defaultValues: job || {
      vehicleId: preselectedVehicleId || '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      assignedMechanicId: null,
      createdAt: new Date().toISOString().split('T')[0],
      estimatedCompletionDate: null,
      actualCompletionDate: null,
      cost: null,
    },
  });
  
  useEffect(() => {
    if (preselectedVehicleId) {
      form.setValue('vehicleId', preselectedVehicleId);
    }
  }, [preselectedVehicleId, form]);
  
  const handleSubmit = (values: RepairJobFormValues) => {
    if (job) {
      onSave({ ...values, id: job.id });
    } else {
      onSave(values);
    }
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{job ? 'Edit Repair Job' : 'Create Repair Job'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!!preselectedVehicleId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} ({vehicle.licensePlate})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe the repair needed" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="assignedMechanicId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Mechanic</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mechanic (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mechanics.map((mechanic) => (
                        <SelectItem key={mechanic.id} value={mechanic.id}>
                          {mechanic.name} - {mechanic.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="estimatedCompletionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Completion Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        value={field.value || ''} 
                        onChange={field.onChange} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {form.watch('status') === 'Completed' && (
                <FormField
                  control={form.control}
                  name="actualCompletionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Actual Completion Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          value={field.value || ''} 
                          onChange={field.onChange} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      placeholder="Enter cost (optional)" 
                      value={field.value === null ? '' : field.value} 
                      onChange={e => field.onChange(e.target.value === '' ? null : parseFloat(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {job ? 'Update Job' : 'Create Job'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RepairJobForm;
