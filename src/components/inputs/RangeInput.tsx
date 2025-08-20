import clsx from 'clsx';
import type { ChangeEvent } from 'react';

interface RangeInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  min: number;
  max: number;
}

const RangeInput = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
  min,
  max,
}: RangeInputProps) => {
  return (
    <div className="relative flex flex-col">
      <label htmlFor={name}>{label}</label>

      <div className="flex justify-between py-1 text-xs">
        <div>{min}</div>
        <div>{max}</div>
      </div>

      <input
        type="range"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        required={required}
        className={clsx(
          'bg-muted focus:outline-primary-hover h-1 w-full max-w-[426px] cursor-pointer rounded-xl',
          { 'ring-error ring-2': error }
        )}
        style={{ position: 'relative', zIndex: 2 }}
      />

      {error && <p className="text-sm">{error}</p>}

      {/* Tooltip */}
      <div
        className="bg-background text-primary border-muted pointer-events-none absolute -bottom-10 w-12 rounded border py-1 text-center text-sm shadow-md"
        style={{
          left: `${((value - min) / (max - min)) * 100}%`,
          transform: 'translateX(-50%)',
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default RangeInput;
