import knex from 'knex';
import config from '../../config/config.json';
import { ImageInDB } from '../types/Image';
import Reply from '../types/Reply';
import StorageProvider from '../types/StorageProvider';
import Topic from '../types/Topic';

class SQLStorageProvider implements StorageProvider {
  db = knex({
    client: 'pg',
    connection: {
      host: config.address,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    },
    useNullAsDefault: true,
    searchPath: [config.groupURL.substring(29).replace('/', ''), 'public'],
  });

  async getAllTopics(skip: number, limit: number, needDeleted: boolean, needElite: boolean) {
    const query0 = this.db<Topic>('topicList')
      .select('title', 'topicID', 'authorName', 'authorID', 'lastReplyTime', 'reply', 'isElite')
      .orderBy('lastReplyTime', 'desc')
      .offset(skip)
      .limit(limit);
    const query1 = needDeleted ? query0.whereNotNull('deleteTime') : query0;
    const query2 = needElite ? query1.where('isElite', true) : query1;
    const topics = await query2;
    return topics;
  }

  async getTopic(topicID: string | number) {
    const topic = await this.db<Topic>('topicList')
      .first(
        'title',
        'topicID',
        'authorName',
        'authorID',
        'isElite',
        'content',
        'createTime',
        'deleteTime',
      )
      .where('topicID', '=', Number(topicID));
    return topic || null;
  }

  async getComments(topicID: string | number) {
    const comments = await this.db<Reply>('reply')
      .select('*')
      .where('topicID', '=', topicID)
      .orderBy('replyTime', 'asc');
    return comments;
  }

  async getImg(imgID: string) {
    const img = await this.db<ImageInDB>('image').first('imgContent').where('imgID', imgID);
    if (img) return img.imgContent;
    return null;
  }

  async getPages(deleted: boolean, elite: boolean) {
    const query0 = this.db<Topic>('topicList');
    const query1 = deleted ? query0.whereNotNull('deleteTime') : query0;
    const query2 = elite ? query1.where('isElite', true) : query1;
    const count = await query2.count('topicID');
    return Math.floor(Number(count[0].count) / 50) + 1;
  }
}

export default SQLStorageProvider;
