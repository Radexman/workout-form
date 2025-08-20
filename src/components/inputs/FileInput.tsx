import clsx from 'clsx';
import type { ChangeEvent } from 'react';

interface FileInputProps {
  label: string;
  name: string;
  value: File | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const FileInput = ({ label, name, value, onChange, error, required }: FileInputProps) => {
  return (
    <div className="mt-12 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <label
        htmlFor={name}
        className={clsx(
          'border-muted text-primary-blue relative flex h-[96px] w-full max-w-[426px] cursor-pointer items-center justify-center rounded-lg border bg-white text-center hover:bg-blue-50',
          { 'ring-error ring-2': error }
        )}
      >
        {value ? (
          <span className="text-primary">{value.name}</span>
        ) : (
          <>
            <span className="text-primary mr-1 underline">Upload a file</span>{' '}
            <span className="text-muted-text hidden md:inline">or drag and drop here</span>
          </>
        )}
        <input
          type="file"
          id={name}
          name={name}
          onChange={onChange}
          accept=".jpg,.jpeg,.png"
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
          required={required}
          onFocus={(event) =>
            event.currentTarget.parentElement?.classList.add('ring-2', 'ring-primary-hover')
          }
          onBlur={(event) =>
            event.currentTarget.parentElement?.classList.remove('ring-2', 'ring-primary-hover')
          }
        />
      </label>
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};

export default FileInput;
