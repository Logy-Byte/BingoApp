// jest.setup.js
// Mock react-native-url-polyfill
jest.mock('react-native-url-polyfill/auto', () => {}, { virtual: true });
jest.mock('react-native-url-polyfill', () => ({ setupURLPolyfill: () => {} }), { virtual: true });

// Mock @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock Supabase client for testing
jest.mock('./src/lib/supabase', () => {
  const mockListeners: Record<string, ((...args: any[]) => void)[]> = {};

  const createMockChannel = (channelName: string) => ({
    name: channelName,
    on: jest.fn(function(type, filter, callback) {
      const event = filter.event || type;
      if (!mockListeners[event]) mockListeners[event] = [];
      mockListeners[event].push(callback);
      return this;
    }),
    subscribe: jest.fn(function(callback) {
      if (callback) callback('SUBSCRIBED');
      return this;
    }),
    send: jest.fn(function(msg) {
      const event = msg.event;
      if (mockListeners[event]) {
        mockListeners[event].forEach((cb) => cb({ payload: msg.payload }));
      }
      return Promise.resolve();
    }),
  });

  return {
    supabase: {
      auth: {
        getSession: jest.fn(() => Promise.resolve({ data: { session: null } })),
        onAuthStateChange: jest.fn(() => ({
          data: { subscription: { unsubscribe: jest.fn() } },
        })),
        signInWithPassword: jest.fn(() => Promise.resolve({ data: { user: null }, error: null })),
        signUp: jest.fn(() => Promise.resolve({ data: { user: null }, error: null })),
        signInAnonymously: jest.fn(() => Promise.resolve({ data: { user: { id: 'guest-1' } }, error: null })),
      },
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({ data: null, error: null })),
          })),
        })),
        insert: jest.fn(() => Promise.resolve({ data: null, error: null })),
        update: jest.fn(() => Promise.resolve({ data: null, error: null })),
      })),
      channel: jest.fn((name: string) => createMockChannel(name)),
      removeChannel: jest.fn(),
    },
  };
});
