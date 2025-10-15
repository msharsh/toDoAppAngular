import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItemList } from './to-do-item-list';

describe('ToDoItemList', () => {
  let component: ToDoItemList;
  let fixture: ComponentFixture<ToDoItemList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoItemList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoItemList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
