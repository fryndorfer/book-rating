import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../shared/book';
import { BookComponent } from "../book/book.component";
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

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
  private bs = inject(BookStoreService);
  dateTime: Date = new Date();
  timer: any;

  constructor() {
    this.loadBooks();
    this.timer = setInterval(() => {
      this.dateTime = new Date();
      console.log(this.dateTime);
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
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

  deleteBook(book: Book) {
    const del = this.bs.delete(book.isbn).subscribe(response => {
      if(response.status == 200) {
        this.loadBooks();
      }
    })
  }

  loadBooks(){
    this.bs.getAll().subscribe(books => {
    this.books = books;
    });
  }
}
