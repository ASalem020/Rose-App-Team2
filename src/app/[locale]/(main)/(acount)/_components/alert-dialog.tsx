import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl";

type Props = {
  onConfirm: () => void
}
/**
 * @description This component is used to show a confirmation dialog when the user wants to delete their account. It uses the AlertDialog component from the UI library and it receives a function as a prop that will be called when the user confirms the action.
 * @returns A React component that shows a confirmation dialog when the user wants to delete their account.
 */

export function DeleteAccountAlert({ onConfirm }: Props) {
  // ^ translations
  const t = useTranslations('pages.profile')

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-11 border-none text-maroon-500 font-semibold" variant="outline">{t('delete-my-account')}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('dialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('dialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className=" w-80 mx-auto flex items-center justify-center gap-3 *:w-52">

          <AlertDialogCancel>{t('dialog.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{t('dialog.action')}</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
