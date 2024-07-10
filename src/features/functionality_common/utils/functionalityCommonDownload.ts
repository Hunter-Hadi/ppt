/**
 * 传入file Uint8Array进行下载
 */
export const downloadUrl = (
  file: Uint8Array | string | Blob,
  name: string,
  type: string = 'application/pdf',
) => {
  const blob = new Blob([file], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  URL.revokeObjectURL(url)
}

export const downloadFileAsBlob = (url: string, name?: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100
        console.log(`Progress: ${percentComplete.toFixed(2)}%`)
        // Update your UI here with the progress information if needed
      }
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response
        const fileName = name || getFileNameFromUrl(url)
        const file = new File([blob], fileName, { type: blob.type })
        resolve(file)
      } else {
        reject(
          new Error(`Failed to download file: ${xhr.status} ${xhr.statusText}`),
        )
      }
    }

    xhr.onerror = () => {
      reject(new Error('Network error'))
    }

    xhr.send()
  })
}

function getFileNameFromUrl(url: string): string {
  return url.split('/').pop() || 'downloaded-file'
}
