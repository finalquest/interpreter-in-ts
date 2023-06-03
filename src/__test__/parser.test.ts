import { LetStatement, Statement } from '../ast/ast';
import { newLexer } from '../lexer/lexer';
import { newParser, parseProgram } from '../parser/parser';

describe('Parser test suite', () => {
  test('Let statements', async () => {
    const input = `
     let x = 5;
     let y = 10;
     let foobar = 838383;`;

    const l = newLexer(input);
    const parser = newParser(l);

    const program = parseProgram(parser);

    const testCases = ['x', 'y', 'foobar'];

    expect(program).not.toBeNull();

    expect(program.statements).toHaveLength(3);

    testCases.forEach((testCase, index) => {
      const statement = program.statements[index];
      testLetStatement(statement, testCase);
    });
  });
});

const testLetStatement = (statement: Statement<unknown>, name: string) => {
  expect(statement.tokenLiteral()).toEqual('let');
  expect((statement as Statement<LetStatement>).inner.name.value).toEqual(name);
};
