import { z } from "zod";

export const ingredientBaseSchema = z.object({
  ingredientName: z.string(),
  weightPerPortion: z.coerce.number().positive(),
  unit: z.string(),
  notes: z.string().optional().nullable(),
});

export const createMenuSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  servingSize: z.number().int().positive(),
  ingredients: z.array(ingredientBaseSchema).min(1),
});

export const updateMenuSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  servingSize: z.number().int().positive(),
  active: z.boolean(),
  ingredients: z
    .array(
      ingredientBaseSchema.extend({
        id: z.string().uuid().optional(),
      })
    )
    .min(1),
});

export const ingredientResponseSchema = ingredientBaseSchema.extend({
  id: z.string().uuid(),
});

export const menuItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  servingSize: z.number().int().positive(),
  active: z.boolean(),
  ingredients: z.array(ingredientResponseSchema),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});

export type CreateMenuPayload = z.infer<typeof createMenuSchema>;
export type UpdateMenuPayload = z.infer<typeof updateMenuSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type Ingredient = z.infer<typeof ingredientResponseSchema>;

export type IngredientFormValue = z.infer<typeof ingredientBaseSchema> & {
  id?: string;
};
