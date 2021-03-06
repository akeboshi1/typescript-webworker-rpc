import { RPCChannel } from './types';

type ErrorHandler = (error: ErrorEvent | Error) => void;

export class AbstractRPC {
  private errorHandler?: ErrorHandler | null = null;

  public constructor(protected readonly channel: RPCChannel) {
    this.channel.addEventListener('error', this.fireError);
  }

  public onError = (handler: ErrorHandler) => {
    this.errorHandler = handler;
    return this;
  };

  protected fireError = (error: ErrorEvent | Error) => {
    if (this.errorHandler) {
      this.errorHandler(error);
    }
  };
}
