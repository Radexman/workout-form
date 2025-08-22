import clsx from 'clsx';

interface HourPickerProps {
  selectedHour?: string;
  onHourChange: (hour: string) => void;
}

const HOURS = ['12:00', '14:00', '16:30', '18:30', '20:00'];

const HourPicker = ({ selectedHour, onHourChange }: HourPickerProps) => {
  return (
    <fieldset className="text-primary-dark">
      <legend className="mb-2">Time</legend>
      <div
        role="radiogroup"
        aria-label="Select a time"
        className="flex w-[342px] flex-row flex-wrap items-start gap-2 md:w-[426px] md:flex-col"
      >
        {HOURS.map((h) => (
          <label
            key={h}
            className={clsx(
              'cursor-pointer rounded-md bg-white px-4 py-2 text-center outline transition',
              {
                'outline-primary outline-2': selectedHour === h,
                'outline-muted hover:bg-gray-100': selectedHour !== h,
              }
            )}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onHourChange(h);
              }
            }}
          >
            <input
              type="radio"
              name="hour"
              value={h}
              checked={selectedHour === h}
              onChange={() => onHourChange(h)}
              className="sr-only"
              aria-checked={selectedHour === h}
            />
            {h}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default HourPicker;
