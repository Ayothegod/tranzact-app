import { create } from "zustand";

interface LoadingState {
  process: boolean;
  setProcess: () => void;
  debtModal: boolean;
  setDebtModal: () => void;
  isCreatingDebt: boolean;
  setIsCreatingDebt: () => void;
  createCategory: boolean;
  setCreateCategory: () => void;
}

export const useProcessStore = create<LoadingState>((set) => ({
  process: false,
  setProcess: () => set((state) => ({ process: !state.process })),
  debtModal: false,
  setDebtModal: () => set((state) => ({ debtModal: !state.debtModal })),
  isCreatingDebt: false,
  setIsCreatingDebt: () =>
    set((state) => ({ isCreatingDebt: !state.isCreatingDebt })),
  createCategory: true,
  setCreateCategory: () =>
    set((state) => ({ createCategory: !state.createCategory })),
}));

//   import create from 'zustand';
// import { persist } from 'zustand/middleware';

// const useStore = create(
//   persist(
//     (set) => ({
//       count: 0,
//       increaseCount: () => set((state) => ({ count: state.count + 1 })),
//       resetCount: () => set({ count: 0 }))
//     }),
//     {
//       name: 'counter-storage', // unique name for the storage
//       getStorage: () => localStorage, // (optional) by default 'localStorage' is used
//     }
//   )
// );

// export default useStore;

// import React from 'react';
// import useStore from './store';

// function Counter() {
//   const { count, increaseCount, resetCount } = useStore();

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={increaseCount}>Increase</button>
//       <button onClick={resetCount}>Reset</button>
//     </div>
//   );
// }

// export default Counter;

// import useStore from './store';

// function clearPersistedData() {
//   localStorage.removeItem('counter-storage');
//   useStore.setState({ count: 0 });
// }

// // You can call this function from anywhere in your application to clear the persisted data
