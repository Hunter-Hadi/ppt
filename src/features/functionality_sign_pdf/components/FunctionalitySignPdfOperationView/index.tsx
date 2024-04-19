import { useDraggable } from '@dnd-kit/core';
import { Box, Stack } from '@mui/material';
import { cloneDeep } from 'lodash-es';
import { FC, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import FunctionalitySignPdfSignatureModal, {
  ISignatureType,
} from './components/FunctionalitySignPdfSignatureModal';
import FunctionalitySignPdfSignTool from './components/FunctionalitySignPdfSignatureView';

export const FunctionalitySignPdfOperationDraggable: FC<{
  id: string;
  disabled?: boolean;
  isPdfDrag: boolean;
  children: React.ReactNode;
  data?: { type: string; value: string };
}> = ({ id, data, children, disabled }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: { id: uuidV4(), ...data },
    disabled: disabled,
  });

  return (
    <Box ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </Box>
  );
};

interface IFunctionalitySignPdfOperationView {}
const FunctionalitySignPdfOperationView: FC<
  IFunctionalitySignPdfOperationView
> = () => {
  const currentIndex = 0;
  const [open, setOpen] = useState(false);

  const [signatureViewList, setSignatureViewList] = useState<
    {
      type: string;
      valueList: string[];
    }[]
  >([
    {
      type: 'input',
      valueList: [],
    },
  ]);
  const onCreateSignatureValue = (type: ISignatureType, value: string) => {
    //只做了第一个显示
    signatureViewList[currentIndex] = {
      type: 'input',
      // valueList: [...signatureViewList[currentIndex].valueList, value],
      valueList: [value], //测试demo写死
    };
    setSignatureViewList(cloneDeep(signatureViewList));
  };
  return (
    <Stack flexDirection='column'>
      <Box
        onClick={() => {
          console.log('open');
          setOpen(true);
        }}
      >
        <FunctionalitySignPdfSignTool
          dragId={'draggable-one'}
          valueList={signatureViewList[currentIndex].valueList}
        />
      </Box>
      {open && (
        <FunctionalitySignPdfSignatureModal
          onClose={() => setOpen(false)}
          onCreate={onCreateSignatureValue}
        />
      )}
    </Stack>
  );
};
export default FunctionalitySignPdfOperationView;
