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

    const [program] = parseProgram(parser);

    const testCases = ['x', 'y', 'foobar'];

    expect(program).not.toBeNull();

    expect(program.statements).toHaveLength(3);

    testCases.forEach((testCase, index) => {
      const statement = program.statements[index];
      testLetStatement(statement, testCase);
    });
  });

  test('test parser handle expected errors', async () => {
    const input = `
     let x 5;
     let = 10;
     let 838383;`;

    const l = newLexer(input);
    const parser = newParser(l);

    const [, retParser] = parseProgram(parser);
    expect(retParser.errors).toHaveLength(3);
    console.log(retParser.errors);
  });

  test('Return statement', async () => {
    const input = `
     return 5;
     return 10;
     return 9999999;`;

    const l = newLexer(input);
    const parser = newParser(l);

    const [program] = parseProgram(parser);

    expect(program).not.toBeNull();

    expect(program.statements).toHaveLength(3);

    program.statements.forEach((statement) => {
      expect(statement.inner.token.literal).toEqual('return');
    });
  });
});

const testLetStatement = (statement: Statement<unknown>, name: string) => {
  expect(statement.inner.token.literal).toEqual('let');
  expect((statement as Statement<LetStatement>).inner.name.value).toEqual(name);
};
