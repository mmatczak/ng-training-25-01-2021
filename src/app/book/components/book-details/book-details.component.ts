import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Book } from '../../model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type FormModel = Omit<Book, 'id'>;

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnDestroy {
  book: Book | undefined;

  readonly bookForm: FormGroup;

  private unsubscribe$ = new Subject();

  constructor(
    route: ActivatedRoute,
    private readonly books: BookService,
    private readonly router: Router,
    private readonly location: Location,
  ) {
    this.bookForm = new FormGroup({
      author: new FormControl('', [Validators.required, Validators.maxLength(20)]),
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
      this.books
        .saveOrUpdate(updatedBook)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.location.back());
    }
  }

  getErrorMessagesFor(control: AbstractControl | null): string[] {
    const errors = control?.errors;
    return errors
      ? Object.keys(errors).map((errorCode) => {
          switch (errorCode) {
            case 'required':
              return 'Please provide a value';
            case 'maxlength':
              return `The value is too long: max is ${errors[errorCode].requiredLength} character(s)`;
            default:
              return 'Unknown error';
          }
        })
      : [];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
