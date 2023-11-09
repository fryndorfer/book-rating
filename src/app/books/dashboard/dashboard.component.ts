import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../shared/book';
import { BookComponent } from "../book/book.component";
import { BookRatingService } from '../shared/book-rating.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [CommonModule, BookComponent]
})
export class DashboardComponent {
  books: Book[] = [];
  private rs = inject(BookRatingService);

  constructor() {
    this.books = [
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        rating: 5,
        price: 42.90
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        rating: 3,
        price: 36.90
      }
    ];
  }

  doRateUp(book: Book) {
    const rBook = this.rs.rateUp(book);
    this.updateList(rBook);
  }

  doRateDown(book: Book) {
    const rBook = this.rs.rateDown(book);
    this.updateList(rBook);
  }

  private updateList(rBook: Book){
    this.books = this.books.map(b => {
      if (b.isbn === rBook.isbn) {
        return rBook;
      } else {
        return b;
      }
    });
  }
}
