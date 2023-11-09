import { TestBed } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';
import { Book } from './book';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingService);

    book = {
      isbn: '111',
      title: 'Dummy',
      description: 'What a dummy',
      rating: 4,
      price: 100
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increase rating by one', () => {
    book.rating = 3;

    const rBook = service.rateUp(book);

    expect(rBook.rating).toBe(4);
  });

  it('should decrease rating by one', () => {
    book.rating = 3;

    const rBook = service.rateDown(book);

    expect(rBook.rating).toBe(2);
  });

  it('should not be lower than one', () => {
    book.rating = 2;

    const rBook = service.rateDown(book);

    expect(rBook.rating).not.toBeLessThan(1);
  });

  it('should not be higher than five', () => {
    book.rating = 4;

    const rBook = service.rateUp(book);

    expect(rBook.rating).not.toBeGreaterThan(5);
  });
});
