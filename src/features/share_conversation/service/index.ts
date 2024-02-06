import { webappPost } from '@/utils/request';

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
    const response = await webappPost<IGetConverSationMessageByShareIdResponse>(
      SHARE_CONVERSATION_API.GET_CONVERSATION_MESSAGE,
      parameters as any,
    );
    if (response.status === 'OK' && response.data?.length) {
      return response;
    }
    return null;
  }
}
