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
  // return (
  //   <ImageList
  //     sx={{
  //       width: '100%',
  //       maxHeight: 700,
  //       minHeight: 300,
  //       bgcolor: '#fafafa',
  //     }}
  //     cols={pageCols}
  //     gap={1}
  //   >
  //     {imageList.map((image, index) => (
  //       <ImageListItem
  //         key={image.id}
  //         onClick={() => onClickImage(image)}
  //         sx={{
  //           padding: 1,
  //           cursor: 'pointer',
  //           backgroundColor: 'rgba(255,255,255,0.3)',
  //           '&:hover': {
  //             backgroundColor: '#f0eded',
  //           },
  //           position: 'relative',
  //           display: 'flex',
  //           direction: 'column',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <img
  //           style={{
  //             objectFit: 'contain',
  //           }}
  //           srcSet={image.imageUrlString}
  //           src={image.imageUrlString}
  //           loading='lazy'
  //           alt={`image-${index + 1}`}
  //         />
  //         <Typography
  //           variant='custom'
  //           sx={{
  //             fontSize: 14,
  //             marginTop: 1,
  //           }}
  //         >
  //           {index + 1}
  //         </Typography>
  //         {isImageSelect && (
  //           <Box
  //             sx={{
  //               position: 'absolute',
  //               top: 0,
  //               right: 0,
  //             }}
  //           >
  //             <Checkbox checked={image.isSelect} />
  //           </Box>
  //         )}
  //       </ImageListItem>
  //     ))}
  //   </ImageList>
  // );
};
export default FunctionalityImageList;
