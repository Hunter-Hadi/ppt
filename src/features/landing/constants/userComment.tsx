export type IUserCommentType =
  | 'Executives'
  | 'Marketing'
  | 'Education'
  | 'Consulting'
  | 'HR'
  | 'Financial-Services'
  | 'Real-Estate'
  | 'Technical';

export const USER_COMMENT_TYPES: { type: IUserCommentType; label: string }[] = [
  {
    type: 'Executives',
    label: 'pages:home_page__user_comment__type_executives__label',
  },
  {
    type: 'Marketing',
    label: 'pages:home_page__user_comment__type_marketing__label',
  },
  {
    type: 'Education',
    label: 'pages:home_page__user_comment__type_education__label',
  },
  {
    type: 'Consulting',
    label: 'pages:home_page__user_comment__type_consulting__label',
  },
  { type: 'HR', label: 'pages:home_page__user_comment__type_hr__label' },
  {
    type: 'Financial-Services',
    label: 'pages:home_page__user_comment__type_financial_services__label',
  },
  {
    type: 'Real-Estate',
    label: 'pages:home_page__user_comment__type_real_estate__label',
  },
  {
    type: 'Technical',
    label: 'pages:home_page__user_comment__type_technical__label',
  },
];

export const USER_COMMENTS = [
  {
    type: 'Executives',
    label: 'Executives',
    avatar: '/assets/landing/user-comment/10.png',
    name: 'James Festini',
    content:
      '"hands down the best AI add on to my browser I went deep and loaded about 30 of these and tested all varieties and this was the best."',
  },

  {
    type: 'Marketing',
    label: 'Marketing',
    avatar: '/assets/landing/user-comment/19.png',
    name: 'Saleh Eddine Touil',
    content:
      '"This was the best AI extension I found.Helped me be more formal on emails and Linkedin posts."',
  },

  {
    type: 'Education',
    label: 'Education',
    avatar: '/assets/landing/user-comment/21.png',
    name: 'Professor Escobar',
    content:
      '"This is a must have app extension. I cant say enough on how convenient it is to use an extension that can go between different AI models. Great job in creating this extension."',
  },

  {
    type: 'Consulting',
    label: 'Consulting',
    avatar: '/assets/landing/user-comment/7.png',
    name: 'Lori',
    content:
      '"MaxAI has done so much for me. Not only has he created content but has written emails for me. It saves me a lot of time which I can spend with my family."',
  },

  {
    type: 'HR',
    label: 'HR',
    avatar: '/assets/landing/user-comment/15.png',
    name: 'Chelsea Myers',
    content:
      '"I use this software to help me technicians write invoice summaries that are shown to the customer. I am the HVAC Service Manager for a Service-based company. It help with grammar, spelling, and writing information in a clear concise way that customers can understand."',
  },

  {
    type: 'Financial-Services',
    label: 'Financial Services',
    avatar: '/assets/landing/user-comment/11.png',
    name: 'Justin Terry',
    content:
      '"Integrated AI at its infancy and it has skipped walking and is on to running.  The uses of this extension are limitless, changed my web habits virtually overnight."',
  },

  {
    type: 'Real-Estate',
    label: 'Real Estate',
    avatar: '/assets/landing/user-comment/5.png',
    name: 'Kaleigh Weaver',
    content:
      '"Maxai .me has changed my productivity everyday for my conntent creation and has absololutley fasttracked my goals in so many ways. Its absoloty wonderful!!"',
  },

  {
    type: 'Technical',
    label: 'Technical',
    avatar: '/assets/landing/user-comment/12.png',
    name: 'Gopinath M',
    content:
      '"MaxAI.me is a robust AI platform featuring a wide array of services including language processing, translation, code generation, and productivity tools. It caters to developers, businesses, and individuals, offering user-friendly AI tools that streamline workflows, automate tasks, and bolster productivity."',
  },
];
