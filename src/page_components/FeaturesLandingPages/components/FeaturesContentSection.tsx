import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';
import CTAInstallButton from '@/page_components/CTAInstallButton';
import FeaturesLandingIcons from '@/page_components/FeaturesLandingPages/components/FeaturesLandingIcons';
import PictureRetouchingIcon, {
  IPictureRetouchingProps,
} from '@/page_components/FeaturesLandingPages/components/PictureRetouchingIcon';

interface IProps {
  icon: string;
  title: string;
  description: React.ReactNode;
  imageUrl: string;

  textWithImageLayout?: 'textToImage' | 'imageToText';

  pictureRetouchingDirection?: false | IPictureRetouchingProps['direction'];
}
const FeaturesContentSection: FC<IProps> = ({
  icon,
  title,
  description,
  imageUrl,
  textWithImageLayout = 'textToImage',
  pictureRetouchingDirection = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const textBoxOrder = useMemo(() => {
    if (isDownSm) {
      return 1;
    }
    return textWithImageLayout === 'textToImage' ? 1 : 2;
  }, [textWithImageLayout, isDownSm]);

  const imageBoxOrder = useMemo(() => {
    if (isDownSm) {
      return 2;
    }
    return textWithImageLayout === 'textToImage' ? 2 : 1;
  }, [textWithImageLayout, isDownSm]);

  return (
    <Box
      py={{
        xs: 6,
        md: 9,
      }}
    >
      <Box maxWidth={1312} mx='auto' px={4}>
        <Grid container alignItems='center' spacing={12}>
          <Grid item xs={12} sm={6} order={textBoxOrder}>
            <Stack height={'100%'} justifyContent='center'>
              <Box
                sx={{
                  color: 'primary.main',
                  fontSize: 24,
                  width: 'max-content',
                  lineHeight: 0,
                  borderRadius: '50%',
                  bgcolor: '#F4EBFF',
                  p: 1.5,
                }}
              >
                <FeaturesLandingIcons icon={icon} />
              </Box>
              <Typography
                variant='custom'
                fontSize={32}
                fontWeight={700}
                mt={2}
              >
                {title}
              </Typography>
              {typeof description === 'string' ? (
                <Typography
                  variant='custom'
                  fontSize={18}
                  color='text.secondary'
                  mt={2}
                  lineHeight={1.5}
                >
                  {description}
                </Typography>
              ) : (
                description
              )}

              <CTAInstallButton
                sx={{
                  width: 200,
                  height: 44,
                  // borderRadius: 2,
                  fontSize: 16,
                  py: 1.5,
                  px: 2,
                  mt: 4,
                }}
                trackerLinkProps={{
                  queryRefEnable: true,
                  pathnameRefEnable: true,
                }}
                startIcon={null}
                endIcon={<ArrowForwardOutlinedIcon />}
                variant={'contained'}
                text={t('features_landing:cta_text')}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            order={imageBoxOrder}
            sx={{ position: 'relative' }}
          >
            <ResponsiveImage
              src={imageUrl}
              alt={title}
              width={1168}
              height={864}
            />
            {pictureRetouchingDirection && (
              <PictureRetouchingIcon direction={pictureRetouchingDirection} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FeaturesContentSection;
