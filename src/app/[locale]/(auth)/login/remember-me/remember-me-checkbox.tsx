type RememberMeProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function RememberMeCheckbox({
  checked,
  onChange,
}: RememberMeProps) {
  return (
    // remember me labler
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-md border border-maroon-700 ${checked ? 'bg-maroon-700' : 'bg-transparent'} `}
      >
        {checked && (
          <span className="text-xs text-white">✓</span>
        )}
      </span>
      Remember me
    </label>
  );
}
