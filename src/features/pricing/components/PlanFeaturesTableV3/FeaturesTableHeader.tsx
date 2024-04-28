import { Stack } from '@mui/material';
import React, { FC } from 'react';

import { FeatureTableColumns } from '.';
import FeaturesTableHeaderCell from './FeaturesTableHeaderCell';
import { IFeatureColumnType } from './type';
interface IProps {
  popularPlan?: IFeatureColumnType;
  inFixed?: boolean;
  showPaymentSwitch?: boolean;
}

const FeaturesTableHeader: FC<IProps> = ({
  popularPlan,
  inFixed,
  showPaymentSwitch,
}) => {
  return (
    <Stack direction='row'>
      {FeatureTableColumns.map((columnData, index) => {
        const isFirst = index === 0;
        const isLast = index === FeatureTableColumns.length - 1;
        const isPopular = popularPlan === columnData.columnType;
        return (
          <FeaturesTableHeaderCell
            key={`features-table-header-cell-${columnData.key}`}
            columnType={columnData.columnType}
            isFirst={isFirst}
            isLast={isLast}
            isPopular={isPopular}
            sx={columnData.sx}
            inFixed={inFixed}
            showPaymentSwitch={showPaymentSwitch}
          />
        );
      })}
    </Stack>
  );
};

export default FeaturesTableHeader;
