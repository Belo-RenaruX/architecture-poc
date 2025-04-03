import { randomUUID } from 'crypto';

import { jwtDecrypt, JWTPayload, EncryptJWT } from 'jose';

import { IJWTConfig } from './config/jwt.config.ts';

interface generationResponse {
  jwt: string;
  jti: string;
}
export interface IJWTManager<T extends JWTPayload> {
  generateToken(payload: T): Promise<generationResponse>;
  verifyToken(token: string): Promise<T | null>;
}

export class JWTManager<T extends JWTPayload> implements IJWTManager<T> {
  private readonly encryptionKey: Uint8Array;
  private readonly issuer: string;
  private readonly audience: string;
  private readonly expTime: string;

  constructor(jwtConfig: IJWTConfig) {
    this.encryptionKey = new TextEncoder().encode(jwtConfig.secret);
    this.issuer = jwtConfig.issuer;
    this.audience = jwtConfig.audience;
    this.expTime = jwtConfig.expTime;
  }

  public generateToken = async (payload: T): Promise<generationResponse> => {
    const jti = randomUUID();
    const jwt = await new EncryptJWT(payload)
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM', typ: 'JWT' })
      .setIssuedAt()
      .setJti(jti)
      .setIssuer(this.issuer)
      .setAudience(this.audience)
      .setExpirationTime(this.expTime)
      .encrypt(this.encryptionKey);

    return { jwt, jti };
  };

  public verifyToken = async (token: string): Promise<T> => {
    const { payload } = await jwtDecrypt(token, this.encryptionKey, {
      issuer: this.issuer,
      audience: this.audience,
    });

    return payload as T;
  };
}
