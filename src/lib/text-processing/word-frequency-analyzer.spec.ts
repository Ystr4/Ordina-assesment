import {WordFrequencyAnalyzer} from './word-frequency-analyzer';
import {loremText} from '../../../tests/__MOCKS__/lorem-text';
import {WordFrequency} from './word-frequency';

describe('WordFrequencyAnalyzer: @regex', () => {
  let analyzer: WordFrequencyAnalyzer;
  beforeAll(() => {
    analyzer = new WordFrequencyAnalyzer();
  });

  it('Valid word', () => {
    const expected = `text`;
    const result = expected.match(analyzer.regex)?.[0] || '';
    expect(result).toEqual(expected);
  });

  it('Single quoted word', () => {
    expect(`'text'`).toMatch(analyzer.regex);
  });

  it('Double quoted word', () => {
    expect(`"text"`).toMatch(analyzer.regex);
  });

  it('Not a valid word: text2', () => {
    expect(`text2`).not.toMatch(analyzer.regex);
  });

  it('text# to equal text', () => {
    const result = `text#`.match(analyzer.regex)?.[0] || '';
    expect(result).toEqual('text');
  });

  it('$a to equal a', () => {
    const result = `$a`.match(analyzer.regex)?.[0] || '';
    expect(result).toEqual('a');
  });

  it('Special characters', () => {
    const expected = `! @ # $ % ^ & * ( ) { } [ ] ; < > - ~ 123 abc4abc . ? / \\ text`;
    const result = expected.match(analyzer.regex)?.[0] || '';
    expect(result).toEqual('text');
  });

  it('Plural apostrof', () => {
    const expected = `agenda's`;
    const result = expected.match(analyzer.regex)?.[0] || '';
    expect(result).toEqual(expected);
  });

  it('Diminutive apostrof', () => {
    const expected = `auto'tje`;
    const result = expected.match(analyzer.regex)?.[0] || '';
    expect(result).toEqual(expected);
  });

  it('Word boundaries', () => {
    const text = `123|ab, dc3fg 'string!',"string "`;
    const expected = ['ab', 'string', 'string'];
    const result = text.match(analyzer.regex) || '';
    expect(result).toEqual(expected);
  });
});

describe('WordFrequencyAnalyzer: @calculateHighestFrequency', () => {
  let analyzer: WordFrequencyAnalyzer;
  beforeAll(() => {
    analyzer = new WordFrequencyAnalyzer();
  });

  it('Should return -1', () => {
    const result = analyzer.calculateHighestFrequency('text2');
    expect(result).toEqual(-1);
  });

  it('Text empty: Should return -1', () => {
    const result = analyzer.calculateHighestFrequency(' ');
    expect(result).toEqual(-1);
  });

  it('Special chars: Should return -1', () => {
    const result = analyzer.calculateHighestFrequency('! @ # $ % ^ & *');
    expect(result).toEqual(-1);
  });

  it('Should return 1', () => {
    const result = analyzer.calculateHighestFrequency('text');
    expect(result).toEqual(1);
  });

  it('Should return 2', () => {
    const result = analyzer.calculateHighestFrequency('a a b c 123');
    expect(result).toEqual(2);
  });

  it('Example text Should return 2', () => {
    const result = analyzer.calculateHighestFrequency('The sun\nshines over the lake');
    expect(result).toEqual(2);
  });

  it('Should return 6 for a', () => {
    const result = analyzer.calculateHighestFrequency(`a:a b c 123|ab, a;a "a", á,a`);
    expect(result).toEqual(6);
  });
});

describe('WordFrequencyAnalyzer: @calculateFrequencyForWord', () => {
  let analyzer: WordFrequencyAnalyzer;
  beforeAll(() => {
    analyzer = new WordFrequencyAnalyzer();
  });

  it('Should throw: not a valid word', () => {
    const word = 'abc123';
    expect(() => analyzer.calculateFrequencyForWord('text', word)).toThrowError(`${word} is not a valid word`);
    expect(() => analyzer.calculateFrequencyForWord('text', '')).toThrowError(` is not a valid word`);
    expect(() => analyzer.calculateFrequencyForWord('text', ' ')).toThrowError(` is not a valid word`);
    expect(() => analyzer.calculateFrequencyForWord('text', '#text')).toThrowError(`#text is not a valid word`);
  });

  it('Should return 2', () => {
    expect(analyzer.calculateFrequencyForWord('text text abc 123', 'text')).toEqual(2);
  });
});

describe('WordFrequencyAnalyzer: @calculateMostFrequentNWords', () => {
  let analyzer: WordFrequencyAnalyzer;
  beforeAll(() => {
    analyzer = new WordFrequencyAnalyzer();
  });

  it('Should return {text: 3, abc: 1}', () => {
    const result = analyzer.calculateMostFrequentNWords('text, text text abc 12', 2);
    const expected = [
      new WordFrequency(3, 'text'),
      new WordFrequency(1, 'abc')
    ];
    expect(result).toEqual(expected);
  });

  it('Should throw: n has to be a positive number', () => {
    expect(() => analyzer.calculateMostFrequentNWords('text', -1)).toThrowError(`n has to be positive`);
  });

  it('Should return {"the": 2, "lake": 1, "over": 1}', () => {
    const result = analyzer.calculateMostFrequentNWords(`The sun shines over the lake`, 3);
    const expected = [
      new WordFrequency(2, 'the'),
      new WordFrequency(1, 'lake'),
      new WordFrequency(1, 'over')
    ];
    expect(result).toEqual(expected);
  });

  it('Should return {"the": 2} )', () => {
    const result = analyzer.calculateMostFrequentNWords(`The sun shines over the lake`, 1.2);
    const expected = [
      new WordFrequency(2, 'the'),
    ];
    expect(result).toEqual(expected);
  });
});

describe('WordFrequencyAnalyzer @PERFORMANCE_TEST', () => {
  let analyzer: WordFrequencyAnalyzer;
  let start: number;
  beforeAll(() => {
    analyzer = new WordFrequencyAnalyzer();
  });
  beforeEach(() => {
    start = performance.now();
  });

  it('calculateHighestFrequency', () => {
    analyzer.calculateHighestFrequency(loremText);
    const executionTime = performance.now() - start;
    expect(executionTime).toBeLessThan(100);
    console.log(`calculateHighestFrequency executed in ms: ${executionTime}`);
  });

  it('calculateFrequencyForWord', () => {
    analyzer.calculateFrequencyForWord(loremText, 'lorem');
    const executionTime = performance.now() - start;
    expect(executionTime).toBeLessThan(10);
    console.log(`calculateFrequencyForWord executed in ms: ${executionTime}`);
  });

  it('calculateMostFrequentNWords', () => {
    analyzer.calculateMostFrequentNWords(loremText, 10);
    const executionTime = performance.now() - start;
    expect(executionTime).toBeLessThan(100);
    console.log(`calculateMostFrequentNWords executed in ms: ${executionTime}`);
  });
});
