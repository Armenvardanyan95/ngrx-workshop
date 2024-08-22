import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { TransactionService } from '../services/transaction.service';

import { transactionActions } from './actions';

export const loadTransactionsEffect = createEffect(
  (
    actions$ = inject(Actions),
    transactionsService = inject(TransactionService)
  ) => {
    return actions$.pipe(
      ofType(transactionActions.loadTransactions),
      switchMap(() =>
        transactionsService.loadTransactions().pipe(
          map((transactions) =>
            transactionActions.loadTransactionsSuccess({ transactions })
          ),
          catchError((error: { message: string }) =>
            of(transactionActions.loadTransactionsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const addTransactionsEffect = createEffect(
  (
    actions$ = inject(Actions),
    transactionsService = inject(TransactionService)
  ) => {
    return actions$.pipe(
      ofType(transactionActions.addNewTransaction),
      switchMap(({ transaction }) =>
        transactionsService.addTransaction(transaction).pipe(
          map(() => transactionActions.addNewTransactionSuccess({  transaction: [transaction] })), // what's the meaning of giving to transaction: [transaction]
          catchError((error) => of(transactionActions.addNewTransactionFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);
