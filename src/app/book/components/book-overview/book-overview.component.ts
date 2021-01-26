import { Component, OnDestroy } from '@angular/core';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent implements OnDestroy {
  readonly books$: Observable<Book[]>;
  selectedBook: Book | null;
  private readonly books: BookService;

  private readonly subscriptions: Subscription[] = [];

  constructor(books: BookService) {
    this.books = books;
    this.selectedBook = null;
    this.books$ = books.getAll();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBooksOn(bookToUpdate: Book) {
    this.subscriptions.push(
      this.books.update(bookToUpdate).subscribe((updatedBook) => (this.selectedBook = updatedBook)),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
