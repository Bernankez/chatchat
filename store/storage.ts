import { StateStorage } from "zustand/middleware";
import { get, set, del, createStore as _createStore, UseStore } from "idb-keyval";

let globalStore: UseStore | undefined;

export function createStore() {
  return _createStore("chatchat", "globalStore");
}

export function createStorage() {
  const store = createStore();
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
