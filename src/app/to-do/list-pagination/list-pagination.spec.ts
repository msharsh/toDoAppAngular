import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPagination } from './list-pagination';

describe('ListPagination', () => {
  let component: ListPagination;
  let fixture: ComponentFixture<ListPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
