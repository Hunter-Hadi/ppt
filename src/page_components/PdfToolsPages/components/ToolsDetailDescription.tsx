import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

import { IToolsDetailDescriptionInfoProps } from '../constant/toolsDetailDescriptionData';
import ToolsIcon from './ToolsIcon';
interface IToolsDetailDescriptionProps {
  descriptionInfo: IToolsDetailDescriptionInfoProps;
}
const ToolsDetailDescription: FC<IToolsDetailDescriptionProps> = ({
  descriptionInfo,
}) => {
  const { t } = useTranslation();
  const getTranslation = (key: string) => {
    return t(key, descriptionInfo.i18nVariables);
  };
  return (
    <Box
      sx={{
        borderTop: '1px solid #e8e8e8',
        pt: 3,
      }}
    >
      {/* 顶部 */}
      <Grid container gap={1} justifyContent='space-between'>
        <Grid item xs={12} sm={6} lg={7}>
          <Typography
            color='text.secondary'
            sx={{
              fontSize: {
                xs: 16,
                lg: 18,
              },
            }}
          >
            {getTranslation(descriptionInfo.topFeatures)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5} lg={4}>
          {descriptionInfo.userExperienceList.map((item, index) => (
            <Stack pb={1} key={index} alignItems='center' direction='row'>
              <ToolsIcon name='CheckCircle' color='success' />
              <Typography
                color='text.secondary'
                sx={{
                  fontSize: {
                    xs: 14,
                    lg: 16,
                  },
                  ml: 1,
                }}
              >
                {getTranslation(item)}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Grid>
      {/* 中间 */}
      <Grid container gap={1} justifyContent='space-between'>
        {descriptionInfo.functionIntroductionList.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={5}
            lg={3}
            key={index}
            sx={{
              mt: 8,
            }}
          >
            <Stack display='flex' direction='column' alignItems='center'>
              <ToolsIcon name={item.iconName} fontSize='large' color='action' />
              <Typography
                sx={{
                  fontSize: {
                    xs: 14,
                    lg: 16,
                    fontWeight: 700,
                  },
                  mt: 2,
                  color: 'text.primary',
                  textAlign: 'center',
                }}
              >
                {getTranslation(item.title)}
              </Typography>
              <Typography
                color='text.secondary'
                sx={{
                  fontSize: {
                    xs: 14,
                    lg: 16,
                  },
                  mt: 2,
                  textAlign: 'center',
                }}
              >
                {getTranslation(item.description)}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
      {/* 底部 */}
      <Grid
        container
        mt={10}
        borderTop='1px solid #e8e8e8'
        justifyContent='center'
      >
        {/* 图标格，当屏幕尺寸是sm或更大时保持在左侧，否则在下方 */}
        <Grid
          item
          xs={12}
          sm={5}
          lg={5}
          mb={1}
          display='flex'
          justifyContent='center'
          alignItems='center'
          sx={{
            order: { xs: 2, sm: 1 }, // xs时图案在文字下方
            fontSize: { xs: 260, sm: 200 }, // xs时图案更大
          }}
        >
          <ToolsIcon
            name={descriptionInfo.operatingInstructions.iconName}
            color='primary'
            sx={{ fontSize: 'inherit' }} // 使用Grid级别的font size调整大小
          />
        </Grid>

        {/* 文字内容格，当屏幕尺寸是sm或更大时保持在右侧，否则在上方 */}
        <Grid
          item
          xs={12}
          lg={5}
          sm={5}
          my={10}
          sx={{
            order: { xs: 1, sm: 2 }, // xs时文字在图案上方
          }}
        >
          <Stack direction='column'>
            <Typography
              color='text.primary'
              sx={{
                fontSize: {
                  xs: 20,
                  lg: 22,
                },
                fontWeight: 700,
              }}
            >
              {getTranslation(
                descriptionInfo.operatingInstructions.operationSteps.title,
              )}
            </Typography>
            {descriptionInfo.operatingInstructions.operationSteps.descriptionList.map(
              (item, index) => (
                <Typography
                  key={index}
                  color='text.secondary'
                  sx={{
                    fontSize: { xs: 14, lg: 16 },
                    mt: 1,
                  }}
                >
                  {`${index + 1}. ${getTranslation(item)}`}
                </Typography>
              ),
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ToolsDetailDescription;
