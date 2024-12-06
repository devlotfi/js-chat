export abstract class WsClientServerEventDefinition<T = never, S = never> {
  public messageType: string;
  public clientPayload: T;
  public serverPayload: S;
}

export abstract class WsServerEventDefinition<T = never> {
  public messageType: string;
  public serverPayload: T;
}

export abstract class WsClientEventDefinition<T = never> {
  public messageType: string;
  public clientPayload: T;
}

export abstract class WsEmptyEventDefinition {
  public messageType: string;
}
