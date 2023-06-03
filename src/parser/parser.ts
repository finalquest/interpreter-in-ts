import { Lexer, newLexer } from '../lexer/lexer';
import { Token, TokenType } from '../token/token';
import { TokenTypes } from '../token/tokenConst';
import { nextToken as nextLexerToken } from '../lexer/lexer';
import {
  Identifier,
  LetStatement,
  Node,
  Statement,
  newIdentifier,
  newLetStatement
} from '../ast/ast';

export type Parser = {
  lexer: Lexer;
  curToken: Token;
  peekToken: Token;
};

export type Program = {
  statements: Statement<unknown>[];
  tokenLiteral: string;
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

  let innerParser = { ...parser };

  while (innerParser.curToken.type !== TokenTypes.EOF) {
    const parsedStatement = parseStatement(innerParser);
    if (parsedStatement[0]) {
      retProgram.statements.push(parsedStatement[0] as Statement<unknown>);
    }
    innerParser = nextToken(parsedStatement[1]);
  }
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

const parseStatement = (
  parser: Parser
): [Statement<unknown> | boolean, Parser] => {
  switch (parser.curToken.type) {
    case TokenTypes.LET: {
      return parseLetStatement(parser);
    }
  }
  return [false, parser];
};

const parseLetStatement = (
  parser: Parser
): [Statement<LetStatement> | boolean, Parser] => {
  const letStatement = newLetStatement({
    token: parser.curToken
  });
  let [expected, newParser] = expectPeek(parser, TokenTypes.IDENT);
  if (!expected) {
    return [false, newParser];
  }

  letStatement.inner.name = newIdentifier({
    token: newParser.curToken,
    value: newParser.curToken.literal
  });

  [expected, newParser] = expectPeek(newParser as Parser, TokenTypes.ASSIGN);

  if (!expected) {
    return [false, newParser];
  }

  //Todo: A implementar. Por ahora no importa lo que viene despues del =
  //

  while (!curTokenIs(newParser as Parser, TokenTypes.SEMICOLON)) {
    newParser = nextToken(newParser);
  }

  return [letStatement, newParser];
};

const expectPeek = (parser: Parser, type: TokenType): [boolean, Parser] => {
  if (peekTokenIs(parser, type)) {
    return [true, nextToken(parser)];
  } else {
    return [false, parser];
  }
};

const peekTokenIs = (parser: Parser, type: TokenType): boolean => {
  return parser.peekToken.type === type;
};

const curTokenIs = (parser: Parser, type: TokenType): boolean => {
  return parser.curToken.type === type;
};
