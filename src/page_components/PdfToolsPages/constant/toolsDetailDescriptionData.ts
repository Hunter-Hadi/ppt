export interface IToolsDetailDescriptionInfoProps {
  i18nVariables?: { [key in string]: string };
  topFeatures: string;
  userExperienceList: string[];
  functionIntroductionList: {
    iconName: string;
    title: string;
    description: string;
  }[];
  operatingInstructions: {
    iconName: string;
    operationSteps: {
      title: string;
      descriptionList: string[];
    };
  };
}
const getPdfToImageTypeToolDescriptionObject = (type: 'PNG' | 'JPEG') => {
  return {
    i18nVariables: { TYPE: type },
    topFeatures:
      'pages:pdf_tools__detail_description_object__pdf_to_image__top_left',
    userExperienceList: [
      'pages:pdf_tools__detail_description_object__pdf_to_image__top_right_1',
      'pages:pdf_tools__detail_description_object__pdf_to_image__top_right_2',
      'pages:pdf_tools__detail_description_object__pdf_to_image__top_right_3',
    ],
    functionIntroductionList: [
      {
        iconName: 'Lightbulb',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_1_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_1_description',
      },
      {
        iconName: 'WorkspacePremiumOutlined',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_2_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_2_description',
      },
      {
        iconName: 'ThumbUpAltOutlined',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_3_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_3_description',
      },
      {
        iconName: 'LockOutlined',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_4_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_4_description',
      },
      {
        iconName: 'LocalPoliceOutlined',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_5_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_5_description',
      },
      {
        iconName: 'ComputerOutlined',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_6_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_image__middle_6_description',
      },
    ],
    operatingInstructions: {
      iconName: type === 'PNG' ? 'PDFToPNG' : 'PDFToJPEG',
      operationSteps: {
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_image__bottom_right_title',
        descriptionList: [
          'pages:pdf_tools__detail_description_object__pdf_to_image__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__pdf_to_image__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__pdf_to_image__bottom_right_description_3',
          'pages:pdf_tools__detail_description_object__pdf_to_image__bottom_right_description_4',
        ],
      },
    },
  };
};
const getImageToPdfTypeToolDescriptionObject = (
  type: 'PNG' | 'JPEG' | 'HEIC',
) => {
  let iconName = '';
  switch (type) {
    case 'PNG':
      iconName = 'PNGToPDF';
      break;
    case 'JPEG':
      iconName = 'JPEGToPDF';
      break;
    case 'HEIC':
      iconName = 'HEICToPDF';
      break;
  }
  return {
    i18nVariables: { TYPE: type },
    topFeatures:
      'pages:pdf_tools__detail_description_object__image_to_pdf__top_left',
    userExperienceList: [
      'pages:pdf_tools__detail_description_object__image_to_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__image_to_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__image_to_pdf__top_right_3',
    ],
    functionIntroductionList: [
      {
        iconName: 'Lightbulb',
        title:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_1_title',
        description:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_1_description',
      },
      {
        iconName: 'WorkspacePremiumOutlined',
        title:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_2_title',
        description:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_2_description',
      },
      {
        iconName: 'ThumbUpAltOutlined',
        title:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_3_title',
        description:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_3_description',
      },
      {
        iconName: 'LockOutlined',
        title:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_4_title',
        description:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_4_description',
      },
      {
        iconName: 'LocalPoliceOutlined',
        title:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_5_title',
        description:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_5_description',
      },
      {
        iconName: 'ComputerOutlined',
        title:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_6_title',
        description:
          'pages:pdf_tools__detail_description_object__image_to_pdf__middle_6_description',
      },
    ],
    operatingInstructions: {
      iconName: iconName,
      operationSteps: {
        title:
          'pages:pdf_tools__detail_description_object__image_to_pdf__bottom_right_title',
        descriptionList: [
          'pages:pdf_tools__detail_description_object__image_to_pdf__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__image_to_pdf__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__image_to_pdf__bottom_right_description_3',
          'pages:pdf_tools__detail_description_object__image_to_pdf__bottom_right_description_4',
        ],
      },
    },
  };
};
export const allPdfToolsDetailDescriptionObject: {
  [key in string]: IToolsDetailDescriptionInfoProps;
} = {
  'merge-pdf': {
    topFeatures:
      'pages:pdf_tools__detail_description_object__merge_pdf__top_left',
    userExperienceList: [
      'pages:pdf_tools__detail_description_object__merge_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__merge_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__merge_pdf__top_right_3',
    ],
    functionIntroductionList: [
      {
        iconName: 'Lightbulb',
        title:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_1_title',
        description:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_1_description',
      },
      {
        iconName: 'WorkspacePremiumOutlined',
        title:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_2_title',
        description:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_2_description',
      },
      {
        iconName: 'ThumbUpAltOutlined',
        title:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_3_title',
        description:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_3_description',
      },
      {
        iconName: 'LockOutlined',
        title:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_4_title',
        description:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_4_description',
      },
      {
        iconName: 'LocalPoliceOutlined',
        title:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_5_title',
        description:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_5_description',
      },
      {
        iconName: 'ComputerOutlined',
        title:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_6_title',
        description:
          'pages:pdf_tools__detail_description_object__merge_pdf__middle_6_description',
      },
    ],
    operatingInstructions: {
      iconName: 'MergePDF',
      operationSteps: {
        title:
          'pages:pdf_tools__detail_description_object__merge_pdf__bottom_right_title',
        descriptionList: [
          'pages:pdf_tools__detail_description_object__merge_pdf__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__merge_pdf__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__merge_pdf__bottom_right_description_3',
          'pages:pdf_tools__detail_description_object__merge_pdf__bottom_right_description_4',
        ],
      },
    },
  },
  'split-pdf': {
    topFeatures:
      'pages:pdf_tools__detail_description_object__split_pdf__top_left',
    userExperienceList: [
      'pages:pdf_tools__detail_description_object__split_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__split_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__split_pdf__top_right_3',
    ],
    functionIntroductionList: [
      {
        iconName: 'Lightbulb',
        title:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_1_title',
        description:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_1_description',
      },
      {
        iconName: 'WorkspacePremiumOutlined',
        title:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_2_title',
        description:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_2_description',
      },
      {
        iconName: 'ThumbUpAltOutlined',
        title:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_3_title',
        description:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_3_description',
      },
      {
        iconName: 'LockOutlined',
        title:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_4_title',
        description:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_4_description',
      },
      {
        iconName: 'LocalPoliceOutlined',
        title:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_5_title',
        description:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_5_description',
      },
      {
        iconName: 'ComputerOutlined',
        title:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_6_title',
        description:
          'pages:pdf_tools__detail_description_object__split_pdf__middle_6_description',
      },
    ],
    operatingInstructions: {
      iconName: 'SplitPDF',
      operationSteps: {
        title:
          'pages:pdf_tools__detail_description_object__split_pdf__bottom_right_title',
        descriptionList: [
          'pages:pdf_tools__detail_description_object__split_pdf__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__split_pdf__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__split_pdf__bottom_right_description_3',
        ],
      },
    },
  },
  'pdf-to-png': getPdfToImageTypeToolDescriptionObject('PNG'),
  'pdf-to-jpeg': getPdfToImageTypeToolDescriptionObject('JPEG'),
  'png-to-pdf': getImageToPdfTypeToolDescriptionObject('PNG'),
  'jpeg-to-pdf': getImageToPdfTypeToolDescriptionObject('JPEG'),
  'heic-to-pdf': getImageToPdfTypeToolDescriptionObject('HEIC'),
  'pdf-to-html': {
    topFeatures:
      'pages:pdf_tools__detail_description_object__pdf_to_html__top_left',
    userExperienceList: [
      'pages:pdf_tools__detail_description_object__pdf_to_html__top_right_1',
      'pages:pdf_tools__detail_description_object__pdf_to_html__top_right_2',
      'pages:pdf_tools__detail_description_object__pdf_to_html__top_right_3',
    ],
    functionIntroductionList: [
      {
        iconName: 'Lightbulb',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_1_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_1_description',
      },
      {
        iconName: 'WorkspacePremiumOutlined',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_2_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_2_description',
      },
      {
        iconName: 'ThumbUpAltOutlined',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_3_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_3_description',
      },
      {
        iconName: 'LockOutlined',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_4_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_4_description',
      },
      {
        iconName: 'LocalPoliceOutlined',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_5_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_5_description',
      },
      {
        iconName: 'ComputerOutlined',
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_6_title',
        description:
          'pages:pdf_tools__detail_description_object__pdf_to_html__middle_6_description',
      },
    ],
    operatingInstructions: {
      iconName: 'PDFToHTML',
      operationSteps: {
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_html__bottom_right_title',
        descriptionList: [
          'pages:pdf_tools__detail_description_object__pdf_to_html__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__pdf_to_html__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__pdf_to_html__bottom_right_description_3',
          'pages:pdf_tools__detail_description_object__pdf_to_html__bottom_right_description_4',
        ],
      },
    },
  },
  'compress-pdf': {
    topFeatures:
      'pages:pdf_tools__detail_description_object__compress_pdf__top_left',
    userExperienceList: [
      'pages:pdf_tools__detail_description_object__compress_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__compress_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__compress_pdf__top_right_3',
    ],
    functionIntroductionList: [
      {
        iconName: 'Lightbulb',
        title:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_1_title',
        description:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_1_description',
      },
      {
        iconName: 'WorkspacePremiumOutlined',
        title:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_2_title',
        description:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_2_description',
      },
      {
        iconName: 'ThumbUpAltOutlined',
        title:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_3_title',
        description:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_3_description',
      },
      {
        iconName: 'LockOutlined',
        title:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_4_title',
        description:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_4_description',
      },
      {
        iconName: 'LocalPoliceOutlined',
        title:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_5_title',
        description:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_5_description',
      },
      {
        iconName: 'ComputerOutlined',
        title:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_6_title',
        description:
          'pages:pdf_tools__detail_description_object__compress_pdf__middle_6_description',
      },
    ],
    operatingInstructions: {
      iconName: 'CompressPDF',
      operationSteps: {
        title:
          'pages:pdf_tools__detail_description_object__compress_pdf__bottom_right_title',
        descriptionList: [
          'pages:pdf_tools__detail_description_object__compress_pdf__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__compress_pdf__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__compress_pdf__bottom_right_description_3',
          'pages:pdf_tools__detail_description_object__compress_pdf__bottom_right_description_4',
        ],
      },
    },
  },
  'sign-pdf': {
    topFeatures:
      'pages:pdf_tools__detail_description_object__sign_pdf__top_left',
    userExperienceList: [
      'pages:pdf_tools__detail_description_object__sign_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__sign_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__sign_pdf__top_right_3',
    ],
    functionIntroductionList: [
      {
        iconName: 'Lightbulb',
        title:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_1_title',
        description:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_1_description',
      },
      {
        iconName: 'WorkspacePremiumOutlined',
        title:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_2_title',
        description:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_2_description',
      },
      {
        iconName: 'ThumbUpAltOutlined',
        title:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_3_title',
        description:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_3_description',
      },
      {
        iconName: 'LockOutlined',
        title:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_4_title',
        description:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_4_description',
      },
      {
        iconName: 'LocalPoliceOutlined',
        title:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_5_title',
        description:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_5_description',
      },
      {
        iconName: 'ComputerOutlined',
        title:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_6_title',
        description:
          'pages:pdf_tools__detail_description_object__sign_pdf__middle_6_description',
      },
    ],
    operatingInstructions: {
      iconName: 'SignPDF',
      operationSteps: {
        title:
          'pages:pdf_tools__detail_description_object__sign_pdf__bottom_right_title',
        descriptionList: [
          'pages:pdf_tools__detail_description_object__sign_pdf__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__sign_pdf__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__sign_pdf__bottom_right_description_3',
          'pages:pdf_tools__detail_description_object__sign_pdf__bottom_right_description_4',
        ],
      },
    },
  },
  'ocr-pdf': {
    topFeatures:
      'pages:pdf_tools__detail_description_object__ocr_pdf__top_left',
    userExperienceList: [
      'pages:pdf_tools__detail_description_object__ocr_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__ocr_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__ocr_pdf__top_right_3',
    ],
    functionIntroductionList: [
      {
        iconName: 'Lightbulb',
        title:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_1_title',
        description:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_1_description',
      },
      {
        iconName: 'WorkspacePremiumOutlined',
        title:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_2_title',
        description:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_2_description',
      },
      {
        iconName: 'ThumbUpAltOutlined',
        title:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_3_title',
        description:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_3_description',
      },
      {
        iconName: 'LockOutlined',
        title:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_4_title',
        description:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_4_description',
      },
      {
        iconName: 'LocalPoliceOutlined',
        title:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_5_title',
        description:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_5_description',
      },
      {
        iconName: 'ComputerOutlined',
        title:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_6_title',
        description:
          'pages:pdf_tools__detail_description_object__ocr_pdf__middle_6_description',
      },
    ],
    operatingInstructions: {
      iconName: 'OcrPDF',
      operationSteps: {
        title:
          'pages:pdf_tools__detail_description_object__ocr_pdf__bottom_right_title',
        descriptionList: [
          'pages:pdf_tools__detail_description_object__ocr_pdf__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__ocr_pdf__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__ocr_pdf__bottom_right_description_3',
          'pages:pdf_tools__detail_description_object__ocr_pdf__bottom_right_description_4',
        ],
      },
    },
  },
  'rotate-pdf': {
    topFeatures:
      'pages:pdf_tools__detail_description_object__rotate_pdf__top_left',
    userExperienceList: [
      'pages:pdf_tools__detail_description_object__rotate_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__rotate_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__rotate_pdf__top_right_3',
    ],
    functionIntroductionList: [
      {
        iconName: 'Lightbulb',
        title:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_1_title',
        description:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_1_description',
      },
      {
        iconName: 'WorkspacePremiumOutlined',
        title:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_2_title',
        description:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_2_description',
      },
      {
        iconName: 'ThumbUpAltOutlined',
        title:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_3_title',
        description:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_3_description',
      },
      {
        iconName: 'LockOutlined',
        title:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_4_title',
        description:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_4_description',
      },
      {
        iconName: 'LocalPoliceOutlined',
        title:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_5_title',
        description:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_5_description',
      },
      {
        iconName: 'ComputerOutlined',
        title:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_6_title',
        description:
          'pages:pdf_tools__detail_description_object__rotate_pdf__middle_6_description',
      },
    ],
    operatingInstructions: {
      iconName: 'RotatePDF',
      operationSteps: {
        title:
          'pages:pdf_tools__detail_description_object__rotate_pdf__bottom_right_title',
        descriptionList: [
          'pages:pdf_tools__detail_description_object__rotate_pdf__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__rotate_pdf__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__rotate_pdf__bottom_right_description_3',
        ],
      },
    },
  },
  'number-pages': {
    topFeatures:
      'pages:pdf_tools__detail_description_object__number_pages__top_left',
    userExperienceList: [
      'pages:pdf_tools__detail_description_object__number_pages__top_right_1',
      'pages:pdf_tools__detail_description_object__number_pages__top_right_2',
      'pages:pdf_tools__detail_description_object__number_pages__top_right_3',
    ],
    functionIntroductionList: [
      {
        iconName: 'Lightbulb',
        title:
          'pages:pdf_tools__detail_description_object__number_pages__middle_1_title',
        description:
          'pages:pdf_tools__detail_description_object__number_pages__middle_1_description',
      },
      {
        iconName: 'WorkspacePremiumOutlined',
        title:
          'pages:pdf_tools__detail_description_object__number_pages__middle_2_title',
        description:
          'pages:pdf_tools__detail_description_object__number_pages__middle_2_description',
      },
      {
        iconName: 'ThumbUpAltOutlined',
        title:
          'pages:pdf_tools__detail_description_object__number_pages__middle_3_title',
        description:
          'pages:pdf_tools__detail_description_object__number_pages__middle_3_description',
      },
      {
        iconName: 'LockOutlined',
        title:
          'pages:pdf_tools__detail_description_object__number_pages__middle_4_title',
        description:
          'pages:pdf_tools__detail_description_object__number_pages__middle_4_description',
      },
      {
        iconName: 'LocalPoliceOutlined',
        title:
          'pages:pdf_tools__detail_description_object__number_pages__middle_5_title',
        description:
          'pages:pdf_tools__detail_description_object__number_pages__middle_5_description',
      },
      {
        iconName: 'ComputerOutlined',
        title:
          'pages:pdf_tools__detail_description_object__number_pages__middle_6_title',
        description:
          'pages:pdf_tools__detail_description_object__number_pages__middle_6_description',
      },
    ],
    operatingInstructions: {
      iconName: 'NumberPages',
      operationSteps: {
        title:
          'pages:pdf_tools__detail_description_object__number_pages__bottom_right_title',
        descriptionList: [
          'pages:pdf_tools__detail_description_object__number_pages__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__number_pages__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__number_pages__bottom_right_description_3',
          'pages:pdf_tools__detail_description_object__number_pages__bottom_right_description_4',
          'pages:pdf_tools__detail_description_object__number_pages__bottom_right_description_5',
        ],
      },
    },
  },
};
