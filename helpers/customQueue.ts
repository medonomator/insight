import { logger } from '../helpers/logger';

class CustomQueue {
  private static instance: CustomQueue;
  private _storage = [];

  public static Init(): CustomQueue {
    if (!CustomQueue.instance) {
      CustomQueue.instance = new CustomQueue();
    }
    return CustomQueue.instance;
  }

  public enqueue(data) {
    logger.info('Push data in queue');
    this._storage.push(data);

    this.eventLoop();
  }

  private dequeue() {
    if (this._storage.length) {
      return this._storage.shift();
    }

    logger.warn('Queue is empty!');
  }

  public size() {
    return this._storage.length;
  }

  private async eventLoop() {
    const data = this.dequeue();
    try {
      if (data) {
        data();
      }

      if (this._storage.length) {
        this.eventLoop();
      }
    } catch (error) {
      if (data) {
        this._storage.push(data);
      }
      logger.error(error);
    }
  }
}

export default CustomQueue.Init();
