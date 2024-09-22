export abstract class RedisPrefixes {
  public static USER_CONNECTIONS(userId: string) {
    return `USER_CONNECTIONS:${userId}`;
  }
}
