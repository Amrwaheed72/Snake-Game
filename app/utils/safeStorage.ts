class SafeStorage {
  private memoryStorage: Map<string, string> = new Map();
  private isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable = this.checkLocalStorage();
  }

  private checkLocalStorage(): boolean {
    try {
      const testKey = "__storage_test__";
      localStorage.setItem(testKey, "test");
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn("localStorage is not available, using memory storage");
      return false;
    }
  }

  getItem(key: string): string | null {
    try {
      if (this.isLocalStorageAvailable) {
        return localStorage.getItem(key);
      }
      return this.memoryStorage.get(key) ?? null;
    } catch (e) {
      console.error("Error reading from storage:", e);
      return this.memoryStorage.get(key) ?? null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      if (this.isLocalStorageAvailable) {
        localStorage.setItem(key, value);
      }
      // Always keep in memory as backup
      this.memoryStorage.set(key, value);
    } catch (e) {
      console.error("Error writing to storage:", e);
      // Fallback to memory only
      this.memoryStorage.set(key, value);
    }
  }

  removeItem(key: string): void {
    try {
      if (this.isLocalStorageAvailable) {
        localStorage.removeItem(key);
      }
      this.memoryStorage.delete(key);
    } catch (e) {
      console.error("Error removing from storage:", e);
      this.memoryStorage.delete(key);
    }
  }

  clear(): void {
    try {
      if (this.isLocalStorageAvailable) {
        localStorage.clear();
      }
      this.memoryStorage.clear();
    } catch (e) {
      console.error("Error clearing storage:", e);
      this.memoryStorage.clear();
    }
  }
}

// Export singleton instance
export const safeStorage = new SafeStorage();
