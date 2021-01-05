import {WordFrequencyInterface} from '../interfaces/word-frequency-interface';

export class WordFrequency implements WordFrequencyInterface {
  constructor(private readonly frequency: number, private readonly word: string) {
  }
  getFrequency(): number {
    return this.frequency;
  }

  getWord(): string {
    return this.word;
  }
}
