import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '../@store/counter/counter.reducers';

const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
  },
];
@NgModule({
  declarations: [CounterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('counter', counterReducer),
  ],
})
export class CounterModule {}
