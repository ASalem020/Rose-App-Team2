import { useMutation } from "@tanstack/react-query"
import { registerAction } from "../_actions/register.action"


export default function useRegister() {
  // Mutation
  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: ['register-user'],
    mutationFn: registerAction
  })

  return { isLoading, mutateAsync };
}
