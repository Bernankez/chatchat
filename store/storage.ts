import { PersistStorage } from "zustand/middleware";
import { get, set, del, createStore as _createStore, UseStore } from "idb-keyval";
import superjson from "superjson";

let globalStore: UseStore | undefined;

export function createStore() {
  return _createStore("chatchat", "store");
}

export function createStorage<T = any>() {
  const store = createStore();
  if (!globalStore) {
    globalStore = store;
  }

  const IndexedDBStorage: PersistStorage<T> = {
    getItem: async (name) => {
      const res = await get(name, globalStore);
      if (!res) return null;
      return superjson.parse(res);
    },
    setItem: async (name, value) => {
      await set(name, superjson.stringify(value), globalStore);
    },
    removeItem: async (name) => {
      await del(name, globalStore);
    },
  };

  return IndexedDBStorage;
}
