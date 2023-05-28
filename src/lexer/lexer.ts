import { isBuiltin } from 'module';
import { Token, TokenType } from '../token/token';
import { Keywords, TokenTypes } from '../token/tokenConst';
import { on } from 'events';
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
  const sLexer = skipWhitespace(l);
  switch (sLexer.ch) {
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
      if (isLetter(sLexer.ch)) {
        const [literal, lexer] = readIdentifier(sLexer);
        return [literal, lexer];
      }
      if (isDigit(sLexer.ch)) {
        const [literal, lexer] = readNumber(sLexer);
        return [literal, lexer];
      }
      token = { type: TokenTypes.ILLEGAL, literal: '' };
  }

  return [token, readChar(sLexer)];
};

const skipWhitespace = (l: Lexer): Lexer => {
  let returnLexer = { ...l };
  while (
    returnLexer.ch === ' '.charCodeAt(0) ||
    returnLexer.ch === '\t'.charCodeAt(0) ||
    returnLexer.ch === '\n'.charCodeAt(0) ||
    returnLexer.ch === '\r'.charCodeAt(0)
  ) {
    returnLexer = readChar(returnLexer);
  }

  return returnLexer;
};

const isDigit = (ch: byte): boolean => {
  return ch >= '0'.charCodeAt(0) && ch <= '9'.charCodeAt(0);
};

export const readIdentifier = (l: Lexer): [Token, Lexer] => {
  let returnLexer = { ...l };
  let literal = '';
  while (isLetter(returnLexer.ch)) {
    literal += String.fromCharCode(returnLexer.ch);
    returnLexer = readChar(returnLexer);
  }

  return [lookupBuiltIn(literal), returnLexer];
};

export const readNumber = (l: Lexer): [Token, Lexer] => {
  let returnLexer = { ...l };
  let literal = '';
  while (isDigit(returnLexer.ch)) {
    literal += String.fromCharCode(returnLexer.ch);
    returnLexer = readChar(returnLexer);
  }
  return [{ type: TokenTypes.INT, literal }, returnLexer];
};

const lookupBuiltIn = (literal: string): Token => {
  const resolvedKeyword = (Keywords[literal] as TokenType) || TokenTypes.IDENT;
  return { type: resolvedKeyword, literal };
};

const isLetter = (ch: byte): boolean => {
  return (
    (ch >= 'a'.charCodeAt(0) && ch <= 'z'.charCodeAt(0)) ||
    (ch >= 'A'.charCodeAt(0) && ch <= 'Z'.charCodeAt(0))
  );
};
