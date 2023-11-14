import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { Router } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  constructor(private router: Router) { }
  private bs = inject(BookStoreService);

  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(255)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.maxLength(255)
      ]
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.min(1),
        Validators.max(5)
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.max(10000),
        Validators.min(0)
      ]
    })
  })

  isInvalid(controlName: keyof typeof this.bookForm.controls): boolean {
    const control = this.bookForm.controls[controlName];
    return control.touched && control.invalid;
  }

  hasError(controlName: keyof typeof this.bookForm.controls, code: string): boolean {
    const control = this.bookForm.controls[controlName];
    return control.touched && control.hasError(code);
  }

  submitForm() {
    if (this.bookForm.invalid) {
      return;
    }

    const book: Book = this.bookForm.getRawValue();
    this.bs.create(book).subscribe({
      next: response => {
        this.router.navigate(['/books', response.isbn]);
      },
      error: problem => {
        console.log(problem);
      }
    });
    //this.router.navigateByUrl('/books');
  }
}
