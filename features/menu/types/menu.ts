export interface Ingredient {
  id?: string;
  ingredientName: string;
  weightPerPortion: number;
  unit: string;
  notes?: string | null;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  servingSize: number;
  active: boolean;
  ingredients: Ingredient[];
  createdAt: string;
  updatedAt: string;
}
