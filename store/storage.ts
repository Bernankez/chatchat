import { StateStorage } from "zustand/middleware";
import { get, set, del, createStore } from "idb-keyval";

export const globalStore = createStore("chatchat", "globalStore");

export const IndexedDBStorage: StateStorage = {
  getItem: async (name) => {
    return (await get(name, globalStore)) || null;
  },
  setItem: async (name, value) => {
    await set(name, value, globalStore);
  },
  removeItem: async (name) => {
    await del(name, globalStore);
  },
};
