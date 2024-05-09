import { Stack } from '@mui/material';
import React, { FC } from 'react';

import FeaturesTableHeaderCell from './FeaturesTableHeaderCell';
import { IFeatureColumnType, IPlanFeatureColumnData } from './type';
interface IProps {
  featureTableColumns: IPlanFeatureColumnData[];
  popularPlan?: IFeatureColumnType;
  inFixed?: boolean;
  showPaymentSwitch?: boolean;
  needToHiddenPlan?: IFeatureColumnType[];
}

const FeaturesTableHeader: FC<IProps> = ({
  featureTableColumns,
  popularPlan,
  inFixed,
  showPaymentSwitch,
  needToHiddenPlan,
}) => {
  return (
    <Stack direction='row'>
      {featureTableColumns.map((columnData, index) => {
        if (needToHiddenPlan?.includes(columnData.columnType)) {
          return null;
        }
        const isFirst = index === 0;
        const isLast = index === featureTableColumns.length - 1;
        const isPopular = popularPlan === columnData.columnType;
        return (
          <FeaturesTableHeaderCell
            columnData={columnData}
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
