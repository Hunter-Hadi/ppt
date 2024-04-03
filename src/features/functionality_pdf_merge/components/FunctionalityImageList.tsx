import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';

import FunctionalityIcon from './FunctionalityIcon';

interface IFunctionalityImageData {
  id: string;
  imageUrlString: string;
  name: string;
}
interface IFunctionalityImageList {
  pageCols: number;
  imageList: IFunctionalityImageData[];
  isImageSelect: boolean;
  onDelete: (id: string) => void;
}

const FunctionalityImageList: FC<IFunctionalityImageList> = ({
  imageList,
  pageCols = 5,
  isImageSelect = true,
  onDelete,
}) => {
  return (
    <Grid container item justifyContent='center' my={3}>
      {imageList.map((image, index) => (
        <Box
          key={image.id}
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
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: 150,
          }}
        >
          <img
            style={{
              objectFit: 'contain',
              width: '100%',
            }}
            srcSet={image.imageUrlString}
            src={image.imageUrlString}
            loading='lazy'
            alt={`image-${index + 1}`}
          />
          <Typography
            variant='custom'
            sx={{
              fontSize: 10,
              marginTop: 1,
            }}
          >
            {image.name}
          </Typography>
          {isImageSelect && (
            <Box
              onClick={() => onDelete(image.id)}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              <FunctionalityIcon name='CloseTwoTone' />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
};
export default FunctionalityImageList;
