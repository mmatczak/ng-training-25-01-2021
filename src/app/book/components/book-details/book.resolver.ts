import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Book } from '../../model/book';
import { Observable, OperatorFunction, throwError } from 'rxjs';
import { BookService } from '../../services/book.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BookResolver implements Resolve<Book> {
  constructor(private readonly books: BookService, private readonly router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookIdAsString = route.paramMap.get('bookId');
    if (bookIdAsString) {
      const bookId = +bookIdAsString;
      if (!isNaN(bookId)) {
        return this.books.getOne(bookId).pipe(this.goToBookDetailsOnError());
      }
    }
    return throwError(`Could not find a book with id ${bookIdAsString}`).pipe(this.goToBookDetailsOnError());
  }

  goToBookDetailsOnError: () => OperatorFunction<Book, Book> = () =>
    catchError((error) => {
      setTimeout(() => this.router.navigateByUrl('/books/details'));
      return throwError(error);
    });
}

// function goToBookDetailsOnError(router: Router): OperatorFunction<Book, Book> {
//   return catchError((error) => {
//     setTimeout(() => router.navigateByUrl('/books/details'));
//     return throwError(error);
//   });
// }
