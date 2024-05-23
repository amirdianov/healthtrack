import React, {useEffect, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import useReceiptStore from "@/stores/receipt-store.js";
import useMedicineStore from "@/stores/medicine-store.js";
import {addMilliseconds, addMonths} from "date-fns";


const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [infiniteReceipts, setInfiniteReceipts] = useState([]);

  const receipts = useReceiptStore(store => store.receipts);
  const medicines = useMedicineStore(store => store.medicines);

  const fillCalendar = (title, periodicity, start, end) => {
    const events = []
    let currentDate = start;

    while(currentDate <= end) {
      events.push({
        title,
        start: currentDate,
        end: currentDate
      })

      currentDate = addMilliseconds(currentDate, periodicity);
    }
    return events;
  }

  const onClickNext = () => {
    const events = [];

    infiniteReceipts.forEach((infiniteReceipt) => {
      const endDate = addMonths(new Date(infiniteReceipt.start_date), 2);
      events.push(...fillCalendar(medicines[infiniteReceipt.medicine].title, infiniteReceipt.periodicity,
        new Date(infiniteReceipt.start_date), endDate));
    })
    setEvents((prevState) => [...prevState, events]);
  };

  useEffect(() => {
    const [nextButton] = document.getElementsByClassName('fc-next-button');

    nextButton.addEventListener('click', onClickNext);

    return () => {
      nextButton.removeEventListener('click', onClickNext);
    };
  }, []);

  const getEvents = (receipts) => {
    const events = receipts.map((receipt) => {
      if (receipt.end_date) {
        return fillCalendar(medicines[receipt.medicine].title,
          receipt.periodicity, new Date(receipt.start_date), new Date(receipt.end_date));
      }
      const endDate = addMonths(new Date(receipt.start_date), 2);
        const res = fillCalendar(medicines[receipt.medicine].title, receipt.periodicity,
          new Date(receipt.start_date), endDate);
        setInfiniteReceipts((prevState) => [...prevState, {...receipt, "start_date": endDate}]);
        return res;

    })
    return events.flat();
  }

  useEffect(() => {
    setEvents(getEvents(receipts))
  }, [receipts]);

  return (
    <div>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
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
