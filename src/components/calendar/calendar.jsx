import React, {useEffect, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import useReceiptStore from "@/stores/receipt-store.js";
import useMedicineStore from "@/stores/medicine-store.js";
import {addMilliseconds, addMonths} from "date-fns";


const Calendar = () => {
  const calendarRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [infiniteReceipts, setInfiniteReceipts] = useState([]);

  const receipts = useReceiptStore(store => store.receipts);
  const medicines = useMedicineStore(store => store.medicines);

  const fillEventsByReceipt = (title, periodicity, start, end) => {
    const newEvents = [];
    let currentDate = start;

    while (currentDate <= end) {
      newEvents.push({
        title,
        start: currentDate,
        end: currentDate,
      });
      currentDate = addMilliseconds(currentDate, periodicity);
    }

    setEvents((prevState) => [...prevState, ...newEvents]);
  };

  const onClickNext = () => {
    const newInfiniteReceipts = [];

    infiniteReceipts.forEach((infiniteReceipt) => {
      const endDate = addMonths(infiniteReceipt.start_date, 2);

      fillEventsByReceipt(
        medicines[infiniteReceipt.medicine].title,
        infiniteReceipt.periodicity,
        infiniteReceipt.start_date,
        endDate
      );
      newInfiniteReceipts.push({
        ...infiniteReceipt,
        start_date: addMilliseconds(endDate, infiniteReceipt.periodicity)
      });
    })
    setInfiniteReceipts(() => newInfiniteReceipts);
  };

  useEffect(() => {
    const [nextButton] = document.getElementsByClassName("fc-next-button");
    nextButton.addEventListener("click", onClickNext);

    return () => {
      nextButton.removeEventListener("click", onClickNext);
    };
  }, [infiniteReceipts]);

  const getInitialEvents = (receipts) => {
    receipts.forEach((receipt) => {
      const startDate = new Date(receipt.start_date);
      let endDate;

      if (receipt.end_date) {
        endDate = new Date(receipt.end_date);
      } else {
        endDate = addMonths(startDate, 2);
        setInfiniteReceipts((prevState) => [
          ...prevState,
          {...receipt, "start_date": addMilliseconds(endDate, receipt.periodicity)}
        ]);
      }

      fillEventsByReceipt(
        medicines[receipt.medicine].title,
        receipt.periodicity,
        startDate,
        endDate
      );
    });
  }

  useEffect(() => {
    setEvents([]);
    setInfiniteReceipts([]);
    calendarRef.current.getApi().today();
    getInitialEvents(receipts);
  }, [receipts]);

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
      />
    </div>
  );
};

export default Calendar;
