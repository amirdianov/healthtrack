import "./App.css"
import Navbar from "@/components/navbar.jsx";
import React, {useEffect} from "react";
import useReceiptStore from "@/stores/receipt-store.js";
import Router from "@/router.jsx";

function App() {
  const {fetchReceipts, saveReceipts, receipts} = useReceiptStore(
    ({addReceipt, fetchReceipts, saveReceipts, receipts}) => ({addReceipt, fetchReceipts, saveReceipts, receipts})
  );

  useEffect(() => {
    fetchReceipts();
  }, []);

  useEffect(() => {
    saveReceipts();
  }, [receipts]);


  return (
    <>
      <Navbar/>
      <Router/>
    </>
  )
}

export default App
