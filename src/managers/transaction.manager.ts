import { Kysely, Transaction, TransactionBuilder } from 'kysely';

import { Database } from '../clients/mysql.client.ts';

export interface ITransactionManager {
  runTransaction<T>(callback: (trx: Transaction<Database>) => Promise<T>): Promise<T>;
}

export class TransactionManager implements ITransactionManager {
  private readonly baseTransactions: TransactionBuilder<Database>;

  constructor(db: Kysely<Database>) {
    this.baseTransactions = db.transaction();
  }

  public runTransaction = async <T>(callback: (trx: Transaction<Database>) => Promise<T>): Promise<T> => {
    return this.baseTransactions.execute(callback);
  };
}
