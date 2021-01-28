import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';
import { RouterModule } from '@angular/router';
import { BookOverviewComponent } from './book/components/book-overview/book-overview.component';
import { BookDetailsComponent } from './book/components/book-details/book-details.component';
import { BookResolver } from './book/components/book-details/book.resolver';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    BookModule.forRoot(),
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/books' },
      {
        path: 'books',
        children: [
          {
            path: '',
            component: BookOverviewComponent,
          },
          {
            path: 'details',
            children: [
              {
                path: '', // new book
                component: BookDetailsComponent,
              },
              {
                path: ':bookId', // existing book
                component: BookDetailsComponent,
                resolve: {
                  book: BookResolver,
                },
              },
            ],
          },
        ],
      },

      // {
      //   path: '/books',
      //   component: BookOverviewComponent
      // },
      // {
      //   path: '/books/details/:id',
      //   component: BookDetailsComponent
      // },
      // {
      //   path: '/books/details',
      //   component: BookDetailsComponent
      // }
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
