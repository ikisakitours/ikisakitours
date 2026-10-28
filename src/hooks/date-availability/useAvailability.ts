// src/hook/date-availability/useAvailability.ts
import { useState, useEffect } from 'react';
import { fetchClosedDates } from '@/services/date-availability/availabilityService';

export const useAvailability = () => {
  const [closedDates, setClosedDates] = useState<string[]>([]);
  const [isLoadingDates, setIsLoadingDates] = useState<boolean>(true);

  useEffect(() => {
    const getDates = async () => {
      setIsLoadingDates(true);
      try {
        const dates = await fetchClosedDates();
        
        // අනිවාර්යයෙන්ම Array එකක් නම් විතරක් set කරන්න
        if (Array.isArray(dates)) {
          setClosedDates(dates);
        } else {
          setClosedDates([]);
        }
        
      } catch (error) {
        console.error('Failed to load dates', error);
        setClosedDates([]);
      } finally {
        setIsLoadingDates(false);
      }
    };

    getDates();
  }, []);

  return { closedDates, isLoadingDates };
};