import { Box, Checkbox, Grid } from '@mui/material';
import { FC } from 'react';

import FunctionalityImage from '@/features/functionality_common/components/FunctionalityImage';

interface IFunctionalityImageData {
  id: string;
  imageUrlString: string;
  isSelect: boolean;
}
interface IFunctionalityImageList {
  scale?: number;
  imageList: IFunctionalityImageData[];
  onClickImage: (image: IFunctionalityImageData) => void;
}

const FunctionalityImageList: FC<IFunctionalityImageList> = ({
  imageList,
  scale = 2,
  onClickImage,
}) => {
  let imageSize = scale * 50;
  return (
    <Grid
      container
      item
      justifyContent='center'
      my={3}
      gap={2}
      sx={{
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: 700,
        minHeight: 200,
      }}
    >
      {imageList.map((imageInfo, index) => (
        <FunctionalityImage
          key={imageInfo.id}
          name={String(index + 1)}
          imageInfo={imageInfo}
          imageSize={imageSize}
          onClick={() => onClickImage(imageInfo)}
          rightTopChildren={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Checkbox checked={imageInfo.isSelect} />
            </Box>
          }
        />
      ))}
    </Grid>
  );
};
export default FunctionalityImageList;
