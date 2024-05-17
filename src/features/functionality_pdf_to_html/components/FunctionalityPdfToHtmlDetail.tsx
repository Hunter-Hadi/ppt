import { Box, CircularProgress, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload';
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex';
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool';
import { convertPdfToHTMLDivElement } from '@/features/functionality_pdf_to_html/utils/convertPdfToHTML';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

interface IFunctionalityPdfToHtmlDetail {
  file: File;
  onRemoveFile: () => void;
}

const FunctionalityPdfToHtmlDetail: FC<IFunctionalityPdfToHtmlDetail> = ({
  file,
  onRemoveFile,
}) => {
  const { t } = useTranslation();
  const isReadFile = useRef(false);
  const [fileName, setFileName] = useState<string>('');
  const [htmlString, setHtmlString] = useState<string | null>(null); //生成的HTML 字符串数据，等用户点下载
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pdfTotalPages, setPdfTotalPages] = useState<number>(0); //总页数
  const [currentPdfActionNum, setCurrentPdfActionNum] = useState<number>(0); //当前加载页数
  const onUploadFile = async (fileList: FileList) => {
    setIsLoading(true);
    if (fileList[0]) {
      //去除文件名后缀
      const fileName = functionalityCommonFileNameRemoveAndAddExtension(
        fileList[0]?.name || '',
        'pdf',
        '',
        '',
      );
      setFileName(fileName);

      const htmlString = await convertPdfToHTMLDivElement(
        fileList[0],
        (allPage: number, currentNum: number) => {
          setPdfTotalPages(allPage);
          setCurrentPdfActionNum(currentNum);
        },
      );
      if (htmlString) {
        setHtmlString(htmlString);
      } else {
        functionalityCommonSnackNotifications(
          `${file.name} ${t(
            'functionality__common:components__common__pdf_encryption_tip',
          )}`,
        );
      }
      setPdfTotalPages(0);
      setCurrentPdfActionNum(0);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (isReadFile.current) {
      return;
    }
    isReadFile.current = true;
    onUploadFile([file] as unknown as FileList);
  }, [file]);
  const downloadHtml = useCallback(() => {
    if (htmlString) {
      downloadUrl(
        htmlString,
        `${fileName}(Powered by MaxAI).html`,
        'text/html',
      );
    }
  }, [htmlString, fileName]);
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__pdf_to_html:components__pdf_to_html__button__download',
          ),
          variant: 'contained',
          disabled: isLoading,
          onClick: downloadHtml,
        },
      },
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__pdf_to_html:components__pdf_to_html__button__convert',
          ),
          variant: 'outlined',
          disabled: isLoading,
          color: 'error',
          onClick: () => {
            setHtmlString(null);
            onRemoveFile();
          },
        },
      },
    ],
    [isLoading, downloadHtml, t],
  );
  const BoxViewWrap = useCallback(
    (props) => (
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          minHeight: 200,
          pt: 10,
        }}
      >
        {props.children}
      </Box>
    ),
    [],
  );
  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      {!htmlString && !isLoading && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: false,
          }}
          onChange={onUploadFile}
        />
      )}
      {htmlString && (
        <BoxViewWrap>
          <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
        </BoxViewWrap>
      )}
      {isLoading && (
        <BoxViewWrap>
          <Stack
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            sx={{
              position: 'absolute',
              top: 10,
              left: 0,
              right: 15,
              bottom: 0,
              bgcolor: 'rgba(255,255,255,0.3)',
            }}
          >
            <CircularProgress />
            {pdfTotalPages > 0 ? `${currentPdfActionNum}/${pdfTotalPages}` : ''}
          </Stack>
        </BoxViewWrap>
      )}
    </Stack>
  );
};
export default FunctionalityPdfToHtmlDetail;
