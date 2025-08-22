import clsx from 'clsx';
import { useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface SubmitStatusMessageProps {
  status: 'success' | 'error' | null;
  onClear: () => void;
}

const SubmitStatusMessage = ({ status, onClear }: SubmitStatusMessageProps) => {
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        onClear();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, onClear]);

  if (!status) return null;

  return (
    <div
      className={clsx('mt-4 text-sm transition-opacity duration-300', {
        'text-primary-dark': status === 'success',
        'text-error': status === 'error',
      })}
    >
      {status === 'success' ? (
        <div className="flex gap-1">
          <div className="mt-[2px] flex h-5 w-5 items-center justify-center rounded-full bg-green-600">
            <Icon icon="mingcute:check-fill" className="text-white" />
          </div>
          <p>Form submitted successfully.</p>
        </div>
      ) : (
        <div className="flex gap-1">
          <div className="bg-error mt-[2px] flex h-5 w-5 items-center justify-center rounded-full">
            <Icon icon="mingcute:warning-fill" className="text-white" />
          </div>
          <p>Something went wrong while submitting. Please try again later</p>
        </div>
      )}
    </div>
  );
};

export default SubmitStatusMessage;
