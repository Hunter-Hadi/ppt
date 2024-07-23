import Stack from '@mui/material/Stack'
import React, { FC, useMemo } from 'react'

import { PLAN_FEATURES_V3_DATA_ROWS } from '@/features/pricing/constant/features_v3'

import FeaturesTableContentCell from './FeaturesTableContentCell'
import { IFeatureColumnType, IPlanFeatureColumnData } from './type'

interface IProps {
  popularPlan?: IFeatureColumnType
  needToHiddenPlan?: IFeatureColumnType[]
  featureTableColumns: IPlanFeatureColumnData[]
}

const FeaturesTableContent: FC<IProps> = ({
  featureTableColumns,
  popularPlan,
  needToHiddenPlan,
}) => {
  const featuresData = useMemo(() => {
    return PLAN_FEATURES_V3_DATA_ROWS
  }, [])

  return (
    <Stack>
      {featuresData.map((featureData, index) => {
        // if (needToHiddenPlan?.includes(columnData.columnType)) {
        //   return null;
        // }

        const iconSize = 20
        const isDeepen = featureData.meta?.type === 'deepen'
        const rowType = featureData.meta?.type

        return (
          <Stack
            key={`features-table-content-tr-${index}`}
            id={`features-table-content-tr-${index}`}
            direction={'row'}
            sx={{
              bgcolor: isDeepen ? '#F9FAFB' : 'transparent',
            }}
          >
            {featureTableColumns.map((columnData, columnIndex) => {
              if (needToHiddenPlan?.includes(columnData.columnType)) {
                return null
              }

              const data = featureData[columnData.key]
              const isPopular = popularPlan === columnData.columnType

              const isFirstColumn = columnIndex === 0
              const isLastColumn =
                columnIndex === featureTableColumns.length - 1
              const isFirstRow = index === 0
              const isLastRow = index === featuresData.length - 1

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
              )
            })}
          </Stack>
        )
      })}
    </Stack>
  )
}

export default FeaturesTableContent
