import { SxProps } from '@mui/material/styles'

export type IFeatureColumnType = 'features' | 'free' | 'basic' | 'pro' | 'elite'

export type IPlanFeatureColumnData = {
  key: IFeatureColumnType
  columnType: IFeatureColumnType
  sx: SxProps
  meta?: {
    compareMonthlyPrice?: boolean
  }
}

export interface IFeaturesLabelCellDataType {
  title?: string
  desc?: string
  icon?: string
  video?: {
    link?: string
    time?: string
  }
  tooltip?: {
    title?: string
    desc?: string
    imageLink?: string
    videoUrl?: string
    moreDescription?: string
  }
}
export interface IFeaturesPlanCellDataType {
  status?:
    | 'checked'
    | 'none'
    | 'value'
    | 'checked-color'
    | 'limit-color'
    | 'none-color'
  statusText?: string
  meta?: {
    perInfo: string
  }
}
export interface IFeaturesCategoryTitleCellDataType {
  categoryTitle?: string
}

export type IFeaturesCellDataType = IFeaturesLabelCellDataType &
  IFeaturesPlanCellDataType &
  IFeaturesCategoryTitleCellDataType

export type IFeaturesRowType = 'secondary' | 'deepen'

export type IPlanFeaturesV3DataRowType = {
  features: IFeaturesCellDataType | null
  free: IFeaturesCellDataType | null
  basic: IFeaturesCellDataType | null
  pro: IFeaturesCellDataType | null
  elite: IFeaturesCellDataType | null

  meta?: {
    type?: IFeaturesRowType
  }
}
