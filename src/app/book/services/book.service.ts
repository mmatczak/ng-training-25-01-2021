import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BookService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books');
  }

  saveOrUpdate(bookToUpdate: Book): Observable<Book> {
    let newOrUpdatedBook = { ...bookToUpdate };
    if (bookToUpdate.id != null) {
      return this.http.put<Book>(`api/books/${bookToUpdate.id}`, newOrUpdatedBook);
    } else {
      return this.http.post<Book>('api/books', newOrUpdatedBook);
    }
  }

  getOne(id: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${id}`);
  }
}
