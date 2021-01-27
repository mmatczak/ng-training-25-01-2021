import { BookDetailsComponent } from './book-details.component';
import { Book } from '../../model/book';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookOverviewComponent } from '../book-overview/book-overview.component';

describe('BookDetailsComponent', () => {
  let testBook: Book;
  let updatedAuthor = 'Updated Author';

  beforeEach(() => {
    testBook = { id: 1, author: 'Test Author', title: 'Test title' };
    updatedAuthor = 'Updated Author';
  });

  describe('(class)', () => {
    it('notifies about current book', () => {
      // given
      const eventMock: any = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector(selector: string) {
            return selector === 'input#author' ? { value: updatedAuthor } : { value: 'Updated Title' };
          },
        },
      };

      const component = new BookDetailsComponent();
      component.book = testBook;
      component.bookChange.subscribe((book: Book) => {
        // then
        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(book.id).toBe(testBook.id);
        expect(book.author).toBe(updatedAuthor);
        expect(book.title).toBe('Updated Title');
      });
      // when
      component.save(eventMock);
    });
  });

  describe('(DOM)', () => {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let component: BookDetailsComponent;
    let element: HTMLElement;

    beforeEach(() => {
      return TestBed.configureTestingModule({
        declarations: [BookOverviewComponent],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent<BookDetailsComponent>(BookDetailsComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    it('renders the author and the title from input property in input fields', () => {
      // given
      // when
      component.book = testBook;
      fixture.detectChanges();
      // then
      const authorInput = element.querySelector<HTMLInputElement>('#author');
      expect(authorInput?.value).toBe(testBook.author);
      const titleInput = element.querySelector<HTMLInputElement>('#title');
      expect(titleInput?.value).toBe(testBook.title);
    });

    it('notifies about book change on submit', () => {
      // given
      component.book = testBook;
      fixture.detectChanges();
      const authorInput = element.querySelector<HTMLInputElement>('#author');
      if (authorInput) {
        authorInput.value = updatedAuthor;
      } else {
        fail('The author input could not be found');
      }
      component.bookChange.subscribe((book: Book) => {
        // then
        expect(book.id).toBe(testBook.id);
        expect(book.author).toBe(updatedAuthor);
        expect(book.title).toBe(testBook.title);
      });
      // when
      const submitButton = element.querySelector<HTMLButtonElement>('button');
      submitButton?.click();
    });
  });
});
