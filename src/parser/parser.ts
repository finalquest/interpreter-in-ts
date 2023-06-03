import { Lexer } from '../lexer/lexer';
import { Token } from '../token/token';
import { TokenTypes } from '../token/tokenConst';
import { nextToken as nextLexerToken } from '../lexer/lexer';

export type Statement = {
  tokenLiteral: () => string;
};

export type Expression = {
  tokenLiteral: () => string;
};

export type Program = {
  statements: Statement[];
  tokenLiteral: string;
};

export type Parser = {
  lexer: Lexer;
  curToken: Token;
  peekToken: Token;
};

export type Identifier = Expression & {
  token: Token;
  value: string;
};

export type LetStatement = Statement & {
  token: Token;
  name: Identifier;
  value: Expression;
};

const newExpression = ({
  token,
  value
}: {
  token: Token;
  value: string;
}): Expression => {
  const tokenLiteral = () => {
    return token.literal;
  };
  return { tokenLiteral };
};

const newIdentifier = ({
  token,
  value
}: {
  token: Token;
  value: string;
}): Identifier => {
  const tokenLiteral = () => {
    return token.literal;
  };
  return {
    token,
    value,
    tokenLiteral
  };
};

const newLetStatement = ({
  token,
  value
}: {
  token: Token;
  value: string;
}): LetStatement => {
  const tokenLiteral = () => {
    return token.literal;
  };

  return {
    token,
    value: newExpression({
      token: { type: TokenTypes.EOF, literal: '' },
      value: ''
    }),
    name: newIdentifier({
      value: '',
      token: { type: TokenTypes.EOF, literal: '' }
    }),
    tokenLiteral
  };
};

export const newParser = (lexer: Lexer): Parser => {
  const parser = {
    curToken: { type: '', literal: '' },
    peekToken: { type: '', literal: '' },
    lexer
  };

  return nextToken(nextToken(parser));
};

export const parseProgram = (parser: Parser): Program => {
  const retProgram: Program = {
    statements: [],
    tokenLiteral: ''
  };
  return retProgram;
};

export const nextToken = (parser: Parser): Parser => {
  const [token, newLexer] = nextLexerToken(parser.lexer);
  return {
    curToken: parser.peekToken,
    peekToken: token,
    lexer: newLexer
  };
};
