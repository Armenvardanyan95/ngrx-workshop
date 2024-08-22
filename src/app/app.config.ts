import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import * as transactionEffects from './store/effects';
import { provideState, provideStore } from '@ngrx/store';
import { selectTransactions } from './store/selectors';

  export const appConfig: ApplicationConfig = {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideAnimationsAsync(),
      provideHttpClient(withFetch()),
      provideEffects(transactionEffects),
      provideStore(),
      provideState(selectTransactions),
      provideStoreDevtools({
          maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      })
  ],
  };
