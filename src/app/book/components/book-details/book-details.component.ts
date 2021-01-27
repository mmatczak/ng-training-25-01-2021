import { Component } from '@angular/core';
import { Book } from '../../model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

type FormModel = Omit<Book, 'id'>;

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  book: Book | undefined;

  readonly bookForm: FormGroup;

  constructor(route: ActivatedRoute, private readonly books: BookService, private readonly router: Router) {
    this.bookForm = new FormGroup({
      author: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    });
    this.book = route.snapshot.data['book'];
    if (this.book) {
      const bookFormModel: FormModel = {
        author: this.book.author,
        title: this.book.title,
      };
      this.bookForm.patchValue(bookFormModel);
    }
  }

  save() {
    if (this.bookForm.valid) {
      const bookProps = this.bookForm.value as FormModel;
      const updatedBook: Book = {
        id: this.book?.id,
        author: bookProps?.author || '',
        title: bookProps?.title || '',
      };
      this.books.saveOrUpdate(updatedBook).subscribe(() => this.router.navigateByUrl('/books'));
    }
  }
}
