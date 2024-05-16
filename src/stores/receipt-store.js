import {createWithEqualityFn} from "zustand/traditional"
import {shallow} from "zustand/shallow"
import {devtools} from "zustand/middleware"

const useReceiptStore = createWithEqualityFn()(devtools(
  (set, get) => ({
    receipts: [],

    addReceipt: (receipt) => set(state => ({receipts: [...state.receipts, receipt]})),
    fetchReceipts: () => set({receipts: JSON.parse(localStorage.getItem("receipts")) || []}),
    saveReceipts: () => localStorage.setItem("receipts", JSON.stringify(get().receipts)),
  }),
  shallow
))

export default useReceiptStore;