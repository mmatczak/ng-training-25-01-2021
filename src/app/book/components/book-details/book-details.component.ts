import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../model/book';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  @Input()
  book: Book | undefined;

  @Output()
  bookChange = new EventEmitter<Book>();

  constructor() {}

  notifyOnBookChange(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const authorInput = form.querySelector<HTMLInputElement>('input#author');
    const titleInput = form.querySelector<HTMLInputElement>('input#title');

    const updatedBook: Book = {
      id: this.book?.id,
      author: authorInput?.value || '',
      title: titleInput?.value || '',
    };
    this.bookChange.emit(updatedBook);
  }
}
