import DatePicker, { CalendarContainer } from 'react-datepicker';
import { useState, useEffect, type ReactNode } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import HourPicker from './HourPicker';
import HolidayTooltip from '../ui/HolidayTooltip';
import FormErrorTooltip from '../ui/FormErrorTooltip';
import { formatDate } from '../../utils/date';
import { fetchHolidays } from '../../api/holidays';
import type { Holidays } from '../../types';

interface CalendarInputProps {
  date: string;
  onDateChange: (date: string) => void;
  hour?: string;
  onHourChange?: (hour: string) => void;
  error?: string;
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

const CalendarInput = ({ date, onDateChange, hour, onHourChange, error }: CalendarInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date ? new Date(date) : null);
  const [selectedHour, setSelectedHour] = useState<string | undefined>(hour || undefined);
  const [holidayInfo, setHolidayInfo] = useState<string | null>(null);
  const [holidays, setHolidays] = useState<Holidays[]>([]);
  const [holidaysError, setHolidaysError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      try {
        const data = await fetchHolidays('PL');
        if (!isCancelled) {
          if (data.length === 0) {
            setHolidaysError('Could not load holidays data.');
          }
          setHolidays(data);
        }
      } catch (error) {
        if (!isCancelled) {
          setHolidaysError('Could not load holidays data.');
        }
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

    if (!selectedHour) {
      const defaultHour = '12:00';
      setSelectedHour(defaultHour);
      onHourChange?.(defaultHour);
    }
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

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:gap-7">
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
            aria-labelledby="date-label"
          />
          {holidayInfo && <HolidayTooltip text={holidayInfo} />}
          <FormErrorTooltip error={holidaysError || error} />
        </div>

        {selectedDate && (
          <div role="group" aria-labelledby="hour-label">
            {' '}
            <HourPicker selectedHour={selectedHour} onHourChange={handleChangeHour} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarInput;
