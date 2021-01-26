import { Book } from '../model/book';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly booksSubject$ = new BehaviorSubject<Book[]>([
    {
      id: 0,
      title: 'Angular for nerds',
      author: 'Marek Matczak',
    },
    {
      id: 1,
      title: 'JavaScript. The Good Parts',
      author: 'Douglas Crckford',
    },
    {
      id: 2,
      title: 'Some funny book',
      author: 'John Example',
    },
  ]);

  getAll(): Observable<Book[]> {
    return this.booksSubject$.asObservable();
  }

  update(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>((subscriber) => {
      const copy = { ...bookToUpdate };
      const oldBooks = this.booksSubject$.getValue();
      const newBooks = oldBooks.map((book) => (book.id === copy.id ? copy : book));
      this.booksSubject$.next(newBooks);

      subscriber.next(copy);
      subscriber.complete();
    });
  }
}
