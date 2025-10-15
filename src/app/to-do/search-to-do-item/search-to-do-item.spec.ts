import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToDoItem } from './search-to-do-item';

describe('SearchToDoItem', () => {
  let component: SearchToDoItem;
  let fixture: ComponentFixture<SearchToDoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchToDoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchToDoItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
