export const COOLDOWN_KEY = 'otp_cooldown';
export const COOLDOWN_DURATION = 60; // 60 seconds

// Calculate remaining time from localStorage
export const getRemainingTime = (): number => {
  //   if (typeof window === 'undefined') return 0;

  const storedTime = localStorage.getItem(COOLDOWN_KEY);
  if (!storedTime) return 0;

  const elapsedSeconds = Math.floor(
    (Date.now() - parseInt(storedTime, 10)) / 1000,
  );
  const remaining = COOLDOWN_DURATION - elapsedSeconds;
  return remaining > 0 ? remaining : 0;
};
