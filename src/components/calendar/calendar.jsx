import React, {useEffect, useRef, useState} from "react";
import "./calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import useReceiptStore from "@/stores/receipt-store.js";
import useMedicineStore from "@/stores/medicine-store.js";
import {addMilliseconds, addWeeks} from "date-fns";
import ruLocale from "@fullcalendar/core/locales/ru";


const Calendar = () => {
  const calendarRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [infiniteReceipts, setInfiniteReceipts] = useState([]);

  const receipts = useReceiptStore(store => store.receipts);
  const medicines = useMedicineStore(store => store.medicines);

  const fillEventsByReceipt = (receipt) => {
    const newEvents = [];
    let currentDate = receipt.start_date;

    while (currentDate <= receipt.end_date) {
      newEvents.push({
        title: `${medicines[receipt.medicine].title} (${receipt.dosage})`,
        start: currentDate,
        end: currentDate,
      });
      currentDate = addMilliseconds(currentDate, receipt.periodicity);
    }

    setEvents((prevState) => [...prevState, ...newEvents]);
  };

  const onClickNext = () => {
    const newInfiniteReceipts = [];

    infiniteReceipts.forEach((infiniteReceipt) => {
      const endDate = addWeeks(infiniteReceipt.start_date, 6);

      fillEventsByReceipt({...infiniteReceipt, end_date: endDate});
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
      let endDate = receipt.end_date;

      if (!endDate) {
        endDate = addWeeks(receipt.start_date, 12);
        setInfiniteReceipts((prevState) => [
          ...prevState,
          {...receipt, "start_date": addMilliseconds(endDate, receipt.periodicity)}
        ]);
      }

      fillEventsByReceipt({...receipt, end_date: endDate});
    });
  }

  useEffect(() => {
    setEvents([]);
    setInfiniteReceipts([]);
    calendarRef.current.getApi().today();
    getInitialEvents(receipts);
  }, [receipts]);

  return (
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
      locale={ruLocale}
    />
  );
};

export default Calendar;
