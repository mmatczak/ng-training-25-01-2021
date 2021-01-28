import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../../model/book';

@Component({
  selector: 'ba-book-results',
  templateUrl: './book-results.component.html',
  styleUrls: ['./book-results.component.scss'],
})
export class BookResultsComponent {
  @Input()
  results: Book[] | undefined | null;

  @Output()
  bookClick = new EventEmitter<Book>();

  notifyOnBookClick(book: Book): void {
    this.bookClick.emit(book);
  }
}
