import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';
const FunctionalitySignPdfSignaturePad = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current === null) return;
    const signaturePad = new SignaturePad(canvasRef.current, {
      minWidth: 2, // 设置线条的最小宽度为2
      maxWidth: 5, // 设置线条的最大宽度为5
    });
    console.log('simply signaturePad', signaturePad);
  }, [canvasRef]);
  return (
    <Box
      sx={{
        bgcolor: '#fafafa',
      }}
    >
      <canvas
        id='functionality-sign-pdf-signature-pad'
        ref={canvasRef}
        width='600'
        height='200'
      ></canvas>
    </Box>
  );
};
export default FunctionalitySignPdfSignaturePad;
