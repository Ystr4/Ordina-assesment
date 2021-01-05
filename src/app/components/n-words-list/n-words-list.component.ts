import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-n-words-list',
  templateUrl: './n-words-list.component.html',
  styleUrls: ['./n-words-list.component.css']
})
export class NWordsListComponent implements OnInit {
  @Input() items: { name: string; value: number; }[] | undefined;
  displayedColumns: string[] = ['name', 'value'];

  constructor() { }

  ngOnInit(): void {
  }
}
