export interface DashboardSummary {
  totalActiveBatches: number;
  totalActiveWeight: number;
  ingredientSummaries: IngredientSummary[];
  storageLocationSummaries: StorageLocationSummary[];
  freshnessStatusSummaries: FreshnessStatusSummary[];
}

export interface IngredientSummary {
  ingredientName: string;
  batchCount: number;
  totalWeight: number;
}

export interface StorageLocationSummary {
  location: string;
  batchCount: number;
}

export interface FreshnessStatusSummary {
  status: "GREEN" | "YELLOW" | "RED"; 
  count: number;
}
