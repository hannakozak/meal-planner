type IngredientRowProps = {
  onRemove: () => void
  canRemove: boolean
}

export function IngredientRow({ onRemove, canRemove }: IngredientRowProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr_auto]">
      <input
        name="ingredientName"
        placeholder="Ingredient name"
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500"
      />

      <input
        name="ingredientQuantity"
        type="number"
        step="0.01"
        placeholder="Qty"
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500"
      />

      <input
        name="ingredientUnit"
        placeholder="Unit"
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500"
      />

      <input
        name="ingredientNote"
        placeholder="Note"
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500"
      />

      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        className="rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Remove
      </button>
    </div>
  )
}
