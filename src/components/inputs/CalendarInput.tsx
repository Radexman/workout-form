import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Holiday {
  date: string;
  name: string;
  type?: string;
}

const CalendarInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [holidayInfo, setHolidayInfo] = useState<string | null>(null);

  const holidays: Holiday[] = [
    { date: new Date().toISOString().split('T')[0], name: 'Sample Holiday', type: 'OBSERVANCE' },
    { date: '2025-01-01', name: "New Year's Day", type: 'NATIONAL_HOLIDAY' },
    { date: '2025-12-25', name: 'Christmas Day', type: 'NATIONAL_HOLIDAY' },
  ];

  const isSunday = (date: Date): boolean => date.getDay() === 0;

  const isNationalHoliday = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    return holidays.some((h) => h.date === dateStr && h.type === 'NATIONAL_HOLIDAY');
  };

  const getHolidayName = (date: Date): string | null => {
    const dateStr = date.toISOString().split('T')[0];
    const holiday = holidays.find((h) => h.date === dateStr);
    return holiday ? holiday.name : null;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date && isNationalHoliday(date)) {
      const holidayName = getHolidayName(date);
      setHolidayInfo(`It's ${holidayName}`);
    } else {
      setHolidayInfo(null);
    }
  };

  const filterDate = (date: Date): boolean => {
    return !isSunday(date);
  };

  return (
    <div className="mt-12 flex max-w-md flex-col">
      <h2 className="mb-4 text-2xl font-medium text-gray-800">Your workout</h2>
      <label htmlFor="date" className="mb-2 text-gray-700">
        Date
      </label>

      <div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          filterDate={filterDate}
        />
      </div>

      {holidayInfo && (
        <div className="flex gap-1 text-sm">
          <Icon icon="mingcute:warning-fill" className="text-muted mt-[1px] h-5 w-5" />
          {holidayInfo}
        </div>
      )}
    </div>
  );
};

export default CalendarInput;
