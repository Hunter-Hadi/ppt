// import {
//   getDocument,
//   GlobalWorkerOptions,
//   PDFDocumentLoadingTask,
//   PDFDocumentProxy,
// } from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react'
import { pdfjs } from 'react-pdf'

import { fileToUInt8Array } from '@/features/functionality_common/utils/functionalityCommonFileToUInt8Array'

import { createRollingPageLoadTask } from '../utils/createRollingPageLoadTask'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()
//采用CDN形势引入pdfjs workerSrc ，似乎速度会快一点，并且不会卡线程

const pdfPageClarity = 3 //越大越清晰，但是性能会下降
//里面是读取PDF的展示内容和文字，由于最开始的思路错误设计问题，这里的逻辑有点复杂
//第一次PDF加载和后面的滚动虚拟加载逻辑都在里面
const useChatPdfContainerGetInfo = (props: { pdfFile: File }) => {
  const [errorMessage, setErrorMessage] = useState<string>('') //pdf总页数
  const isInitData = useRef(false)

  const [pdfDocument, setPdfDocument] = useState<any | undefined>(undefined)
  const [pdfTextContentList, setPdfTextContentList] = useState<any[]>([])
  const currentPdfDocument = useRef<any | null>(null) //文件
  const [pdfNumPages, setPDFNumPages] = useState<number>(0) //pdf总页数
  const [loadingProgress, setLoadingProgress] = useState<number>(0) //pdf总页数

  const currentRollingPageLoadTask = useRef<any | null>(null) //当前加载任务分配器
  const [pdfInfoList, setPdfInfoList] = useState<any[]>([])
  const [pdfSizeList, setPdfSizeList] = useState<
    {
      width: number
      height: number
    }[]
  >([])
  const pdfIsLoadingObj = useRef<{ [key in string]: boolean }>({}) //pdf页面加载状态
  const [chatPdfStatus, setChatPdfStatus] = useState<
    'loading' | 'getFileError' | 'getFileSuccess'
  >('loading')

  const getFilePdfDocument = async (pdfFile: File) => {
    //根据文件获取PdfDocument开始显示
    try {
      // setIsPdfLoading(true);
      const currentPdfUint8Array = await fileToUInt8Array(pdfFile)
      const pdfDocument = await pdfjs.getDocument(currentPdfUint8Array).promise
      if (pdfDocument) {
        currentPdfDocument.current = pdfDocument
        setPdfDocument(pdfDocument)
        const pdfNumPages = pdfDocument.numPages
        setPDFNumPages(pdfNumPages)
        // setIsPdfLoading(false);
        setChatPdfStatus('getFileSuccess')
      } else {
        // setIsPdfLoading(false);
      }
    } catch (e: any) {
      if (e.message) {
        setErrorMessage(e.message)
      }
      setChatPdfStatus('getFileError')
    }
  }

  const onReadPDF = async (pdfFile: File) => {
    try {
      getFilePdfDocument(pdfFile)
    } catch (e) {
      setChatPdfStatus('getFileError')
    }
  }

  useEffect(() => {
    if (isInitData.current) return
    isInitData.current = true
    console.log('pdfFileInit')
    onReadPDF(props.pdfFile)
  }, [])

  //根据虚拟滚动加载数据，用户滚动的位置开始加载
  const onLoadRangeData = (startIndex, stopIndex) => {
    try {
      if (currentRollingPageLoadTask.current) {
        currentRollingPageLoadTask.current.cancel()
      }
      currentRollingPageLoadTask.current = createRollingPageLoadTask(
        pdfSizeList,
        startIndex,
        stopIndex,
        (index, isActive) => {
          pdfIsLoadingObj.current[index] = isActive
        },
        async (index) => {
          if (currentPdfDocument.current) {
            try {
              const page = await currentPdfDocument.current.getPage(index + 1)
              page.getTextContent()
              const viewport = page.getViewport({ scale: pdfPageClarity })
              const textContent = await page.getTextContent()
              setPdfInfoList((prev) => {
                let newList = [...prev]
                if (newList.length === 0) {
                  //第一次拿数据默认渲染全部的高度宽度信息，让虚拟滚动可以正常加载
                  newList = Array.from({ length: pdfNumPages }, (_, index) => {
                    return {
                      pdfIndex: index,
                      width: viewport.width / pdfPageClarity,
                      height: viewport.height / pdfPageClarity,
                    }
                  })
                }
                newList[index] = {
                  pdfIndex: index + 1,
                  page,
                  textContent,
                  viewport,
                  width: viewport.width / pdfPageClarity,
                  height: viewport.height / pdfPageClarity,
                }
                return newList
              })
            } catch (e) {
              console.error('loadPage async error', e)
            }
          }
        },
      )
      currentRollingPageLoadTask.current.start()
    } catch (e) {
      console.log('pdfchat onLoadRangeData error:', e)
    }
  }
  return {
    pdfIsLoadingObj,
    onReadPDF,
    onLoadRangeData: (startIndex, stopIndex) =>
      onLoadRangeData(startIndex, stopIndex),
    pdfNumPages,
    pdfInfoList,
    pdfDocument,
    pdfTextContentList,
    loadingProgress,
    chatPdfStatus,
    errorMessage,
  }
}
export default useChatPdfContainerGetInfo
