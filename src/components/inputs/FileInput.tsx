import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { Icon } from '@iconify/react';

interface FileInputProps {
  label: string;
  name: string;
  value: File | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const FileInput = ({ label, name, value, onChange, error, required }: FileInputProps) => {
  const deleteFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const event = {
      target: { name, files: null },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(event);

    const inputEl = document.getElementById(name) as HTMLInputElement | null;
    if (inputEl) {
      inputEl.value = '';
    }
  };

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
          <div className="flex items-center gap-2">
            <span className="text-primary-dark font-medium">{value.name}</span>
            <button
              type="button"
              onClick={deleteFile}
              className="bg-primary-dark hover:bg-error z-50 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full"
            >
              <Icon icon="mingcute:close-fill" className="text-sm text-white" />
            </button>
          </div>
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
