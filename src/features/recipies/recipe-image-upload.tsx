'use client'

import { useState } from 'react'

type RecipeImageUploadProps = {
  defaultValue?: string | null
}

export function RecipeImageUpload({ defaultValue }: RecipeImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue ?? '')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    setError('')

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB.')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
      )

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()

      setImageUrl(data.secure_url)
    } catch {
      setError('Something went wrong while uploading the image.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">Recipe image</label>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Recipe preview"
          className="h-56 w-full rounded-2xl object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={isUploading}
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm"
      />

      <input type="hidden" name="imageUrl" value={imageUrl} />

      {isUploading && (
        <p className="text-sm text-gray-500">Uploading image...</p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
