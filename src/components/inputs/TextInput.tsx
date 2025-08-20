import clsx from 'clsx';
import { Icon } from '@iconify/react';
import type { ChangeEvent } from 'react';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
}

const TextInput = ({ label, name, value, onChange, error, type, required }: TextInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={clsx(
          'border-muted text-primary-dark focus:outline-primary-hover focus:bg-primary-hover/5 h-12 w-full max-w-[426px] rounded-lg border bg-white px-4 font-medium',
          {
            'bg-error shadow-error border-red-500 shadow-sm': error,
          }
        )}
        required={required}
      />
      {error && (
        <div className="flex gap-1">
          <Icon icon="mingcute:warning-fill" className="text-error mt-[2px] h-5 w-5" />
          <div>
            <p className="text-sm">{error}</p>
            <p className="text-sm">Example: address@email.com</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInput;
