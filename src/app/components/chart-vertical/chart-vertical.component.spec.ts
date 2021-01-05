import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVerticalComponent } from './chart-vertical.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ChartVerticalComponent', () => {
  let component: ChartVerticalComponent;
  let fixture: ComponentFixture<ChartVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartVerticalComponent ],
      imports: [
        NgxChartsModule,
        NoopAnimationsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
