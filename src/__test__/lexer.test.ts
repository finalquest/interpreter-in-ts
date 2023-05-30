import { newLexer, nextToken, readIdentifier } from '../lexer/lexer';
import { TokenTypes } from '../token/tokenConst';

describe('Lexer test suite', () => {
  test('should parse all the token types', async () => {
    const input = '=+(){},;';
    const l = newLexer(input);

    const testCases = [
      { type: TokenTypes.ASSIGN, literal: '=' },
      { type: TokenTypes.PLUS, literal: '+' },
      { type: TokenTypes.LPAREN, literal: '(' },
      { type: TokenTypes.RPAREN, literal: ')' },
      { type: TokenTypes.LBRACE, literal: '{' },
      { type: TokenTypes.RBRACE, literal: '}' },
      { type: TokenTypes.COMMA, literal: ',' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.EOF, literal: '' }
    ];

    let token = nextToken(l);
    testCases.forEach((testCase) => {
      expect(token[0]).toEqual(testCase);
      token = nextToken(token[1]);
    });
  });

  test('should read identifier', async () => {
    const input = 'five';
    const l = newLexer(input);
    const token = readIdentifier(l);
    expect(token).toEqual([
      { type: 'IDENT', literal: 'five' },
      { input: 'five', position: 4, readPosition: 5, ch: 0 }
    ]);

    const inputBuiltIn = 'fn';
    const lBuiltIn = newLexer(inputBuiltIn);
    const tokenBuiltIn = readIdentifier(lBuiltIn);
    expect(tokenBuiltIn).toEqual([
      { type: 'FUNCTION', literal: 'fn' },
      { input: 'fn', position: 2, readPosition: 3, ch: 0 }
    ]);
  });

  test('should read number', async () => {
    const input = '123';
    const l = newLexer(input);
    const token = nextToken(l);
    expect(token[0]).toEqual({ type: TokenTypes.INT, literal: '123' });
  });

  test('should parse all the token types', async () => {
    const input = `let five = 5;
let ten = 10;
   let add = fn(x, y) {
     x + y;
};
   let result = add(five, ten);
   !-/*5;
   5 < 10 > 5;
if (5 < 10) {
       return true;
   } else {
       return false;
}
10 == 10;
10 != 9;`;

    const testCases = [
      { type: TokenTypes.LET, literal: 'let' },
      { type: TokenTypes.IDENT, literal: 'five' },
      { type: TokenTypes.ASSIGN, literal: '=' },
      { type: TokenTypes.INT, literal: '5' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.LET, literal: 'let' },
      { type: TokenTypes.IDENT, literal: 'ten' },
      { type: TokenTypes.ASSIGN, literal: '=' },
      { type: TokenTypes.INT, literal: '10' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.LET, literal: 'let' },
      { type: TokenTypes.IDENT, literal: 'add' },
      { type: TokenTypes.ASSIGN, literal: '=' },
      { type: TokenTypes.FUNCTION, literal: 'fn' },
      { type: TokenTypes.LPAREN, literal: '(' },
      { type: TokenTypes.IDENT, literal: 'x' },
      { type: TokenTypes.COMMA, literal: ',' },
      { type: TokenTypes.IDENT, literal: 'y' },
      { type: TokenTypes.RPAREN, literal: ')' },
      { type: TokenTypes.LBRACE, literal: '{' },
      { type: TokenTypes.IDENT, literal: 'x' },
      { type: TokenTypes.PLUS, literal: '+' },
      { type: TokenTypes.IDENT, literal: 'y' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.RBRACE, literal: '}' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.LET, literal: 'let' },
      { type: TokenTypes.IDENT, literal: 'result' },
      { type: TokenTypes.ASSIGN, literal: '=' },
      { type: TokenTypes.IDENT, literal: 'add' },
      { type: TokenTypes.LPAREN, literal: '(' },
      { type: TokenTypes.IDENT, literal: 'five' },
      { type: TokenTypes.COMMA, literal: ',' },
      { type: TokenTypes.IDENT, literal: 'ten' },
      { type: TokenTypes.RPAREN, literal: ')' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.BANG, literal: '!' },
      { type: TokenTypes.MINUS, literal: '-' },
      { type: TokenTypes.SLASH, literal: '/' },
      { type: TokenTypes.ASTERISK, literal: '*' },
      { type: TokenTypes.INT, literal: '5' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.INT, literal: '5' },
      { type: TokenTypes.LT, literal: '<' },
      { type: TokenTypes.INT, literal: '10' },
      { type: TokenTypes.RT, literal: '>' },
      { type: TokenTypes.INT, literal: '5' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.IF, literal: 'if' },
      { type: TokenTypes.LPAREN, literal: '(' },
      { type: TokenTypes.INT, literal: '5' },
      { type: TokenTypes.LT, literal: '<' },
      { type: TokenTypes.INT, literal: '10' },
      { type: TokenTypes.RPAREN, literal: ')' },
      { type: TokenTypes.LBRACE, literal: '{' },
      { type: TokenTypes.RETURN, literal: 'return' },
      { type: TokenTypes.TRUE, literal: 'true' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.RBRACE, literal: '}' },
      { type: TokenTypes.ELSE, literal: 'else' },
      { type: TokenTypes.LBRACE, literal: '{' },
      { type: TokenTypes.RETURN, literal: 'return' },
      { type: TokenTypes.FALSE, literal: 'false' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.RBRACE, literal: '}' },
      { type: TokenTypes.INT, literal: '10' },
      { type: TokenTypes.EQ, literal: '==' },
      { type: TokenTypes.INT, literal: '10' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.INT, literal: '10' },
      { type: TokenTypes.NOT_EQ, literal: '!=' },
      { type: TokenTypes.INT, literal: '9' },
      { type: TokenTypes.SEMICOLON, literal: ';' },
      { type: TokenTypes.EOF, literal: '' }
    ];

    const l = newLexer(input);
    let token = nextToken(l);
    testCases.forEach((testCase) => {
      expect(token[0]).toEqual(testCase);
      token = nextToken(token[1]);
    });
  });
});
