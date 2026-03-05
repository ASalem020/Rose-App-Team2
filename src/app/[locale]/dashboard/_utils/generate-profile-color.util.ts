export const generateProfileColor = (userId: string) => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const hue = Math.abs(hash) % 360;

  return {
    base: `hsl(${hue}, 65%, 50%)`,
    background: `hsla(${hue}, 65%, 50%, 0.2)`, // ✅ valid CSS
  };
};
