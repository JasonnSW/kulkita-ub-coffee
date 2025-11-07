import { create } from "zustand";

interface PredictionDateState {
  dateRange: { from: Date; to: Date };
  setDateRange: (range: { from: Date; to: Date }) => void;
}

export const usePredictionDate = create<PredictionDateState>((set) => ({
  dateRange: {
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  },
  setDateRange: (range) => set({ dateRange: range }),
}));
