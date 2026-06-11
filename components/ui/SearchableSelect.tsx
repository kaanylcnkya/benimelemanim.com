"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type SearchableSelectOption = {
  value: string;
  label: string;
};

type SearchableSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SearchableSelectOption[];
  placeholder: string;
  searchPlaceholder?: string;
  disabled?: boolean;
};

export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder = "Ara...",
  disabled = false,
}: SearchableSelectProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedLabel =
    options.find((option) => option.value === value)?.label || "";

  const filteredOptions = useMemo(() => {
    const term = search.toLocaleLowerCase("tr-TR").trim();

    if (!term) return options;

    return options.filter((option) =>
      option.label.toLocaleLowerCase("tr-TR").includes(term)
    );
  }, [options, search]);

  function selectValue(nextValue: string) {
    onChange(nextValue);
    setSearch("");
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setOpen((current) => !current);
          }
        }}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-left text-sm font-bold text-slate-700 outline-none transition hover:border-[#f6a313] focus:border-[#f6a313] focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          className={`line-clamp-1 ${
            selectedLabel ? "text-slate-800" : "text-slate-400"
          }`}
        >
          {selectedLabel || placeholder}
        </span>

        <span className="text-xs text-slate-400">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">
          <div className="border-b border-slate-100 p-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              autoFocus
              className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold outline-none focus:border-[#f6a313] focus:bg-white"
            />
          </div>

          <div className="max-h-64 overflow-y-auto p-2">
            <button
              type="button"
              onClick={() => selectValue("")}
              className="w-full rounded-xl px-3 py-2 text-left text-sm font-black text-[#06264a] hover:bg-orange-50"
            >
              {placeholder}
            </button>

            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => selectValue(option.value)}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-bold hover:bg-orange-50 ${
                  option.value === value
                    ? "bg-orange-50 text-[#b86b00]"
                    : "text-slate-700"
                }`}
              >
                {option.label}
              </button>
            ))}

            {filteredOptions.length === 0 && (
              <div className="px-3 py-4 text-center text-sm font-bold text-slate-400">
                Sonuç bulunamadı
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}