module.exports = {
  __esModule: true,
  default: {
    trigger: () => {
      if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
        navigator.vibrate(40);
      }
    },
  },
  trigger: () => {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate(40);
    }
  },
};
