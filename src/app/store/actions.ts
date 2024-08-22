import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transaction } from '../types/transaction.type';

export const transactionActions = createActionGroup({
  source: '[Transactions]',
  events: {
    'Load transactions':         emptyProps(),
    'Load transactions Success': props<{ transactions: Transaction[] }>(),
    'Load transactions Failure': props<{ error: unknown }>(),

    'Add new transaction': props<{ transaction: Transaction }>(),
    'Add new transaction Success': props<{ transaction: Transaction[] }>(),
    'Add new transaction Failure': props<{ error: unknown }>(),
  },
});
