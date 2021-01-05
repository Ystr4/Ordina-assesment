import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-n-words-list',
  templateUrl: './n-words-table.component.html',
  styleUrls: ['./n-words-table.component.css']
})
export class NWordsTableComponent implements OnInit {
  @Input() items: { name: string; value: number; }[] | undefined;
  displayedColumns: string[] = ['name', 'value'];

  constructor() { }

  ngOnInit(): void {
  }
}
