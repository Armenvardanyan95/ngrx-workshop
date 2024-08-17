import { createFeature } from '@ngrx/store';
import { _transactionReducer } from './reducer';


// export const transactionFeature = (state: Transaction) => state;

// export const selectFeatureList = createSelector(
//   transactionFeature,
//   (state: Transaction) => state
// );

export const selectTransactions = createFeature({
    name: 'transactions',
    reducer: _transactionReducer,
})

// export const transactionsFeature = createFeature({
//     name: 'transactions',
//     reducer: transactionReducer,

// })
