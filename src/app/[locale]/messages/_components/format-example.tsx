type FormatExamplePropsType = {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
};

export default function FormatExample({
  title,
  children,
  icon: Icon,
}: FormatExamplePropsType) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-5 w-5 text-maroon-600 dark:text-maroon-400" />
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
