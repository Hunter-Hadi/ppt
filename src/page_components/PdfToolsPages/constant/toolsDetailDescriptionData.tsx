export interface IToolsDetailDescriptionInfoProps {
  i18nVariables?: { [key in string]: string };
  topLeft: string;
  topRight: string[];
  middle: {
    iconName: string;
    title: string;
    description: string;
  }[];
  bottom: {
    leftIconName: string;
    rightDescription: {
      title: string;
      description: string[];
    };
  };
}
const getPdfToImageTypeToolDescriptionObject = (type: 'PNG' | 'JPEG') => {
  return {
    i18nVariables: { TYPE: type },
    topLeft:
      'pages:pdf_tools__detail_description_object__pdf_to_image__top_left',
    topRight: [
      'pages:pdf_tools__detail_description_object__pdf_to_image__top_right_1',
      'pages:pdf_tools__detail_description_object__pdf_to_image__top_right_2',
      'pages:pdf_tools__detail_description_object__pdf_to_image__top_right_3',
    ],
    middle: [
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
    bottom: {
      leftIconName: 'HistoryEdu',
      rightDescription: {
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_image__bottom_rightDescription_title',
        description: [
          'pages:pdf_tools__detail_description_object__pdf_to_image__bottom_rightDescription_description_1',
          'pages:pdf_tools__detail_description_object__pdf_to_image__bottom_rightDescription_description_2',
          'pages:pdf_tools__detail_description_object__pdf_to_image__bottom_rightDescription_description_3',
          'pages:pdf_tools__detail_description_object__pdf_to_image__bottom_rightDescription_description_4',
        ],
      },
    },
  };
};
const getImageToPdfTypeToolDescriptionObject = (
  type: 'PNG' | 'JPEG' | 'HEIC',
) => {
  return {
    i18nVariables: { TYPE: type },
    topLeft:
      'pages:pdf_tools__detail_description_object__image_to_pdf__top_left',
    topRight: [
      'pages:pdf_tools__detail_description_object__image_to_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__image_to_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__image_to_pdf__top_right_3',
    ],
    middle: [
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
    bottom: {
      leftIconName: 'HistoryEdu',
      rightDescription: {
        title:
          'pages:pdf_tools__detail_description_object__image_to_pdf__bottom_rightDescription_title',
        description: [
          'pages:pdf_tools__detail_description_object__image_to_pdf__bottom_rightDescription_description_1',
          'pages:pdf_tools__detail_description_object__image_to_pdf__bottom_rightDescription_description_2',
          'pages:pdf_tools__detail_description_object__image_to_pdf__bottom_rightDescription_description_3',
          'pages:pdf_tools__detail_description_object__image_to_pdf__bottom_rightDescription_description_4',
        ],
      },
    },
  };
};
export const allPdfToolsDetailDescriptionObject: {
  [key in string]: IToolsDetailDescriptionInfoProps;
} = {
  'merge-pdf': {
    topLeft: 'pages:pdf_tools__detail_description_object__merge_pdf__top_left',
    topRight: [
      'pages:pdf_tools__detail_description_object__merge_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__merge_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__merge_pdf__top_right_3',
    ],
    middle: [
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
    bottom: {
      leftIconName: 'HistoryEdu',
      rightDescription: {
        title:
          'pages:pdf_tools__detail_description_object__merge_pdf__bottom_rightDescription_title',
        description: [
          'pages:pdf_tools__detail_description_object__merge_pdf__bottom_rightDescription_description_1',
          'pages:pdf_tools__detail_description_object__merge_pdf__bottom_rightDescription_description_2',
          'pages:pdf_tools__detail_description_object__merge_pdf__bottom_rightDescription_description_3',
          'pages:pdf_tools__detail_description_object__merge_pdf__bottom_rightDescription_description_4',
        ],
      },
    },
  },
  'split-pdf': {
    topLeft: 'pages:pdf_tools__detail_description_object__split_pdf__top_left',
    topRight: [
      'pages:pdf_tools__detail_description_object__split_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__split_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__split_pdf__top_right_3',
    ],
    middle: [
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
    bottom: {
      leftIconName: 'HistoryEdu',
      rightDescription: {
        title:
          'pages:pdf_tools__detail_description_object__split_pdf__bottom_right_title',
        description: [
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
    topLeft:
      'pages:pdf_tools__detail_description_object__pdf_to_html__top_left',
    topRight: [
      'pages:pdf_tools__detail_description_object__pdf_to_html__top_right_1',
      'pages:pdf_tools__detail_description_object__pdf_to_html__top_right_2',
      'pages:pdf_tools__detail_description_object__pdf_to_html__top_right_3',
    ],
    middle: [
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
    bottom: {
      leftIconName: 'HistoryEdu',
      rightDescription: {
        title:
          'pages:pdf_tools__detail_description_object__pdf_to_html__bottom_rightDescription_title',
        description: [
          'pages:pdf_tools__detail_description_object__pdf_to_html__bottom_rightDescription_description_1',
          'pages:pdf_tools__detail_description_object__pdf_to_html__bottom_rightDescription_description_2',
          'pages:pdf_tools__detail_description_object__pdf_to_html__bottom_rightDescription_description_3',
          'pages:pdf_tools__detail_description_object__pdf_to_html__bottom_rightDescription_description_4',
        ],
      },
    },
  },
  'sign-pdf': {
    topLeft: 'pages:pdf_tools__detail_description_object__sign_pdf__top_left',
    topRight: [
      'pages:pdf_tools__detail_description_object__sign_pdf__top_right_1',
      'pages:pdf_tools__detail_description_object__sign_pdf__top_right_2',
      'pages:pdf_tools__detail_description_object__sign_pdf__top_right_3',
    ],
    middle: [
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
    bottom: {
      leftIconName: 'HistoryEdu',
      rightDescription: {
        title:
          'pages:pdf_tools__detail_description_object__sign_pdf__bottom_right_title',
        description: [
          'pages:pdf_tools__detail_description_object__sign_pdf__bottom_right_description_1',
          'pages:pdf_tools__detail_description_object__sign_pdf__bottom_right_description_2',
          'pages:pdf_tools__detail_description_object__sign_pdf__bottom_right_description_3',
          'pages:pdf_tools__detail_description_object__sign_pdf__bottom_right_description_4',
        ],
      },
    },
  },
};
