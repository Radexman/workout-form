import { Icon } from '@iconify/react';

interface HolidayTooltipProps {
  text: string;
}

const HolidayTooltip = ({ text }: HolidayTooltipProps) => {
  return (
    <div className="flex gap-1 text-sm">
      <Icon icon="mingcute:warning-fill" className="text-muted mt-[1px] h-5 w-5" />
      {text}
    </div>
  );
};

export default HolidayTooltip;
