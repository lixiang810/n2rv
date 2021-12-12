export default interface Topic {
  title: string;
  authorID: string;
  authorName: string;
  reply: number;
  lastReplyTime: number | null;
  topicID: string;
  isElite: boolean;
  content: string | null;
  lastFetchTime: number | null;
  createTime: number | null;
  deleteTime: number | null;
}

export type TopicWhileGetAll = Pick<
  Topic,
  'title' | 'topicID' | 'authorName' | 'authorID' | 'lastReplyTime' | 'reply' | 'isElite'
>;
