import Stack from '@mui/material/Stack';
import React, { FC } from 'react';

import { PLAN_FEATURES_V3_DATA_ROWS } from '@/features/pricing/constant/features_v3';

import { FeatureTableColumns } from '.';
import FeaturesTableContentCell from './FeaturesTableContentCell';
import { IFeatureColumnType } from './type';

interface IProps {
  popularPlan?: IFeatureColumnType;
}

const FeaturesTableContent: FC<IProps> = ({ popularPlan }) => {
  return (
    <Stack>
      {PLAN_FEATURES_V3_DATA_ROWS.map((featureData, index) => {
        const iconSize = featureData.meta?.type === 'secondary' ? 20 : 24;
        const isDeepen = featureData.meta?.type === 'deepen';
        const rowType = featureData.meta?.type;
        return (
          <Stack
            key={`features-table-content-tr-${index}`}
            id={`features-table-content-tr-${index}`}
            direction={'row'}
            sx={{
              bgcolor: isDeepen ? '#F9FAFB' : 'transparent',
            }}
          >
            {FeatureTableColumns.map((columnData, columnIndex) => {
              const data = featureData[columnData.key];
              const isPopular = popularPlan === columnData.columnType;

              const isFirstColumn = columnIndex === 0;
              const isLastColumn =
                columnIndex === FeatureTableColumns.length - 1;
              const isFirstRow = index === 0;
              const isLastRow = index === PLAN_FEATURES_V3_DATA_ROWS.length - 1;

              return (
                <FeaturesTableContentCell
                  key={`features-table-content-cell-${columnData.key}`}
                  rowType={rowType}
                  columnType={columnData.columnType}
                  data={data}
                  isPopular={isPopular}
                  isFirstColumn={isFirstColumn}
                  isLastColumn={isLastColumn}
                  isFirstRow={isFirstRow}
                  isLastRow={isLastRow}
                  sx={columnData.sx}
                  iconSize={iconSize}
                  isDeepen={isDeepen}
                />
              );
            })}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default FeaturesTableContent;
