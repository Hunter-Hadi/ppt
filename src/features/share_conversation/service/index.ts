import snackNotifications from '@/utils/globalSnackbar';
import {
  CustomAxiosRequestConfig,
  ErrorNetworkTips,
  webappPost,
} from '@/utils/request';

import { IChatMessage } from '../types';

export const SHARE_CONVERSATION_API = {
  GET_CONVERSATION_MESSAGE: '/conversation/get_messages',
};

interface IConverSationMessageByShareIdParameters {
  share_id: string;
  page: number;
  page_size: number;
  sort: 'asc' | 'desc';
}

interface IGetConverSationMessageByShareIdResponse {
  data: IChatMessage[];
  total_page: number;
  current_page: number;
  current_page_size: number;
  status: string;
}

export default class ShareConversationService {
  constructor() {}

  /**
   * 根据 share id 获取 conversation message
   */
  static async getConverSationMessageByShareId(
    parameters: IConverSationMessageByShareIdParameters,
  ): Promise<IGetConverSationMessageByShareIdResponse | null> {
    try {
      const response =
        await webappPost<IGetConverSationMessageByShareIdResponse>(
          SHARE_CONVERSATION_API.GET_CONVERSATION_MESSAGE,
          parameters as any,
          {
            hideNotifications: true,
          } as CustomAxiosRequestConfig,
        );
      if (response.status === 'OK' && response.data?.length) {
        return response;
      }
    } catch (error) {
      snackNotifications.error(``, {
        variant: 'warning',
        persist: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        content: ((key: string) =>
          ErrorNetworkTips(
            `Cannot view this thread`,
            `Sorry, we couldn't find this thread, or it might be private. Please check the link or contact the administrator if you believe this is an error.`,
            key,
          )) as any,
      });
    }
    return null;
  }
}
