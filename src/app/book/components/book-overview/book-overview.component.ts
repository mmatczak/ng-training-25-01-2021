import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinct, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent implements OnDestroy, AfterViewInit {
  @ViewChild('mySearch')
  searchInput: ElementRef | undefined;
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

  ngAfterViewInit(): void {
    const mySearchInput = this.searchInput?.nativeElement;
    fromEvent<Event>(mySearchInput, 'input')
      .pipe(
        map((event) => {
          const currentInputTarget = event.target as HTMLInputElement;
          return currentInputTarget.value;
        }),
        debounceTime(500),
        distinct(),
        switchMap((query) => this.books.getAll()),
      )
      .subscribe((books: Book[]) => {
        console.log(books);
      });
  }
}
