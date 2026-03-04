'use client';


// Imports


import { useQuery } from '@tanstack/react-query';
import EntityManagementTable from './entity-management-table';
import { getOccasions } from '@/lib/services/occasions.service';
import { useDeleteOccasion } from '@/hooks/use-delete-occasion';


// Component


/**
 * OccasionsTable - Renders the admin occasions management table
 *
 * Data Fetching:
 * - All occasions fetched via React Query (queryKey: ['occasions', 'all'])
 *
 * Mutations:
 * - Delete via useDeleteOccasion hook (wraps deleteOccasionAction)
 */
export default function OccasionsTable() {
  const {
    data: occasions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['occasions', 'all'],
    queryFn: () => getOccasions(),
  });

  const { deleteOccasion, isPending: isDeleting } = useDeleteOccasion();

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
