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
    avatar: '/assets/landing/user-comment/1.png',
    name: 'Idan Dalal',
    content:
      'The most accessible way to automate repetitive stuff I do on Chrome! Feels too good to be free XD',
  },

  {
    type: 'Marketing',
    label: 'Marketing',
    avatar: '/assets/landing/user-comment/2.png',
    name: 'Kaleigh Weaver',
    content: `Maxai.me has changed my productivity every day for my content creation and has absolutely fast-tracked my goals in so many ways. It's absolutely wonderful!!!`,
  },

  {
    type: 'Education',
    label: 'Education',
    avatar: '/assets/landing/user-comment/3.png',
    name: 'Nile Stanton',
    content: `MaxAI.me kicks butt big time! - As a teacher, researcher, curious person, I deeply appreciate it. As the person wrote below, Max is THE best and easy to use as well. Great job creating this gem. ------------------- THANKS!`,
  },

  {
    type: 'Consulting',
    label: 'Consulting',
    avatar: '/assets/landing/user-comment/4.png',
    name: 'Gregg Maynard',
    content: `Of the many ChatGPT extensions on the Chrome Web Store, this is my all-time fave. A complete solution and I absolutely love the one-click prompt library. I can even add and customize my own prompts right from the settings. 5-star extension, for sure.`,
  },

  {
    type: 'HR',
    label: 'HR',
    avatar: '/assets/landing/user-comment/5.png',
    name: 'Saleh Eddine Touil',
    content: `This was the best AI extension I found. It helped me be more formal in emails and LinkedIn posts.`,
  },

  {
    type: 'Financial-Services',
    label: 'Financial Services',
    avatar: '/assets/landing/user-comment/6.png',
    name: 'Kylah Cruz',
    content: `I found this application to be incredibly useful! I have been using it for researching articles and blogs, and it has provided me with references and sources that other AI-powered assistants can't. Highly recommend it for anyone who needs reliable information.`,
  },

  {
    type: 'Real-Estate',
    label: 'Real Estate',
    avatar: '/assets/landing/user-comment/7.png',
    name: 'Lori',
    content: `MaxAI has done so much for me. Not only has it created content, but it has also written emails for me. It saves me a lot of time, which I can spend with my family.`,
  },

  {
    type: 'Technical',
    label: 'Technical',
    avatar: '/assets/landing/user-comment/8.png',
    name: 'Дмитрий Рыжов',
    content: `It's an amazing browser extension that really makes my life on the Internet more convenient and productive. Thanks to this intelligent assistant, I can easily and quickly find the information I need, get ideas and recommendations. MaxAI.me helps me save time and effort by providing the information and tips I need right during my online searches. I appreciate the convenience and ease of use of this extension.`,
  },
];
