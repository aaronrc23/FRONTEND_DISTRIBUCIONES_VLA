export const CATEGORY_LEVEL = {
    CATEGORIA: "categoria",
    SUBCATEGORIA: "subcategoria",
    ITEM: "item",
} as const;

export type CategoryLevel =
    typeof CATEGORY_LEVEL[keyof typeof CATEGORY_LEVEL];
