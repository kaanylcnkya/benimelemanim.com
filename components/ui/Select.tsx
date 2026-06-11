import { cn } from "@/lib/utils";

type SelectProps = {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export default function Select({
  label,
  name,
  options,
  placeholder = "Seçiniz",
  required = false,
  className,
}: SelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>

      <select
        name={name}
        required={required}
        className={cn(
          "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100",
          className
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}