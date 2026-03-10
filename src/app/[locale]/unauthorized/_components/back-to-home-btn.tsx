import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

type BackToHomeBtnProps = {
  buttonText: string;
};

export default function BackToHomeBtn({
  buttonText,
}: BackToHomeBtnProps) {
  return (
    <div className="button-container flex w-80 border-t border-zinc-300 py-5 md:w-116">
      <Button
        variant="subtle"
        className="mx-auto max-w-44 !border-zinc-300 !bg-transparent py-2.5 !text-zinc-800 hover:!bg-zinc-100 rtl:max-w-48 dark:hover:!bg-zinc-100"
        asChild
      >
        <Link href="/">{buttonText}</Link>
      </Button>
    </div>
  );
}
