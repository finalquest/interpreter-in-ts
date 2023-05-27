import { Token } from '../token/token';
import TokenTypes from '../token/tokenConst';
export type byte = number & { __byte: true };

export type Lexer = {
  input: string;
  position: number;
  readPosition: number;
  ch: byte;
};

export const newLexer = (input: string): Lexer => {
  const l: Lexer = {
    input,
    position: 0,
    readPosition: 0,
    ch: 0 as byte
  };
  return readChar(l);
};

const readChar = (l: Lexer): Lexer => {
  const returnLexer = { ...l };
  if (returnLexer.readPosition >= returnLexer.input.length) {
    returnLexer.ch = 0 as byte;
  } else {
    returnLexer.ch = returnLexer.input.charCodeAt(
      returnLexer.readPosition
    ) as byte;
  }

  returnLexer.position = returnLexer.readPosition;
  returnLexer.readPosition += 1;

  return returnLexer;
};

export const nextToken = (l: Lexer): [Token, Lexer] => {
  let token: Token;
  switch (l.ch) {
    case '='.charCodeAt(0):
      token = { type: TokenTypes.ASSIGN, literal: '=' };
      break;
    case ';'.charCodeAt(0):
      token = { type: TokenTypes.SEMICOLON, literal: ';' };
      break;
    case '('.charCodeAt(0):
      token = { type: TokenTypes.LPAREN, literal: '(' };
      break;
    case ')'.charCodeAt(0):
      token = { type: TokenTypes.RPAREN, literal: ')' };
      break;
    case ','.charCodeAt(0):
      token = { type: TokenTypes.COMMA, literal: ',' };
      break;
    case '+'.charCodeAt(0):
      token = { type: TokenTypes.PLUS, literal: '+' };
      break;
    case '{'.charCodeAt(0):
      token = { type: TokenTypes.LBRACE, literal: '{' };
      break;
    case '}'.charCodeAt(0):
      token = { type: TokenTypes.RBRACE, literal: '}' };
      break;
    case 0:
      token = { type: TokenTypes.EOF, literal: '' };
      break;

    default:
      token = { type: TokenTypes.ILLEGAL, literal: '' };
  }

  return [token, readChar(l)];
};
