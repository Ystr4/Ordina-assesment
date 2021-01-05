import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-chart-vertical',
  templateUrl: './chart-vertical.component.html',
  styleUrls: ['./chart-vertical.component.css']
})
export class ChartVerticalComponent {
  @Input() data: {name: string, value: number}[];
  @Output() event = new EventEmitter<string>();

  view: [number, number] = [Math.min(window.innerWidth / 1.35, 1090), 550];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Words';
  showYAxisLabel = true;
  yAxisLabel = 'Frequency';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    this.data = [];
  }

  onSelect(event: {name: string, frequency: number}): void {
    this.event.emit(event.name);
  }

  onResize(event: any): void {
    this.view = [event.target.innerWidth / 1.35, 550];
  }
}
