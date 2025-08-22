import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import FormErrorTooltip from '../ui/FormErrorTooltip';

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
          'text-primary-dark focus:outline-primary-hover focus:bg-primary-focus h-12 w-full max-w-[426px] rounded-lg border px-4 font-medium',
          {
            'border-muted bg-white': !error,
            'border-error border-2 bg-[#FEECEC]': error,
          }
        )}
        required={required}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
      <FormErrorTooltip
        error={error}
        extraText={type === 'email' ? 'Example: address@email.com' : undefined}
      />
    </div>
  );
};

export default TextInput;
