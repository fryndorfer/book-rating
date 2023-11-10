import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const ratingMock = {
    rateUp: (b: Book) => b,
    rateDown: (b: Book) => b
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        {
          provide: BookRatingService,
          useValue: ratingMock
        }
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute service.rateUp() for doRateUp()', () => {
    // Arrange
    const service = TestBed.inject(BookRatingService);
    const testBook = { isbn: '123' } as Book;

    spyOn(service, 'rateUp').and.callThrough();

    // Act
    component.doRateUp(testBook);

    // Assert
    expect(service.rateUp).toHaveBeenCalled();
  });
});
