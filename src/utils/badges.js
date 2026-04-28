export const computeBadges = (hours) => ({
  bronze: hours >= 10,
  silver: hours >= 30,
  gold:   hours >= 60,
});
