import { newLexer, nextToken } from '../lexer/lexer';
import TokenTypes from '../token/tokenConst';

describe('Lexer test suite', () => {
  test('should be true', async () => {
    const input = '=+(){},;';
    const l = newLexer(input);

    let token = nextToken(l);
    expect(token[0]).toEqual({ type: TokenTypes.ASSIGN, literal: '=' });
    token = nextToken(token[1]);
    expect(token[0]).toEqual({ type: TokenTypes.PLUS, literal: '+' });
    token = nextToken(token[1]);
    expect(token[0]).toEqual({ type: TokenTypes.LPAREN, literal: '(' });
    token = nextToken(token[1]);
    expect(token[0]).toEqual({ type: TokenTypes.RPAREN, literal: ')' });
    token = nextToken(token[1]);
    expect(token[0]).toEqual({ type: TokenTypes.LBRACE, literal: '{' });
    token = nextToken(token[1]);
    expect(token[0]).toEqual({ type: TokenTypes.RBRACE, literal: '}' });
    token = nextToken(token[1]);
    expect(token[0]).toEqual({ type: TokenTypes.COMMA, literal: ',' });
    token = nextToken(token[1]);
    expect(token[0]).toEqual({ type: TokenTypes.SEMICOLON, literal: ';' });
    token = nextToken(token[1]);
    return expect(token[0]).toEqual({ type: TokenTypes.EOF, literal: '' });
  });
});
