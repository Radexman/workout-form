interface HourPickerProps {
  selectedHour?: string;
  onHourChange: (hour: string) => void;
}

const HOURS = ['12:00', '14:00', '16:30', '18:30', '20:00'];

const HourPicker = ({ selectedHour, onHourChange }: HourPickerProps) => {
  return (
    <div className="text-primary-dark">
      <span>Time</span>
      <div className="mt-2 flex w-[342px] flex-row flex-wrap items-start gap-2 md:w-[426px] md:flex-col">
        {HOURS.map((h) => (
          <button
            key={h}
            type="button"
            onClick={() => onHourChange(h)}
            className={`w-12 cursor-pointer rounded-md px-4 py-2 outline transition md:w-auto ${
              selectedHour === h
                ? 'outline-primary outline-2'
                : 'outline-muted bg-white hover:bg-gray-100'
            }`}
          >
            {h}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HourPicker;
