
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RepairJob, Mechanic } from '@/data/fleetData';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface AssignMechanicDialogProps {
  open: boolean;
  onClose: () => void;
  onAssign: (jobId: string, mechanicId: string | null) => void;
  job: RepairJob;
  mechanics: Mechanic[];
}

const assignSchema = z.object({
  mechanicId: z.string().nullable(),
});

type AssignFormValues = z.infer<typeof assignSchema>;

const AssignMechanicDialog = ({ open, onClose, onAssign, job, mechanics }: AssignMechanicDialogProps) => {
  const form = useForm<AssignFormValues>({
    resolver: zodResolver(assignSchema),
    defaultValues: {
      mechanicId: job.assignedMechanicId,
    },
  });
  
  const handleSubmit = (values: AssignFormValues) => {
    onAssign(job.id, values.mechanicId);
    onClose();
  };
  
  const availableMechanics = mechanics.filter(m => m.availability === 'Available' || m.id === job.assignedMechanicId);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Assign Mechanic to Repair Job</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Job Description</p>
              <p className="font-medium">{job.description}</p>
            </div>
            
            <FormField
              control={form.control}
              name="mechanicId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Mechanic</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mechanic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Unassign</SelectItem>
                      {availableMechanics.length > 0 ? (
                        availableMechanics.map((mechanic) => (
                          <SelectItem key={mechanic.id} value={mechanic.id}>
                            {mechanic.name} - {mechanic.specialization}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>No available mechanics</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {availableMechanics.length === 0 && (
              <div className="text-amber-500 text-sm">
                No mechanics are currently available. You may want to update mechanic availability.
              </div>
            )}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Assign
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignMechanicDialog;
