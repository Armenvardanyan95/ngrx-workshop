import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../types/transaction.type';
import { transactionActions } from './actions';
// import  {transactionActions} from './actions.ts';

export const initialState: Transaction[]=[];

export const _transactionReducer = createReducer(
    initialState,
    // on(
    //   transactionActions.loadTransactions,state=> ({...state, ...transactionActions }),
    // )),


    // load transactions
    on(transactionActions.loadTransactionsSuccess, (state, {transactions})=> ({...state, transactions})),
    // add new transaction
    on(transactionActions.addNewTransactionSuccess, state=> ({...state, ...transactionActions})),

);