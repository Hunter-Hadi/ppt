import { atom, useRecoilState } from 'recoil';

interface IShareConversationParametersStateType {
  page: number;
  page_size: number;
  sort: 'asc' | 'desc';
  total: number;
}

const ShareConversationParametersState =
  atom<IShareConversationParametersStateType>({
    key: 'ShareConversationParametersState',
    default: {
      page: 0,
      page_size: 10,
      sort: 'asc',
      total: 0,
    },
  });

/**
 *
 * 管理 share conversation list 分页器参数
 *
 */
const useShareConversationParameters = () => {
  const [shareConversationParameters, setShareConversationParameters] =
    useRecoilState(ShareConversationParametersState);

  const updateShareConversationParameters = (
    settingsOrUpdateFunction:
      | Partial<IShareConversationParametersStateType>
      | ((
          settings: IShareConversationParametersStateType,
        ) => IShareConversationParametersStateType),
  ) => {
    if (settingsOrUpdateFunction instanceof Function) {
      setShareConversationParameters((preValue) =>
        settingsOrUpdateFunction(preValue),
      );
      return;
    } else {
      setShareConversationParameters((preValue) => ({
        ...preValue,
        ...settingsOrUpdateFunction,
      }));
    }
  };

  return {
    shareConversationParameters,
    updateShareConversationParameters,
  };
};

export default useShareConversationParameters;
