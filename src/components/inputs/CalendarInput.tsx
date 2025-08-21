import DatePicker, { CalendarContainer } from 'react-datepicker';
import { useState, useEffect, type ReactNode } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import HourPicker from './HourPicker';
import HolidayTooltip from '../ui/HolidayTooltip';
import { formatDate } from '../../utils/date';
import { fetchHolidays } from '../../api/holidays';
import type { Holidays } from '../../types';

interface CalendarInputProps {
  date: string;
  onDateChange: (date: string) => void;
  hour?: string;
  onHourChange?: (hour: string) => void;
}

const MyContainer = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <CalendarContainer
      className={`${className} border-muted rounded-lg border bg-white p-7 shadow-lg`}
    >
      <div className="relative font-sans">{children}</div>
    </CalendarContainer>
  );
};

const CalendarInput = ({ date, onDateChange, hour, onHourChange }: CalendarInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date ? new Date(date) : null);
  const [selectedHour, setSelectedHour] = useState<string | undefined>(hour || undefined);
  const [holidayInfo, setHolidayInfo] = useState<string | null>(null);
  const [holidays, setHolidays] = useState<Holidays[]>([]);

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      const data = await fetchHolidays('PL');
      if (!isCancelled) {
        setHolidays(data);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  const isSunday = (date: Date): boolean => date.getDay() === 0;

  const isNationalHoliday = (date: Date): boolean => {
    const dateStr = formatDate(date);
    return holidays.some((h) => h.date === dateStr && h.type === 'NATIONAL_HOLIDAY');
  };

  const isObservance = (date: Date): Holidays | null => {
    const dateStr = formatDate(date);
    return holidays.find((h) => h.date === dateStr && h.type === 'OBSERVANCE') || null;
  };

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (!date) {
      setHolidayInfo(null);
      onDateChange('');
      return;
    }

    const observance = isObservance(date);
    if (observance) {
      setHolidayInfo(`It's ${observance.name}`);
    } else {
      setHolidayInfo(null);
    }

    onDateChange(formatDate(date));
  };

  const handleChangeHour = (hour: string) => {
    setSelectedHour(hour);
    onHourChange?.(hour);
  };

  const filterDate = (date: Date): boolean => {
    return !isSunday(date) && !isNationalHoliday(date);
  };

  return (
    <div className="mt-12 flex max-w-md flex-col">
      <h2 className="text-primary-dark mb-4 text-2xl font-medium">Your workout</h2>

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-2 text-gray-700">
            Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            calendarContainer={MyContainer}
            inline
            filterDate={filterDate}
            calendarStartDay={1}
            required
          />
        </div>

        {holidayInfo && <HolidayTooltip text={holidayInfo} />}

        {selectedDate && <HourPicker selectedHour={selectedHour} onHourChange={handleChangeHour} />}
      </div>
    </div>
  );
};

export default CalendarInput;
