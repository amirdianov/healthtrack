import React from "react";
import {Route, Routes} from "react-router-dom";
import CreateReceiptPage from "@/components/pages/create-receipt-page.jsx";
import CalendarPage from "@/components/pages/calendar-page.jsx";

const routes = [
  {
    path: "/",
    element: <CalendarPage />
  },
  {
    path: "/receipts/create",
    element: <CreateReceiptPage/>
  },
];

const Router = () => (
  <Routes>
    {
      routes.map(({path, element}) => {
        return <Route key={path} path={path} element={element}/>
      })
    }
  </Routes>
);

export default Router;
