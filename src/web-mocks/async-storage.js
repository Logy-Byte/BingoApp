const storage = {};

const AsyncStorageMock = {
  getItem: async (key) => {
    return storage[key] !== undefined ? storage[key] : null;
  },
  setItem: async (key, value) => {
    storage[key] = value.toString();
  },
  removeItem: async (key) => {
    delete storage[key];
  },
  clear: async () => {
    for (const key in storage) {
      delete storage[key];
    }
  },
  getAllKeys: async () => {
    return Object.keys(storage);
  },
};

module.exports = {
  __esModule: true,
  default: AsyncStorageMock,
  ...AsyncStorageMock,
};
