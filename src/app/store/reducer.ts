import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../types/transaction.type';
import { transactionActions } from './actions';

export const initialState: Transaction[] = [];

export const _transactionReducer = createReducer(
  initialState,
  // load transactions
  on(transactionActions.loadTransactions, (state) => ({ ...state })),
  on(transactionActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
  })),
  on(transactionActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // add new transaction
  on(transactionActions.addNewTransaction, (state) => ({ ...state })),
  on(transactionActions.addNewTransactionSuccess, (state, { transaction }) => ({
    ...state,
    transactions: [...state, transaction],
  }))
);
