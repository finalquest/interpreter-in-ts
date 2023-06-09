import { Lexer, newLexer } from '../lexer/lexer';
import { Token, TokenType } from '../token/token';
import { TokenTypes } from '../token/tokenConst';
import { nextToken as nextLexerToken } from '../lexer/lexer';
import {
  ExpressionStatement,
  LetStatement,
  ReturnStatement,
  Statement,
  newExpressionStatement,
  newIdentifier,
  newLetStatement,
  newReturnStatement
} from '../ast/ast';

export type Parser = {
  lexer: Lexer;
  curToken: Token;
  peekToken: Token;
  errors: string[];
};

export type Program = {
  statements: Statement<unknown>[];
  tokenLiteral: string;
};

export const newParser = (lexer: Lexer): Parser => {
  const parser = {
    curToken: { type: '', literal: '' },
    peekToken: { type: '', literal: '' },
    lexer,
    errors: []
  };

  return nextToken(nextToken(parser));
};

export const parseProgram = (parser: Parser): [Program, Parser] => {
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
  return [retProgram, innerParser];
};

export const nextToken = (parser: Parser): Parser => {
  const [token, newLexer] = nextLexerToken(parser.lexer);
  return {
    ...parser,
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
    case TokenTypes.RETURN: {
      return parseReturnStatement(parser);
    }
    default: {
      return parseExpressionStatement(parser);
    }
  }
};

const parseReturnStatement = (
  parser: Parser
): [Statement<ReturnStatement> | boolean, Parser] => {
  const statement = newReturnStatement({
    token: parser.curToken
  });

  //Todo: A implementar. Por ahora no importa lo que viene despues del =
  //

  let newParser = nextToken(parser);

  while (!curTokenIs(newParser as Parser, TokenTypes.SEMICOLON)) {
    newParser = nextToken(newParser);
  }

  return [statement, newParser];
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

const parseExpressionStatement = (
  parser: Parser
): [Statement<ExpressionStatement> | boolean, Parser] => {
  const statement = newExpressionStatement({
    token: parser.curToken
  });

  let newParser = { ...parser };

  while (!curTokenIs(newParser as Parser, TokenTypes.SEMICOLON)) {
    newParser = nextToken(newParser);
  }

  return [statement, newParser];
};

const expectPeek = (parser: Parser, type: TokenType): [boolean, Parser] => {
  if (peekTokenIs(parser, type)) {
    return [true, nextToken(parser)];
  } else {
    const newParser = peekError(parser, type);
    return [false, newParser];
  }
};

const peekTokenIs = (parser: Parser, type: TokenType): boolean => {
  return parser.peekToken.type === type;
};

const curTokenIs = (parser: Parser, type: TokenType): boolean => {
  return parser.curToken.type === type;
};

const peekError = (parser: Parser, tokenType: TokenType): Parser => {
  const errorMsg = `Expected ${tokenType} got ${parser.peekToken.type}`;
  return { ...parser, errors: [...parser.errors, errorMsg] };
};
