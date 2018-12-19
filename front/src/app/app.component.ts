import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app-store.module';
import { SetInitialUser } from './store/actions/auth.action';
import { MessageService } from 'primeng/components/common/messageservice';
import { viewParentEl } from '@angular/core/src/view/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ideas-app';

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService
  ){}
  
  ngOnInit() {
    this.store.dispatch(new SetInitialUser())
    this.store
      .select(state => state.error)
      .subscribe(val => this.showError(val.error))
  }

  showError(err){
    if (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: err.message || 'Internal server error'
      })
    }
  }
}
