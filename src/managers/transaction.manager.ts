import { Kysely, Transaction, TransactionBuilder } from "kysely";
import { Database } from "../clients/mysql.client";

export interface ITransactionManager {
  runTransaction<T>(callback: (trx: Transaction<Database>) => Promise<T>): Promise<T>;
}

export class TransactionManager implements ITransactionManager {
  private baseTransactions: TransactionBuilder<Database>

  constructor(db: Kysely<Database>) {
    this.baseTransactions = db.transaction();
  }

  async runTransaction<T>(callback: (trx: Transaction<Database>) => Promise<T>): Promise<T> {
    return this.baseTransactions.execute(callback);
  }
}