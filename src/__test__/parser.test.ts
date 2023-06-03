import { newLexer, nextToken } from '../lexer/lexer';
import { newParser, parseProgram } from '../parser/parser';

describe('Parser test suite', () => {
  test('should parse', async () => {
    const input = `
     let x = 5;
     let y = 10;
     let foobar = 838383 ff`;

    const l = newLexer(input);
    const parser = newParser(l);

    const program = parseProgram(parser);

    const testCases = ['x', 'y', 'foobar'];

    expect(program).not.toBeNull();

    expect(program.statements).toHaveLength(3);

    // let token = nextToken(l);
    // testCases.forEach((testCase) => {
    //   expect(token[0]).toEqual(testCase);
    //   token = nextToken(token[1]);
    // });
  });
});
