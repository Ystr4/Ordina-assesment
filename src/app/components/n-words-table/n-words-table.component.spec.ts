import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NWordsTableComponent } from './n-words-table.component';
import {MatTableModule} from '@angular/material/table';

describe('NWordsTableComponent', () => {
  let component: NWordsTableComponent;
  let fixture: ComponentFixture<NWordsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NWordsTableComponent ],
      imports: [ MatTableModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NWordsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
