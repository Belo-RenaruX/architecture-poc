export interface IJWTConfig {
  readonly secret: string;
  readonly issuer: string;
  readonly audience: string;
  readonly expTime: string;
}

export class JWTConfigSession implements IJWTConfig {
  public readonly secret: string = 'super-secret';
  public readonly issuer: string = 'architecture-poc';
  public readonly audience: string = 'user-flow';
  public readonly expTime: string = '1h';
}
