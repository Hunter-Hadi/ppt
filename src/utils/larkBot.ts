import axios from 'axios';

export type botUuid =
  | '956022cb-e2e9-42b4-aff2-03bd3edaa8f5' // waitlist survey and get started
  | '5bddd049-128a-497f-a26a-343849140779' // use chatgpt uninstall larkbot
  | 'dd385931-45f4-4de1-8e48-8145561b0f9d'; // use chatgpt cmd + j not working larkbot

export const sendLarkBotMessage = (
  title: string,
  message = '',
  attr?: { uuid?: botUuid; [key: string]: any },
) => {
  return axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + '/app/send_notification', {
      env: process.env.NEXT_PUBLIC_ENV,
      title: `UseChatGPT: ${title}`,
      message,
      ...attr,
    })
    .then()
    .catch();
};
