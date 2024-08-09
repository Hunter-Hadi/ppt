import { useRef } from 'react'
import { pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()
export const useFunctionalityCommonPdfPasswordHandler = () => {
  const currentPassword = useRef<string | false | undefined>(undefined)
  const checkPDFFilePassword = async (File: File) => {
    console.log('checkPDFFilePassword', File)
    const pdfUint8Array = await File.arrayBuffer()
    try {
      const currentPdfDocument = await pdfjs.getDocument(pdfUint8Array).promise
      return currentPdfDocument
    } catch (e: any) {
      if (e.name === 'PasswordException') {
        console.log('PasswordException')
        // eslint-disable-next-line no-constant-condition
        while (true) {
          try {
            if (currentPassword.current) {
              const currentPdfDocument = await pdfjs.getDocument({
                data: pdfUint8Array,
                password: currentPassword.current,
              }).promise

              // 如果成功解析 PDF 文档，返回文档
              return currentPdfDocument
            }
          } catch (e: any) {
            if (e.name === 'PasswordException') {
              // 用户需要输入密码，这里可以让用户输入密码
              const password = prompt('此 PDF 文件受密码保护，请输入密码:')
              if (password === null) {
                // 用户取消，返回 false
                currentPassword.current = false
                return
              }
              currentPassword.current = password // 将用户输入的密码存储
            } else {
              // 其他错误处理
              console.error('未处理的错误:', e)
              throw e
            }
          }

          // 等待 5 秒后再执行下一次尝试
          await new Promise((resolve) => setTimeout(resolve, 5000))
        }
      }
    }
  }
  const checkPDFFileListPassword = async (File: FileList) => {}

  return {
    checkPDFFileListPassword,
    checkPDFFilePassword,
  }
}
