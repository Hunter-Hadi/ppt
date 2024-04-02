import {
  Box,
  Checkbox,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { FC } from 'react';

interface IToolBoxFunctionalityImageData {
  id: string;
  imgString: string;
  isSelect: boolean;
}
interface IToolBoxFunctionalityImageList {
  pageCols: number;
  imageList: IToolBoxFunctionalityImageData[];
  isImgSelect: boolean;
  onClickImg: (image: IToolBoxFunctionalityImageData) => void;
}

const ToolBoxFunctionalityImageList: FC<IToolBoxFunctionalityImageList> = ({
  imageList,
  pageCols = 5,
  isImgSelect = true,
  onClickImg,
}) => {
  return (
    <ImageList
      sx={{
        width: '100%',
        maxHeight: 700,
        minHeight: 300,
        bgcolor: '#fafafa',
      }}
      cols={pageCols}
      gap={1}
    >
      {imageList.map((image, index) => (
        <ImageListItem
          key={image.id}
          onClick={() => onClickImg(image)}
          sx={{
            padding: 1,
            cursor: 'pointer',
            backgroundColor: 'rgba(255,255,255,0.3)',
            '&:hover': {
              backgroundColor: '#f0eded',
            },
            position: 'relative',
            display: 'flex',
            direction: 'column',
            alignItems: 'center',
          }}
        >
          <img
            style={{
              objectFit: 'contain',
            }}
            srcSet={image.imgString}
            src={image.imgString}
            loading='lazy'
            alt={`image-${index + 1}`}
          />
          <Typography
            variant='custom'
            sx={{
              fontSize: 14,
              marginTop: 1,
            }}
          >
            {index + 1}
          </Typography>
          {isImgSelect && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              <Checkbox checked={image.isSelect} />
            </Box>
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};
export default ToolBoxFunctionalityImageList;
