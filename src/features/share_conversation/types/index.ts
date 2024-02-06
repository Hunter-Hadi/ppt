export type IChatMessagePublishStatus = 'unpublished' | 'success' | 'error';

// 由于 share conversation 不需要渲染 付费卡点所以这里的类型，先用 string
type PermissionWrapperCardSceneType = string;

// 不知道是啥先用 unknown
// debugger
type IContextMenuItem = unknown;

// 不知道是啥先用 unknown
// debugger
type IContextMenuIconKey = string;

export interface IChatMessage {
  type: 'user' | 'ai' | 'system' | 'third';
  text: string;
  messageId: string;
  parentMessageId?: string;
  // 不同的message存放数据的地方
  meta?: {
    [key: string]: any;
  };
  // 由indexDB管理，不需要主动设置/更新 - 2.0版本才有 - 2024-01-30
  created_at?: string;
  updated_at?: string;
  publishStatus?: IChatMessagePublishStatus;
}

// 用户发送的消息
export interface IUserChatMessage extends IChatMessage {
  type: 'user';
  text: string;
  messageId: string;
  conversationId: string;
  parentMessageId?: string;
  meta?: IChatMessageExtraMetaType;
}

// 系统消息
export interface ISystemChatMessage extends IChatMessage {
  type: 'system';
  text: string;
  messageId: string;
  parentMessageId?: string;
  meta: {
    status?: 'error' | 'success' | 'info';
    systemMessageType?: 'needUpgrade' | 'normal';
    permissionSceneType?: PermissionWrapperCardSceneType;
  };
  /**
   * @deprecated
   * @description - 后面用meta字段
   */
  extra?: {
    status?: 'error' | 'success' | 'info';
    systemMessageType?: 'needUpgrade' | 'normal';
    permissionSceneType?: PermissionWrapperCardSceneType;
  };
}

// AI返回的消息
export interface IAIResponseMessage extends IChatMessage {
  type: 'ai';
  text: string;
  messageId: string;
  parentMessageId?: string;
  originalMessage?: IAIResponseOriginalMessage;
}

export interface IAIResponseOriginalMessage {
  id?: string;
  create_time?: string;
  update_time?: string;
  author?: {
    role: string;
    name: string;
    metadata?: string;
  };
  content?: {
    contentType: 'text' | 'image';
    title?: IAIResponseOriginalMessageMetadataTitle;
    text: string;
    language?: string;
  };
  metadata?: {
    // 附件
    attachments?: IChatUploadFile[];
    includeHistory?: boolean;
    isComplete?: boolean;
    finish?: {
      type: string;
      stopTokens?: number;
    };
    title?: IAIResponseOriginalMessageMetadataTitle;
    // 来源于哪个网站
    sourceWebpage?: {
      title?: string;
      url?: string;
      favicon?: string;
    };
    sources?: {
      status: 'loading' | 'complete';
      links?: IAIResponseOriginalMessageSourceLink[];
    };
    copilot?: {
      title?: IAIResponseOriginalMessageMetadataTitle;
      steps: IAIResponseOriginalMessageCopilotStep[];
    };
    artTextToImageMetadata?: IArtTextToImageMetadata;
    artTextToImagePrompt?: string;
    // summary底下的最后一句
    deepDive?: {
      title?: IAIResponseOriginalMessageMetadataTitle;
      value: string;
    };
    // 分享的类型, 用作在copy和share的时候
    shareType?: 'normal' | 'summary' | 'search' | 'art';
    // TODO
    related?: string[];
  };
}

export type IChatMessageExtraMetaType = {
  // 是否自动判断AIResponseLanguage
  isEnabledDetectAIResponseLanguage?: boolean;
  contextMenu?: IContextMenuItem;
  // 温度
  temperature?: number;
  // 附件
  attachments?: IChatUploadFile[];
  // 本条消息的显示消息
  messageVisibleText?: string;
  // 搜索的消息源Json
  searchSources?: string;
  // 是否包含历史消息
  includeHistory?: boolean;
  // 聊天记录
  historyMessages?: IChatMessage[];
  // 输出的消息ID, 例如summary, search with AI
  outputMessageId?: string;
  // 告诉Provider是否需要重新生成
  regenerate?: boolean;
  // 是否使用了JsonMode
  isEnabledJsonMode?: boolean;
  [key: string]: any;
};

export type IAIResponseOriginalMessageMetadataTitle = {
  title: string;
  titleIcon?: string;
  titleIconSize?: number;
};

export interface IChatUploadFile {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  blobUrl?: string;
  icon?: string;
  file?: File;
  base64Data?: string;
  uploadProgress?: number;
  uploadStatus?: 'idle' | 'uploading' | 'success' | 'error';
  uploadErrorMessage?: string;
  uploadedUrl?: string;
  uploadedFileId?: string;
  meta?: any;
}

export type IAIResponseOriginalMessageSourceLink = {
  title: string;
  url: string;
  favicon: string;
  img: string;
  from?: string;
};

export type IAIResponseOriginalMessageCopilotStep = {
  status: 'loading' | 'complete';
  title: string;
  icon: IContextMenuIconKey;
  valueType?: 'text' | 'tags' | 'list' | 'table' | 'image' | 'link';
  value?: string | string[] | Record<string, any>;
};

// Ai message 的生成图的字段
export interface IArtTextToImageMetadata {
  generateCount: number;
  aspectRatio: string;
  contentType: string;
  resolution: [number, number];
}

// 第三方消息
export interface IThirdChatMessage extends IChatMessage {
  type: 'third';
  text: string;
  messageId: string;
  parentMessageId?: string;
}
