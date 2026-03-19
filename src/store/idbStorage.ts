/**
 * komplet funkcji do operacji na bazie danych IndexedDB
 */

import { get, set, del } from "idb-keyval";

// Pomocnik do obsługi asynchronicznego IndexedDB
export const idbStorage = {
  async getItem(name: string): Promise<string | null> {
    const value = await get<string>(name);
    return value ?? null;
  },

  async setItem(name: string, value: string): Promise<void> {
    await set(name, value);
  },

  async removeItem(name: string): Promise<void> {
    await del(name);
  },
};