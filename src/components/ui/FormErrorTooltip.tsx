import { Icon } from '@iconify/react';

interface FormErrorTooltipProps {
  error?: string;
  extraText?: string;
}

const FormErrorTooltip = ({ error, extraText }: FormErrorTooltipProps) => {
  if (!error) return null;

  return (
    <div className="mt-1 flex gap-1">
      <Icon icon="mingcute:warning-fill" className="text-error mt-[2px] h-5 w-5" />
      <div>
        <p className="text-sm">{error}</p>
        {extraText && <p className="text-sm">{extraText}</p>}
      </div>
    </div>
  );
};

export default FormErrorTooltip;
