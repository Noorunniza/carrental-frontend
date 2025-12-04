"use client";
import "./Calendar.css" ;
import React, { useState, useMemo } from "react";

interface DatePickerProps {
  onClose: () => void;
  onSelectPickup: (date: Date) => void;
  onSelectReturn: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onClose,
  onSelectPickup,
  onSelectReturn,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth())
  );

  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [selectingPickup, setSelectingPickup] = useState(true);

  const monthNames = useMemo(
    () => [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ],
    []
  );

  const getMonthInfo = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
      year,
      month,
      daysInMonth: lastDay.getDate(),
      startingDayOfWeek: firstDay.getDay(), // 0 = Sun ... 6 = Sat
    };
  };

  const secondMonth = useMemo(
    () => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    [currentMonth]
  );

  const isSameDate = (d1: Date | null, d2: Date) => {
    if (!d1) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isInRange = (date: Date) => {
    if (!pickupDate || !returnDate) return false;
    return date > pickupDate && date < returnDate;
  };

  const handleDateClick = (date: Date) => {

    if (!selectingPickup && returnDate === null) {
      setSelectingPickup(true);
    }

    if (selectingPickup) {
      setPickupDate(date);
      onSelectPickup(date);
      setSelectingPickup(false);

    
      if (returnDate && returnDate <= date) {
        setReturnDate(null);
      }
    } else {
      
      if (pickupDate && date > pickupDate) {
        setReturnDate(date);
        onSelectReturn(date);
        
        setTimeout(() => onClose(), 220);
      } else {
       
        setSelectingPickup(true);
      }
    }
  };

  const renderCalendar = (baseMonth: Date) => {
    const { year, month, daysInMonth, startingDayOfWeek } = getMonthInfo(baseMonth);
    const cells: React.ReactNode[] = [];

    const shiftedStart = (startingDayOfWeek + 6) % 7; 

    for (let i = 0; i < shiftedStart; i++) {
      cells.push(<div key={`empty-${year}-${month}-${i}`} className="calendar-day empty" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(year, month, d);
      const isPickup = isSameDate(pickupDate, dt);
      const isReturn = isSameDate(returnDate, dt);
      const inRange = isInRange(dt);
      const disabled = !selectingPickup && pickupDate && dt <= pickupDate; 

      cells.push(
        <div
          key={`day-${year}-${month}-${d}`}
          className={[
            "calendar-day",
            isPickup ? "pickup" : "",
            isReturn ? "return" : "",
            inRange ? "in-range" : "",
            disabled ? "disabled" : "",
          ].join(" ")}
          onClick={() => !disabled && handleDateClick(dt)}
        >
          {d}
        </div>
      );
    }

    return cells;
  };

 
  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };
  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  return (
    <>
      <div className="date-picker-overlay" onClick={onClose}>
        <div className="date-picker-modal" onClick={(e) => e.stopPropagation()}>
          <div className="calendars-container">
            {/* LEFT month */}
            <div className="calendar-month">
              <div className="calendar-header">
                <button className="nav-btn" onClick={prevMonth} aria-label="Previous month">‹</button>

                <div className="month-year-selectors">
                  <select
                    className="month-select"
                    value={currentMonth.getMonth()}
                    onChange={(e) =>
                      setCurrentMonth(
                        new Date(currentMonth.getFullYear(), parseInt(e.target.value))
                      )
                    }
                  >
                    {monthNames.map((m, idx) => (
                      <option key={m} value={idx}>{m}</option>
                    ))}
                  </select>

                  <select
                    className="year-select"
                    value={currentMonth.getFullYear()}
                    onChange={(e) =>
                      setCurrentMonth(
                        new Date(parseInt(e.target.value), currentMonth.getMonth())
                      )
                    }
                  >
                    {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 2 + i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div className="nav-btn-placeholder" style={{ width: 32 }} />
              </div>

              <div className="weekdays">
                <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
              </div>

              <div className="calendar-grid">
                {renderCalendar(currentMonth)}
              </div>
            </div>

            {/* RIGHT month */}
            <div className="calendar-month">
              <div className="calendar-header">
                <div className="nav-btn-placeholder" style={{ width: 32 }} />

                <div className="month-year-selectors">
                  <select
                    className="month-select"
                    value={secondMonth.getMonth()}
                    onChange={(e) => {
                      const newMonth = parseInt(e.target.value);
                      
                      const baseYear = newMonth <= currentMonth.getMonth()
                        ? currentMonth.getFullYear() + 1
                        : currentMonth.getFullYear();
                     
                      setCurrentMonth(new Date(baseYear, newMonth - 1));
                    }}
                  >
                    {monthNames.map((m, idx) => (
                      <option key={m} value={idx}>{m}</option>
                    ))}
                  </select>

                  <select
                    className="year-select"
                    value={secondMonth.getFullYear()}
                    onChange={(e) => {
                      const newYear = parseInt(e.target.value);
                     
                      const newCurrent = new Date(newYear, secondMonth.getMonth() - 1);
                      setCurrentMonth(newCurrent);
                    }}
                  >
                    {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 2 + i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <button className="nav-btn" onClick={nextMonth} aria-label="Next month">›</button>
              </div>

              <div className="weekdays">
                <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
              </div>

              <div className="calendar-grid">
                {renderCalendar(secondMonth)}
              </div>
            </div>
          </div>
        </div>
      </div>

     <style jsx>{`
  /* OVERLAY */
  .date-picker-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 10px;
  }

  /* MODAL */
  .date-picker-modal {
    background: #fff;
    border-radius: 12px;
    padding: 22px;
    max-width: 820px;
    width: 100%;
    box-shadow: 0 10px 40px rgba(0,0,0,0.12);
  }

  /* TWO MONTHS */
  .calendars-container {
    display: flex;
    gap: 22px;
    align-items: flex-start;
  }

  .calendar-month {
    flex: 1;
    min-width: 260px;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .nav-btn {
    border: none;
    background: transparent;
    font-size: 20px;
    padding: 6px 8px;
    cursor: pointer;
  }

  .month-year-selectors {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .month-select,
  .year-select {
    padding: 6px 8px;
    border-radius: 6px;
    border: 1px solid #e6e6e6;
    background: white;
    font-weight: 600;
    cursor: pointer;
  }

  /* WEEKDAYS */
  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    color: #7a7a7a;
    font-size: 12px;
    margin-bottom: 8px;
    text-align: center;
  }

  /* DAYS GRID */
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
  }

  .calendar-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
  }

  .calendar-day.empty {
    background: transparent;
    cursor: default;
  }

  .calendar-day.disabled {
    color: #cfcfcf;
    cursor: not-allowed;
  }

  .calendar-day:hover {
    background: #eaf9f0;
    color: #0aa67c;
  }

  .calendar-day.pickup,
  .calendar-day.return {
    background: #0aa67c;
    color: white;
    font-weight: 700;
  }

  .calendar-day.in-range {
    background: #eaf9f0;
    color: #0aa67c;
  }


@media (max-width: 680px) {

  .date-picker-modal {
    max-width: 360px;       /* smaller box */
    padding: 10px;
    border-radius: 10px;
  }

  .calendars-container {
    flex-direction: column;
    gap: 12px;
  }

  .calendar-month {
    min-width: 100%;
  }

  .calendar-header {
    margin-bottom: 6px;
  }

  .month-select,
  .year-select {
    padding: 4px 6px;
    font-size: 12px;
  }

  .weekdays {
    font-size: 10px;
    margin-bottom: 4px;
  }

  .calendar-grid {
    gap: 4px;
  }

  .calendar-day {
    font-size: 11px;
    border-radius: 5px;
    padding: 0;
    aspect-ratio: 1;
    width: 32px !important;
    height: 32px !important;
  }

  .calendar-day.pickup,
  .calendar-day.return {
    font-size: 11px;
  }
}

`}</style>

    </>
  );
};
