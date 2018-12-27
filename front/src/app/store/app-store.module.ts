import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { RouterReducerState, routerReducer, StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store'

import { ErrorState, errorReducer } from './reducers/errors.reducer';
import { AuthEffects } from './effects/auth.effects';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { RouterStateUrl, CustomSerializer } from './reducers/router.reducer';

export interface AppState {
  error: ErrorState,
  auth: AuthState,
  router: RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<AppState> = {
  error: errorReducer,
  auth: authReducer,
  router: routerReducer
}

export const effects = [
    AuthEffects
]

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ],
  declarations: []
})
export class AppStoreModule { }
