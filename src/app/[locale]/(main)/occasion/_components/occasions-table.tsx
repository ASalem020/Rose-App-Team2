'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getOccasions } from '@/lib/services/occasions.service';
import EntityManagementTable from './entity-management-table';

// ─── Service helpers ──────────────────────────────────────────────────────────
// We call the API directly here so the table page stays light.
// Replace the fetch calls below with your actual server-action / service
// once you have delete / CRUD actions for occasions.

async function deleteOccasionService(id: string): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/occasions/${id}`,
    { method: 'DELETE' },
  );
  if (!res.ok) throw new Error('Failed to delete occasion');
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function OccasionsTable() {
  const queryClient = useQueryClient();

  const {
    data: occasions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['occasions', 'all'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/occasions`,
      );
      const json = await res.json();
      return json.occasions ?? [];
    },
  });

  const { mutate: deleteOccasion, isPending: isDeleting } = useMutation({
    mutationFn: deleteOccasionService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] });
      toast.success('Occasion deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete occasion');
    },
  });

  return (
    <EntityManagementTable
      name="Occasions"
      data={occasions}
      isLoading={isLoading}
      isError={isError}
      addPath="/occasion/add-occasion"
      editPath={(id) => `/occasion/${id}`}
      onDelete={deleteOccasion}
      isDeleting={isDeleting}
    />
  );
}
