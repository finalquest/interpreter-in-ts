import { Lexer } from '../lexer/lexer';
import { Token } from '../token/token';
import { TokenTypes } from '../token/tokenConst';

export interface Node<T> {
  string: () => string;
  tokenLiteral: () => string;
  inner: T;
}
export type Statement<T> = Node<T>;

export type Expression<T> = Node<T>;

export type Identifier<T> = Node<T> & {
  token: Token;
  value: string;
};

export interface LetStatement {
  token: Token;
  name: Identifier<unknown>;
  value: Expression<unknown>;
}

const newExpression = ({
  token,
  value
}: {
  token: Token;
  value: string;
}): Expression<undefined> => {
  const tokenLiteral = () => {
    return token.literal;
  };
  return { tokenLiteral, string: () => '', inner: undefined };
};

export const newIdentifier = ({
  token,
  value
}: {
  token: Token;
  value: string;
}): Identifier<undefined> => {
  const tokenLiteral = () => {
    return token.literal;
  };
  return {
    token,
    value,
    tokenLiteral,
    string: () => '',
    inner: undefined
  };
};

export const newLetStatement = ({
  token
}: {
  token: Token;
}): Node<LetStatement> => {
  const tokenLiteral = () => {
    return token.literal;
  };

  const letStatement = {
    token,
    value: newExpression({
      token: { type: TokenTypes.EOF, literal: '' },
      value: ''
    }),
    name: newIdentifier({
      value: '',
      token: { type: TokenTypes.EOF, literal: '' }
    })
  };

  return {
    tokenLiteral,
    string: () => '',
    inner: letStatement
  };
};
