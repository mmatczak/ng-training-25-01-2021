import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Book } from '../../model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

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
      title: new FormControl('', [Validators.required, contains('JavaScript')], this.validateIfTitleAlreadyExist),
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  validateIfTitleAlreadyExist: AsyncValidatorFn = (control: AbstractControl) => {
    const value: string = control.value;
    if (value) {
      return this.books.search(value).pipe(
        map((books) => {
          return books && books.length > 0 ? { titleAlreadyUsed: true } : null;
        }),
      );
    }

    return of(null);
  };
}

function contains(text: string): ValidatorFn {
  return function containsValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (value && value.indexOf(text) === -1) {
      return {
        contains: { text },
      };
    }
    return null;
  };
}
