import { Component } from '@angular/core';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';
import { Observable, OperatorFunction } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  readonly matchingBooks$: Observable<Book[]>;
  readonly query$: Observable<string>;

  constructor(
    private readonly books: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.query$ = route.params.pipe(getQueryFromParams(), mapToEmptyStringIfNoQueryParamPresent());
    this.matchingBooks$ = this.query$.pipe(this.getResultsMatchingQuery());
  }

  goToDetails(book: Book): void {
    this.router.navigate(['/books', 'details', book.id]);
  }

  updateUrlOnNewQuery(newQuery: string) {
    this.router.navigate([{ query: newQuery }], { relativeTo: this.route });
  }

  getResultsMatchingQuery: () => OperatorFunction<string, Book[]> = () =>
    switchMap((query) => this.books.search(query));
}

function mapToEmptyStringIfNoQueryParamPresent(): OperatorFunction<string | undefined, string> {
  return map((query) => query || '');
}

function getQueryFromParams(): OperatorFunction<Params, string | undefined> {
  return pluck('query');
}
