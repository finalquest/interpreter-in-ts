import { TokenType } from './token';

export const TokenTypes = {
  ILLEGAL: 'ILLEGAL',
  EOF: 'EOF',

  // Identifiers + literals
  IDENT: 'IDENT', // add, foobar, x, y, ...
  INT: 'INT', // 1343456

  // Operators
  ASSIGN: '=',
  PLUS: '+',

  // Delimiters
  COMMA: ',',
  SEMICOLON: ';',

  LPAREN: '(',
  RPAREN: ')',
  LBRACE: '{',
  RBRACE: '}',

  // Keywords
  FUNCTION: 'FUNCTION',
  LET: 'LET'
};

export const Keywords: { [propKey: string]: TokenType } = {
  let: TokenTypes.LET,
  fn: TokenTypes.FUNCTION
};
