import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NWordsListComponent } from './n-words-list.component';

describe('NWordsListComponent', () => {
  let component: NWordsListComponent;
  let fixture: ComponentFixture<NWordsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NWordsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NWordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
