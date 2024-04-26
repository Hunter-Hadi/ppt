import { Button, ButtonGroup, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';

import { onFabricAddObject } from '../../utils/fabricjsTools';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import { FunctionalitySignPdfOperationOBjectAtom } from '../FunctionalitySignPdfMain';
import FunctionalitySignPdfOperationSignatureModal, {
  ISignatureType,
} from '../FunctionalitySignPdfOperationView/FunctionalitySignPdfOperationSignatureModal';
import { IControlDiv } from './FunctionalitySignPdfShowPdfViewRenderCanvas';
interface IFunctionalitySignPdfShowPdfViewAddToolsPopupProps {
  controlDiv: IControlDiv;
  scaleFactor: number;
  editor: any;
  onClose: (type: string, value: string) => void;
}
const FunctionalitySignPdfShowPdfViewAddToolsPopup: FC<
  IFunctionalitySignPdfShowPdfViewAddToolsPopupProps
> = ({ controlDiv, editor, scaleFactor, onClose }) => {
  const [pdfOperationOBject, setPdfOperationOBject] = useRecoilState(
    FunctionalitySignPdfOperationOBjectAtom,
  );
  const [signatureModalOpenType, setModalSignatureOpenType] = useState<
    null | 'yourSignature' | 'yourInitials'
  >(null);

  const onAddObject = (type: string, value: string) => {
    try {
      if (!editor) return;
      const positionData = {
        left: controlDiv.left,
        top: Math.max(controlDiv.top, 0),
      };
      onFabricAddObject(editor, positionData, type, value);
      onClose(type, value);
    } catch (e) {
      console.error(e);
    }
  };
  const onCreateSignatureValue = (type: ISignatureType, value: string) => {
    //只做了第一个显示
    onAddObject('image', value);
    if (signatureModalOpenType) {
      setPdfOperationOBject({
        ...pdfOperationOBject,
        [signatureModalOpenType]: [
          value,
          ...pdfOperationOBject[signatureModalOpenType],
        ],
      });
      setModalSignatureOpenType(null);
    }
  };
  const onClickSignatureType = (type: 'yourSignature' | 'yourInitials') => {
    const pdfOperationData = pdfOperationOBject[type];
    if (pdfOperationData.length > 0) {
      onAddObject('image', pdfOperationData[pdfOperationOBject.index[type]]);
    } else {
      setModalSignatureOpenType(type);
    }
  };
  return (
    <Stack
      sx={{
        position: 'fixed',
        left: controlDiv.left * scaleFactor + controlDiv.windowLeft,
        top: controlDiv.top * scaleFactor + controlDiv.windowTop - 50,
      }}
    >
      <ButtonGroup
        variant='outlined'
        sx={{
          borderRadius: 2,
          bgcolor: '#fafafa',
          height: 40,
        }}
      >
        <Button onClick={() => onClickSignatureType('yourSignature')}>
          <FunctionalitySignPdfIcon name='TextFields' />
        </Button>
        <Button onClick={() => onClickSignatureType('yourInitials')}>
          <FunctionalitySignPdfIcon name='Abc' />
        </Button>
        <Button
          onClick={() => onAddObject('textbox', pdfOperationOBject.textField)}
        >
          <FunctionalitySignPdfIcon name='Title' />
        </Button>
        <Button
          onClick={() => onAddObject('i-text', pdfOperationOBject.dateField)}
        >
          <FunctionalitySignPdfIcon name='CalendarMonthOutlined' />
        </Button>
        <Button
          onClick={() => onAddObject('text', pdfOperationOBject.checkbox)}
        >
          <FunctionalitySignPdfIcon name='Check' />
        </Button>
      </ButtonGroup>
      {!!signatureModalOpenType && (
        <FunctionalitySignPdfOperationSignatureModal
          open={!!signatureModalOpenType}
          onClose={() => setModalSignatureOpenType(null)}
          onCreate={onCreateSignatureValue}
        />
      )}
    </Stack>
  );
};
export default FunctionalitySignPdfShowPdfViewAddToolsPopup;
