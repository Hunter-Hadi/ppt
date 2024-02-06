import {
  IChatMessage,
  IChatUploadFile,
} from '@/features/share_conversation/types';

export type ISidebarConversationType = 'Chat' | 'Summary' | 'Search' | 'Art';

// debugger
export type IAIProviderType = string;

export interface IChatConversation {
  authorId: string; // 作者ID
  id: string; // 对话ID
  title: string; // 对话标题
  created_at: string; // 创建时间
  updated_at: string; // 更新时间
  messages: IChatMessage[]; // 对话中的消息列表
  type: ISidebarConversationType; // 对话类型
  meta: IChatConversationMeta; // 对话元数据
  isDelete: boolean; // 软删除
  share?: IChatConversationShareConfig; // 分享配置
  version?: number; // 版本号 - 2024-01-22后用2.0, 在此之前需要上传到后端
}

// 元数据
export interface IChatConversationMeta {
  AIProvider?: IAIProviderType; // AI提供商
  AIModel?: string; // AI模型
  AIConversationId?: string; // AI对话ID
  systemPrompt?: string; // 系统提示
  maxTokens?: number; // 最大生成长度
  maxHistoryCount?: number; // 最大历史记录数
  temperature?: number; // 温度
  topP?: number; // topP
  docId?: string; // 聊天文档id
  // lastRunActions?: ISetActionsType // 最后运行的shortcuts
  // lastRunActionsParams?: IShortCutsParameter[] // 最后运行的shortcuts的params, 在regenerate/retry时用到
  // lastRunActionsMessageId?: string // 最后运行的shortcuts的messageID, 在regenerate/retry时用到
  attachments?: IChatUploadFile[]; // 附件
  [key: string]: any;
}

// 分享配置
export interface IChatConversationShareConfig {
  enabled?: boolean;
  shareType?: 'public' | 'private';
  shareId?: string;
}
