import { Component } from '@angular/core';
import { Book } from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  books: Book[];
  selectedBook: Book | null;

  constructor() {
    this.selectedBook = null;
    this.books = [
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
    ];
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBooksOn(bookToUpdate: Book) {
    this.books = this.books.map((book) => (book.id === bookToUpdate.id ? bookToUpdate : book));
    this.selectedBook = bookToUpdate;
  }
}
