export interface IEncryptionConfig {
  readonly iterations: number;
  readonly digest: string;
  readonly encoding: BufferEncoding;
  readonly keyLength: number;
  readonly saltLength: number;
}

export class EncryptionConfigSha512 implements IEncryptionConfig {
  public readonly iterations: number = 500;
  public readonly digest: string = 'sha512';
  public readonly encoding: BufferEncoding = 'hex';
  public readonly keyLength: number = 64;
  public readonly saltLength: number = 16;
}
