import { cn } from "@/lib/utils";

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
};

export default function Input({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  className,
}: InputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder:text-slate-400 transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100",
          className
        )}
      />
    </label>
  );
}