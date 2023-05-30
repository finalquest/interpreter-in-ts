import { TokenType } from './token';

export const EatableChars = [' ', '\t', '\n', '\r'];

export const TokenTypes = {
  ILLEGAL: 'ILLEGAL',
  EOF: 'EOF',

  // Identifiers + literals
  IDENT: 'IDENT', // add, foobar, x, y, ...
  INT: 'INT', // 1343456

  // Operators
  ASSIGN: '=',
  PLUS: '+',
  MINUS: '-',
  BANG: '!',
  ASTERISK: '*',
  SLASH: '/',
  LT: '<',
  RT: '>',

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

export const TokenMapping: { [propKey: string]: TokenType } = {
  // Operators
  '=': TokenTypes.ASSIGN,
  '+': TokenTypes.PLUS,
  '-': TokenTypes.MINUS,
  '!': TokenTypes.BANG,
  '*': TokenTypes.ASTERISK,
  '/': TokenTypes.SLASH,
  '<': TokenTypes.LT,
  '>': TokenTypes.RT,

  // Delimiters
  ',': TokenTypes.COMMA,
  ';': TokenTypes.SEMICOLON,

  '(': TokenTypes.LPAREN,
  ')': TokenTypes.RPAREN,
  '{': TokenTypes.LBRACE,
  '}': TokenTypes.RBRACE,
  EOF: TokenTypes.EOF
};

export const Keywords: { [propKey: string]: TokenType } = {
  let: TokenTypes.LET,
  fn: TokenTypes.FUNCTION
};
