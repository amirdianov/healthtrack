import {createWithEqualityFn} from "zustand/traditional"
import {shallow} from "zustand/shallow"
import {devtools} from "zustand/middleware"

const useReceiptStore = createWithEqualityFn()(devtools(
  (set, get) => ({
    receipts: [],

    addReceipt: (receipt) => set(state => ({receipts: [...state.receipts, receipt]})),
    fetchReceipts: () => set({
      receipts: JSON.parse(localStorage.getItem("receipts"))?.map((receipt) => ({
        ...receipt,
        start_date: new Date(receipt.start_date),
        end_date: receipt.end_date ? new Date(receipt.end_date) : null,
      })) || []
    }),
    saveReceipts: () => localStorage.setItem("receipts", JSON.stringify(get().receipts)),
  }),
  shallow
))

export default useReceiptStore;
