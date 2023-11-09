import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../shared/book';
import { RatingComponent } from '../shared/rating.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input({ required: true}) book?: Book;
  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }
}
