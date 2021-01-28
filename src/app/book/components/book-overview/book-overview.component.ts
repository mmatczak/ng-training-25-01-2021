import { Component } from '@angular/core';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  readonly matchingBooks$: Observable<Book[]>;
  readonly query$: Observable<string>;

  constructor(books: BookService, private readonly route: ActivatedRoute, private readonly router: Router) {
    this.query$ = route.params.pipe(
      pluck('query'),
      map((query) => query || ''),
    );
    this.matchingBooks$ = this.query$.pipe(switchMap((query) => books.search(query)));
  }

  goToDetails(book: Book): void {
    this.router.navigate(['/books', 'details', book.id]);
  }

  updateUrlOnNewQuery(newQuery: string) {
    this.router.navigate([{ query: newQuery }], { relativeTo: this.route });
  }
}
