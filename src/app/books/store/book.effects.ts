import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';


@Injectable()
export class BookEffects {
  private bs = inject(BookStoreService);

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() => this.bs.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({
          data: books
        })),
        catchError(err => of(BookActions.loadBooksFailure({
          error: err
        })))
      ))
    )
  })

  constructor(private actions$: Actions) {}
}
