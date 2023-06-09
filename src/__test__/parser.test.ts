import { Expression } from '../ast/ast';
import { Identifier } from '../ast/ast';
import {
  ExpressionStatement,
  ExpressionTypes,
  LetStatement,
  Statement,
  StatementTypes
} from '../ast/ast';
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

  test('test indentifier expression', async () => {
    const input = 'foobar;';
    const l = newLexer(input);
    const parser = newParser(l);

    const [program] = parseProgram(parser);

    expect(program).not.toBeNull();

    expect(program.statements).toHaveLength(1);
    expect(program.statements[0].type).toEqual(StatementTypes.EXPRESSION);

    const ident = program.statements[0].inner as ExpressionStatement;
    expect(ident.expression.type).toEqual(ExpressionTypes.IDENT);
    expect((ident.expression as Expression<Identifier>).inner.value).toEqual(
      'foobar'
    );
  });
});

const testLetStatement = (statement: Statement<unknown>, name: string) => {
  expect(statement.inner.token.literal).toEqual('let');
  expect((statement as Statement<LetStatement>).inner.name.value).toEqual(name);
};
