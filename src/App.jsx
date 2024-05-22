import "./App.css"
import Navbar from "@/components/navbar.jsx";
import React, {useEffect} from "react";
import useReceiptStore from "@/stores/receipt-store.js";
import Router from "@/router.jsx";
import {Toaster} from "@/components/ui/toaster.jsx";
import useMedicineStore from "@/stores/medicine-store.js";

function App() {
  const {fetchReceipts, saveReceipts, receipts} = useReceiptStore(
    ({fetchReceipts, saveReceipts, receipts}) => ({fetchReceipts, saveReceipts, receipts})
  );
  const {fetchMedicines, saveMedicines, medicines} = useMedicineStore(
    ({fetchMedicines, saveMedicines, medicines}) => ({fetchMedicines, saveMedicines, medicines})
  );

  useEffect(() => {
    fetchReceipts();
  }, []);

  useEffect(() => {
    saveReceipts();
  }, [receipts]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    saveMedicines();
  }, [medicines]);

  return (
    <>
      <Navbar/>
      <Router/>
      <Toaster/>
    </>
  )
}

export default App
