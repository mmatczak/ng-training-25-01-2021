import { Book } from '../model/book';
import { BehaviorSubject, Observable } from 'rxjs';

export class BookService {
  private idSeq = 0;
  private readonly booksSubject$ = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      title: 'Angular for nerds',
      author: 'Marek Matczak',
    },
    {
      id: this.idSeq++,
      title: 'JavaScript. The Good Parts',
      author: 'Douglas Crckford',
    },
    {
      id: this.idSeq++,
      title: 'Some funny book',
      author: 'John Example',
    },
  ]);

  getAll(): Observable<Book[]> {
    return this.booksSubject$.asObservable();
  }

  saveOrUpdate(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>((subscriber) => {
      let newOrUpdatedBook: Book;
      let newBooks: Book[];
      const oldBooks = this.booksSubject$.getValue();

      if (bookToUpdate.id != null) {
        newOrUpdatedBook = { ...bookToUpdate };
        newBooks = oldBooks.map((book) => (book.id === newOrUpdatedBook.id ? newOrUpdatedBook : book));
      } else {
        newOrUpdatedBook = { ...bookToUpdate, id: this.idSeq++ };
        newBooks = [...oldBooks, newOrUpdatedBook];
      }
      this.booksSubject$.next(newBooks);

      subscriber.next(newOrUpdatedBook);
      subscriber.complete();
    });
  }

  getOne(id: number): Observable<Book> {
    return new Observable<Book>((subscriber) => {
      const currentBooks = this.booksSubject$.getValue();
      const foundBook = currentBooks.find((book) => book.id === id);
      if (foundBook) {
        subscriber.next(foundBook);
        subscriber.complete();
      } else {
        subscriber.error(`Book with id ${id} could not be found`);
      }
    });
  }
}
