type InstructionFieldProps = {
  step: number
  onRemove: () => void
  canRemove: boolean
}

export function InstructionField({
  step,
  onRemove,
  canRemove,
}: InstructionFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Step {step}</label>

        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          className="text-sm text-gray-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Remove
        </button>
      </div>

      <textarea
        name="instruction"
        placeholder={`Describe step ${step}`}
        className="min-h-24 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
      />
    </div>
  )
}
