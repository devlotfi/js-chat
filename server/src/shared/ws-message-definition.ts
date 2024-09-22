export abstract class WsEventDefinition<T = never, S = never> {
  public messageType: string;
  public dtoPayload: T;
  public responsePayload: S;
}
