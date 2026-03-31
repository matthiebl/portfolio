/**
 * Compress an image file using the Canvas API and return a base64 data URL.
 * @param file    The source image file
 * @param maxWidth  Maximum width in pixels (height scales proportionally)
 * @param quality   JPEG quality 0–1
 */
export function compressImage(
  file: File,
  maxWidth: number,
  quality: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)

      const scale = Math.min(1, maxWidth / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas 2D context unavailable'))
        return
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to load image'))
    }

    img.src = objectUrl
  })
}

/**
 * Compress one file into two sizes: a small thumbnail and a larger cover.
 */
export async function compressTwoSizes(
  file: File,
): Promise<{ thumb: string; cover: string }> {
  const [thumb, cover] = await Promise.all([
    compressImage(file, 480, 0.7), // ~15–25 KB
    compressImage(file, 1200, 0.85), // ~80–150 KB
  ])
  return { thumb, cover }
}
