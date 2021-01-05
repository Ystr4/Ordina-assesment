import {WordFrequencyInterface} from './word-frequency-interface';

export interface WordFrequencyAnalyzerInterface {
  calculateHighestFrequency(text: string): number;
  calculateFrequencyForWord(text: string, word: string): number;
  calculateMostFrequentNWords(text: string, n: number): WordFrequencyInterface[];
}
