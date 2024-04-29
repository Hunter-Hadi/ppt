import { Box, Button, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';

import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';

import { changeImageColor } from '../../utils/colorTools';
import FunctionalitySignPdfColorButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfColorButtonPopover';
// 定义通过ref暴露的方法的接口
export interface IFunctionalitySignPdfSignatureUploadHandles {
  getPngBase64: () => string;
}
interface IFunctionalitySignPdfOperationSignatureUploadProps {
  bottomView: (isInput: boolean) => React.ReactNode;
}
/**
 * 上传图片签名
 */
const FunctionalitySignPdfOperationSignatureUpload: ForwardRefRenderFunction<
  IFunctionalitySignPdfSignatureUploadHandles,
  IFunctionalitySignPdfOperationSignatureUploadProps
> = ({ bottomView }, ref) => {
  const { t } = useTranslation();

  const [imgVal, setImgVal] = useState('');
  useImperativeHandle(ref, () => ({
    getPngBase64: () => imgVal,
  }));
  const onSelectedColor = (color: string) => {
    try {
      const base64 = imgVal;

      // 创建一个新的Image对象
      const img = new Image();

      // 设置图片加载成功后的操作
      img.onload = function () {
        // 创建一个Canvas元素
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        // 获取Canvas的2D绘图上下文
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // 将Image绘制到Canvas上
          ctx.drawImage(img, 0, 0);
          // 读取整个画布的像素数据
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          imageData = changeImageColor(imageData, color);

          // 将修改后的像素数据写回画布
          ctx.putImageData(imageData, 0, 0);

          // 现在，将画布转换为Base64格式，并设置到imgVal
          const base64 = canvas.toDataURL('image/png');
          setImgVal(base64);
        }
      };

      // 设置Image对象的source为Base64字符串
      img.src = base64;
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeImgSvg = (file: File) => {
    try {
      if (file) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          if (context) {
            // 渲染彩色图像
            context.drawImage(img, 0, 0);

            // 获取图像数据
            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height,
            );
            const data = imageData.data;

            // 统计黑色和白色像素数量
            let blackCount = 0;
            let whiteCount = 0;

            for (let i = 0; i < data.length; i += 4) {
              const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
              const color = avg < 128 ? 255 : 0;

              if (color === 0) {
                blackCount++; // 统计黑色像素数量
                data[i + 3] = 255; // 黑色像素保持不透明
              } else {
                whiteCount++; // 统计白色像素数量
                data[i + 3] = 0; // 把原本应该是白色的像素设置成透明
              }

              data[i] = data[i + 1] = data[i + 2] = color;
            }

            // 判断是否需要进行黑白互换
            if (blackCount > whiteCount) {
              for (let i = 0; i < data.length; i += 4) {
                // 黑白互换。由于我们想保留黑色部分，现在实际白色（已经变成透明）的像素需要变黑，
                // 而原本的黑色像素（如果进行互换）则需要变成透明。
                if (data[i] === 0) {
                  // 原本是黑色，现在需要变透明
                  data[i] = data[i + 1] = data[i + 2] = 255; // 更改颜色为白色（虽然它会是透明的）
                  data[i + 3] = 0; // 设置成透明
                } else {
                  // 原本是透明的，现在需要变成不透明的黑色
                  data[i] = data[i + 1] = data[i + 2] = 0; // 更改颜色为黑色
                  data[i + 3] = 255; // 设置成不透明
                }
              }
            } else {
              // 如果不需要互换，则直接将原本计划为白色的像素设置为透明
              for (let i = 0; i < data.length; i += 4) {
                if (data[i] === 255) {
                  // 是白色，现在应该变透明
                  data[i + 3] = 0; // 设置成透明
                }
              }
            }

            // 将图像数据重新绘制到画布上
            context.putImageData(imageData, 0, 0);

            // 将图像转换为base64格式
            const base64 = canvas.toDataURL('image/png');
            setImgVal(base64);
          }
        };

        img.src = URL.createObjectURL(file);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onUploadFile = (files: FileList) => {
    if (files.length > 0) {
      onChangeImgSvg(files[0]);
    }
  };
  const handleUnsupportedFileTypeTip = () => {};
  return (
    <Box>
      <Stack direction='row' mb={1} gap={1}>
        <FunctionalitySignPdfColorButtonPopover
          onSelectedColor={onSelectedColor}
        />
      </Stack>
      <Box
        sx={{
          bgcolor: '#fafafa',
          position: 'relative',
        }}
      >
        {imgVal && (
          <img
            style={{ objectFit: 'contain', width: '100%', height: 200 }}
            src={imgVal}
          />
        )}
        {!imgVal && (
          <FunctionalityCommonUploadButton
            themeColor='white'
            isShowUploadIcon={false}
            contentBoxSx={{
              height: 200,
            }}
            inputProps={{
              multiple: true,
              accept: 'image/*',
            }}
            onChange={onUploadFile}
            handleUnsupportedFileType={handleUnsupportedFileTypeTip}
            buttonTitle={t(
              'functionality__sign_pdf:components__sign_pdf__operation_signature_upload__upload_btn_title',
            )}
            dropDescription={t(
              'functionality__sign_pdf:components__sign_pdf__operation_signature_upload__upload_drop_description',
            )}
          />
        )}
        <Stack
          sx={{
            borderTop: '1px solid #e8e8e8',
            p: 1,
          }}
          direction='row-reverse'
        >
          <Button disabled={!imgVal} onClick={() => setImgVal('')}>
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__clear',
            )}
          </Button>
        </Stack>
      </Box>
      {bottomView(!imgVal)}
    </Box>
  );
};
export default forwardRef(FunctionalitySignPdfOperationSignatureUpload);
