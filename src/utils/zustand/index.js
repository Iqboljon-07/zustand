import { create } from "zustand";

const useStore = create((set) => ({
  datas: [],

  createData: (item) => set((state) => ({ datas: [...state.datas, item] })),
  handleDelete: (id) =>
    set((state) => ({
      datas: state.datas.filter((val) => val.id !== id),
    })),
  changeData: (id, data) =>
    set((state) => ({
      datas: state.datas.map((val) => (val.id === id ? data : val)),
    })),
}));

export default useStore;
