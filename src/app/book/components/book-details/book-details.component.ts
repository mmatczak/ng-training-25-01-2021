import { Component } from '@angular/core';
import { Book } from '../../model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  book: Book | undefined;

  constructor(route: ActivatedRoute, private readonly books: BookService, private readonly router: Router) {
    this.book = route.snapshot.data['book'];
  }

  save(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const authorInput = form.querySelector<HTMLInputElement>('input#author');
    const titleInput = form.querySelector<HTMLInputElement>('input#title');

    const updatedBook: Book = {
      id: this.book?.id,
      author: authorInput?.value || '',
      title: titleInput?.value || '',
    };

    this.books.saveOrUpdate(updatedBook).subscribe(() => this.router.navigateByUrl('/books'));
  }
}
