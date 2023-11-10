import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private http = inject(HttpClient);
  private apiUrl = 'https://api.angular.schule';

  constructor() { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books');
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + '/books/' + isbn);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl + '/books', book);
  }

  search(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books/search/' + query);
  }

  delete(isbn: string) {
    return this.http.delete(this.apiUrl + '/books/' + isbn, { observe: 'response'});
    //return this.http.delete(this.apiUrl + '/books', { observe: 'response'});
  }

}
