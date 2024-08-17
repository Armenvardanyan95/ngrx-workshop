import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transaction } from '../types/transaction.type';

export const transactionActions = createActionGroup({
  source: '[Transactions]',
  events: {
    'Load transactions':         emptyProps(),// should be empty props
    'Load transactions Success': props<{ transactions: Transaction[] }>(),
    'Load transactions Failure': props<{ error: unknown }>(),

    'Add new transaction': emptyProps(),
    'Add new transaction Success': props<{ transactions: Transaction[] }>(),
    'Add new transaction Failure': props<{ error: unknown }>(),
  },
});
