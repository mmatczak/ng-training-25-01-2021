import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ba-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent {
  @Input()
  set query(newQuery: string | undefined | null) {
    this.searchForm.setValue({ query: newQuery || '' });
  }

  @Output()
  queryChange = new EventEmitter<string>();

  readonly searchForm: FormGroup;

  constructor() {
    this.searchForm = new FormGroup({
      query: new FormControl(),
    });
  }

  notifyOnQueryChange(): void {
    const newQuery: string = this.searchForm.get('query')?.value || '';
    this.queryChange.emit(newQuery);
  }
}
