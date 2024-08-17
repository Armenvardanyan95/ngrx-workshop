import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TransactionService } from '../services/transaction.service';

import { transactionActions } from './actions';

export const loadTransactions = createEffect(
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
