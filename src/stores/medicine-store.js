import {createWithEqualityFn} from "zustand/traditional"
import {shallow} from "zustand/shallow"
import {devtools} from "zustand/middleware"

const useMedicineStore = createWithEqualityFn()(devtools(
  (set, get) => ({
    medicines: {},

    addMedicine: (medicine) => set(state => {
      const medicines = {...state.medicines};
      medicines[medicine.id] = medicine;

      return {medicines};
    }),
    fetchMedicines: () => set({medicines: JSON.parse(localStorage.getItem("medicines")) || {}}),
    saveMedicines: () => localStorage.setItem("medicines", JSON.stringify(get().medicines)),
  }),
  shallow
))

export default useMedicineStore;
