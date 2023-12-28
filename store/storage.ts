import { StateStorage } from "zustand/middleware";
import { get, set, del, createStore, UseStore } from "idb-keyval";

let globalStore: UseStore | undefined;

export function createStorage() {
  const store = createStore("chatchat", "globalStore");
  if (!globalStore) {
    globalStore = store;
  }

  const IndexedDBStorage: StateStorage = {
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

  return IndexedDBStorage;
}
