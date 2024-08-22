import { DatePipe, AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Transaction } from '../types/transaction.type';
import { AddTransactionComponent } from './add-transaction.component';
import { map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTransactions } from '../store/selectors';
import { transactionActions } from '../store/actions';

@Component({
  selector: 'app-transactions',
  template: `
    <mat-card appearance="outlined">
      <button mat-raised-button (click)="openDialog('expense')">
        Add Expense
      </button>
      <button mat-raised-button (click)="openDialog('income')">
        Add Income
      </button>
      <table
        [dataSource]="transactions$" 
        mat-table
        class="mat-elevation-z8"
      >
        <!-- Description Column -->
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.description }}
          </td>
        </ng-container>

        <!-- Amount Column -->
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Amount</th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.amount }}
          </td>
        </ng-container>

        <!-- Date Column -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.date | date }}
          </td>
        </ng-container>

        <!-- Category Column -->
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Category</th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.category }}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </mat-card>
  `,
  styles: `
    mat-card {
        width: 90%;
        margin: auto;
    }
  `,
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    AsyncPipe,
    NgIf,
  ],
})
export class TransactionsComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);

  transactions$: Observable<Transaction[]> = this.store.select(
    selectTransactions.selectTransactionsState
  );
  displayedColumns: string[] = ['description', 'amount', 'date', 'category'];

  ngOnInit() {
    this.store.dispatch(transactionActions.loadTransactions());
  }

  openDialog(type: 'expense' | 'income') {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      data: {
        type: type,
      },
    });

    dialogRef.componentInstance.added.subscribe(() => {
      this.store.dispatch(transactionActions.loadTransactions());
      dialogRef.close();
    });
  }
}
