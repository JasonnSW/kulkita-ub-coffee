
export function getForecastDateRange(from?: Date, to?: Date) {
  const start = from ?? new Date();
  const end = to ?? new Date(start);
  if (!to) end.setDate(start.getDate() + 6); 

  const durationInDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  const lastFrom = new Date(start);
  lastFrom.setDate(start.getDate() - durationInDays);

  return {
    from: start,
    to: end,
    lastFrom,
    lastTo: start,
  };
}
