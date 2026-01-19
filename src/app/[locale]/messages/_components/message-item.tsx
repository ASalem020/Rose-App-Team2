type MessageItemPropsType = {
  messageKey: string;
  value: string;
};

export default function MessageItem({
  messageKey,
  value,
}: MessageItemPropsType) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
      <code className="mb-2 block font-mono text-xs text-maroon-600 dark:text-maroon-400">
        {messageKey}
      </code>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        {value}
      </p>
    </div>
  );
}
