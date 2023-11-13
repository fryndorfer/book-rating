import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

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
  book?: Book;

  constructor() {
    // Pull
    //const isbn = this.route.snapshot.paramMap.get('isbn');

    // Push
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!;

      this.bs.getSingle(isbn).subscribe(response => {
        this.book = response;
      });
    });
  }
}
