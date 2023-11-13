import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', loadChildren: () => import('./books/books.routes').then(i => i.booksRoutes)},
  { path: '**', redirectTo: 'books'}
];
