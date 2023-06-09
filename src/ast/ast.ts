import { Token } from '../token/token';
import { TokenTypes } from '../token/tokenConst';

export const StatementTypes = {
  LET_STATEMENT: 'LET_STATEMENT',
  RETURN: 'RETURN_STATEMENT',
  EXPRESSION: 'EXPRESSION_STATEMENT'
};

type New = {
  token: Token;
  value: string;
};

export type Statement<T> = {
  inner: T & { token: Token };
  type: string;
};

export type Expression<T> = {
  inner: T;
};
export type Identifier = {
  token: Token;
  value: string;
};

export interface LetStatement {
  token: Token;
  name: Identifier;
  value: Expression<unknown>;
}

export interface ReturnStatement {
  token: Token;
  returnValue: Expression<unknown>;
}

export interface ExpressionStatement {
  token: Token;
  expression: Expression<unknown>;
}

const newExpression = ({ token, value }: New): Expression<unknown> => {
  return { inner: undefined };
};

export const newIdentifier = ({ token, value }: New): Identifier => {
  return {
    token,
    value
  };
};

export const newReturnStatement = ({
  token
}: {
  token: Token;
}): Statement<ReturnStatement> => {
  const returnStat = {
    token,
    returnValue: newExpression({
      token: { type: TokenTypes.EOF, literal: '' },
      value: ''
    })
  };
  return { inner: returnStat, type: StatementTypes.RETURN };
};

export const newLetStatement = ({
  token
}: {
  token: Token;
}): Statement<LetStatement> => {
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
    inner: letStatement,
    type: StatementTypes.LET_STATEMENT
  };
};

export const newExpressionStatement = ({
  token
}: {
  token: Token;
}): Statement<ExpressionStatement> => {
  const expStatement = {
    token,
    expression: newExpression({
      value: '',
      token: { type: TokenTypes.EOF, literal: '' }
    })
  };
  return { inner: expStatement, type: StatementTypes.EXPRESSION };
};
