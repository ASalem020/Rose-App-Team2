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
 * Features:
 * - Fetches all occasions via React Query
 * - Delegates rendering to the generic EntityManagementTable
 * - Wires delete mutation from useDeleteOccasion hook
 *
 * Data Fetching:
 * - All occasions fetched via React Query (queryKey: ['occasions', 'all'])
 *
 * Mutations:
 * - Delete via useDeleteOccasion hook (wraps deleteOccasionAction)
 */
export default function OccasionsTable() {

  // Query


  const {
    data: occasions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['occasions', 'all'],
    queryFn: () => getOccasions(),
  });


  // Hooks


  const { deleteOccasion, isPending: isDeleting } = useDeleteOccasion();


  // Render


  return (
    <EntityManagementTable
      name="Occasions"
      data={occasions}
      isLoading={isLoading}
      isError={isError}
      addPath="/dashboard/occasion/add-occasion"
      editPath={(id) => `/dashboard/occasion/${id}`}
      onDelete={deleteOccasion}
      isDeleting={isDeleting}
    />
  );
}
