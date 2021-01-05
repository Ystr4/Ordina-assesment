import {WordFrequencyAnalyzerInterface} from '../interfaces/word-frequency-analyzer-interface';
import {WordFrequency} from './word-frequency';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordFrequencyAnalyzer implements WordFrequencyAnalyzerInterface {
  readonly regex = /\b[a-z']+\b/igm;
  readonly singleWordRegex = /^[a-z']+$/i;

  private static customSort(a: WordFrequency, b: WordFrequency): number {
      if (b.getFrequency() < a.getFrequency()) {
        return -1;
      }
      if (b.getFrequency() > a.getFrequency()) {
        return 1;
      }
      if (b.getWord() > a.getWord()) {
        return -1;
      }
      if (b.getWord() < a.getWord()) {
        return 1;
      }
      return 0;
  }

  calculateHighestFrequency(text: string): number {
    const frequencies = this.extractWordsToArray(text).map(word => word.getFrequency());
    // Math.max returns -infinity if frequencies array is empty
    return frequencies.length > 0 ? Math.max.apply(null, frequencies) : -1;
  }

  calculateFrequencyForWord(text: string, word: string): number {
    word = word.trim();
    if (!this.singleWordRegex.test(word)) {
      throw Error(`${word} is not a valid word`);
    }
    if (!text) {
      throw Error('text null');
    }
    const searchParam = new RegExp(`\\b${word}\\b`, 'igm');
    const filtered = text.match(searchParam) || [];
    return filtered.length;
  }

  calculateMostFrequentNWords(text: string, n: number): WordFrequency[] {
    if (n < 0) {
      throw Error(`n has to be positive`);
    }

    const words = this.extractWordsToArray(text);
    const sortedWords = words.sort(WordFrequencyAnalyzer.customSort);

    return sortedWords.slice(0, n);
  }

  private extractWordsToArray(text: string): WordFrequency[] {
    if (!text) {
      throw Error('text null');
    }
    const words = new Map<string, WordFrequency>();
    const textMatched = text.match(this.regex);

    textMatched?.forEach(word => {
      // The regex is case insensitive but the result will still have the original case sensitive values.
      word = word.toLocaleLowerCase();
      const frequency = (words.get(word)?.getFrequency() || 0) + 1;
      words.set(word, new WordFrequency(frequency, word));
    });

    // Key is unique, so only return the values as a WordFrequency[]
    return [...words.values()];
  }
}
