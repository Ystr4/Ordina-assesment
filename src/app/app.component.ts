import {Component, OnInit} from '@angular/core';
import {WordFrequencyAnalyzer} from '../lib/text-processing/word-frequency-analyzer';
import {FormControl} from '@angular/forms';
import {loremText} from '../../tests/__MOCKS__/lorem-text';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'oridina-text-processing';
  data: any;
  selected: string;
  frequency: { name: string, value: number } | undefined;
  sliderValue: FormControl;
  inputText: FormControl;
  searchWord: FormControl;
  searchWordFrequency: number | undefined;
  frequencyPercentile: number | undefined;

  constructor(private analyzer: WordFrequencyAnalyzer) {
    this.selected = '';
    this.sliderValue = new FormControl();
    this.sliderValue.valueChanges.subscribe(() => this.setData());
    this.sliderValue.setValue('5');

    this.inputText = new FormControl();
    this.inputText.valueChanges.subscribe(() => this.setData());
    this.inputText.setValue(loremText);

    this.searchWord = new FormControl();
    this.searchWord.valueChanges.subscribe(() => this.setSearchWordFrequency());
  }

  ngOnInit(): void {
  }

  onSelect(name: string): void {
    this.selected = name;
  }

  setSearchWordFrequency(): void {
    try {
      const text = this.inputText.value;
      const word = this.searchWord.value;
      if (text && word) {
        this.searchWordFrequency = this.analyzer.calculateFrequencyForWord(text, word);
      }
    } catch (e) {
      // todo: handle errors
      console.error(e);
    }
  }

  setData(): void {
    try {
      const text = this.inputText.value;
      const n = this.sliderValue.value;
      if (text && n) {
        this.data = this.analyzer.calculateMostFrequentNWords(text, n).map(word => {
          return {
            name: word.getWord(),
            value: word.getFrequency()
          };
        });
        if (this.data.length > 0) {
          this.frequency = this.data[0];
        }
      }
    } catch (e) {
      // todo: handle errors
      console.error(e);
    }

  }
}
