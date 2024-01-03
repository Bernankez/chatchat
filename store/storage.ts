import { PersistStorage, StateStorage, StorageValue } from "zustand/middleware";
import { get, set, del, createStore as _createStore, UseStore } from "idb-keyval";
import superjson from "superjson";

let globalStore: UseStore | undefined;

export function createStore() {
  if (!globalStore) {
    globalStore = _createStore("chatchat", "store");
  }
  return globalStore;
}

export function createStorage() {
  const store = createStore();

  const IndexedDBStorage: StateStorage = {
    getItem: async (name) => {
      return (await get(name, store)) || null;
    },
    setItem: async (name, value) => {
      await set(name, value, store);
    },
    removeItem: async (name) => {
      await del(name, store);
    },
  };
  return IndexedDBStorage;
}

export function createJSONStorage<S>(getStorage: () => StateStorage) {
  let storage: StateStorage | undefined;
  try {
    storage = getStorage();
  } catch (e) {
    // prevent error if the storage is not defined (e.g. when server side rendering a page)
    return;
  }
  const persistStorage: PersistStorage<S> = {
    getItem: (name) => {
      const parse = (str: string | null) => {
        if (str === null) {
          return null;
        }
        return superjson.parse<StorageValue<S>>(str);
      };
      const res = storage!.getItem(name) ?? null;
      if (res instanceof Promise) {
        return res.then(parse);
      }
      return parse(res);
    },
    setItem: (name, value) => storage!.setItem(name, superjson.stringify(value)),
    removeItem: (name) => storage!.removeItem(name),
  };
  return persistStorage;
}
