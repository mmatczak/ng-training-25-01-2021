import { Component } from '@angular/core';
import { Book } from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  readonly books: Book[];
  selectedBook: Book | null;

  constructor() {
    this.selectedBook = null;
    this.books = [
      {
        title: 'Angular for nerds',
        author: 'Marek Matczak',
      },
      {
        title: 'JavaScript. The Good Parts',
        author: 'Douglas Crckford',
      },
      {
        title: 'Some funny book',
        author: 'John Example',
      },
    ];
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }
}
