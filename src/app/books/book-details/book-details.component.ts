import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { EMPTY, Observable, catchError, concatMap, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  private bs = inject(BookStoreService);
  book$: Observable<Book>;

  constructor() {
    // Pull
    //const isbn = this.route.snapshot.paramMap.get('isbn');

    // Push
    /* this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!;

      this.bs.getSingle(isbn).subscribe(response => {
        this.book = response;
      });
    }); */

    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn')!),
      switchMap(isbn => this.bs.getSingle(isbn)),
      catchError(err => {
        return EMPTY;
      })
    )

    /*.subscribe(book => {
      this.book = book;
    })*/
  }
}
