export class MockLocalStorage {
  store: Record<string, string> = {};

  getItem(key: string) {
    return this.store[key];
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }
}
