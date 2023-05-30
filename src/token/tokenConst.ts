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
  EQ: '==',
  NOT_EQ: '!=',
  // Delimiters
  COMMA: ',',
  SEMICOLON: ';',

  LPAREN: '(',
  RPAREN: ')',
  LBRACE: '{',
  RBRACE: '}',

  // Keywords
  FUNCTION: 'FUNCTION',
  LET: 'LET',
  IF: 'IF',
  ELSE: 'ELSE',
  RETURN: 'RETURN',
  TRUE: 'TRUE',
  FALSE: 'FALSE'
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
  '==': TokenTypes.EQ,
  '!=': TokenTypes.NOT_EQ,
  EOF: TokenTypes.EOF
};

export const TokenLookAhead: { [propKey: string]: TokenType } = {
  // Operators
  '=': TokenTypes.ASSIGN,
  '!': TokenTypes.BANG
};

export const Keywords: { [propKey: string]: TokenType } = {
  let: TokenTypes.LET,
  fn: TokenTypes.FUNCTION,
  if: TokenTypes.IF,
  else: TokenTypes.ELSE,
  return: TokenTypes.RETURN,
  true: TokenTypes.TRUE,
  false: TokenTypes.FALSE
};
