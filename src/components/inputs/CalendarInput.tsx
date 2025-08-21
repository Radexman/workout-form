import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import 'react-datepicker/dist/react-datepicker.css';

import type { Holidays } from '../../types';

const apiKey = import.meta.env.VITE_API_NINJAS_KEY;

const CalendarInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [holidayInfo, setHolidayInfo] = useState<string | null>(null);
  const [holidays, setHolidays] = useState<Holidays[]>([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/holidays?country=PL', {
          headers: {
            'X-Api-Key': apiKey,
          },
        });
        const data: Holidays[] = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error('Failed to fetch holidays', error);
      }
    };

    fetchHolidays();
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-CA');
  };

  const isSunday = (date: Date): boolean => date.getDay() === 0;

  const isNationalHoliday = (date: Date): boolean => {
    const dateStr = formatDate(date);
    return holidays.some((h) => h.date === dateStr && h.type === 'NATIONAL_HOLIDAY');
  };

  const isObservance = (date: Date): Holidays | null => {
    const dateStr = formatDate(date);
    return holidays.find((h) => h.date === dateStr && h.type === 'OBSERVANCE') || null;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (!date) {
      setHolidayInfo(null);
      return;
    }

    const observance = isObservance(date);
    if (observance) {
      setHolidayInfo(`It's ${observance.name}`);
    } else {
      setHolidayInfo(null);
    }
  };

  const filterDate = (date: Date): boolean => {
    return !isSunday(date) && !isNationalHoliday(date);
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
