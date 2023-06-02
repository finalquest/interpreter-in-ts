import readline from 'readline';
import { newLexer, nextToken } from '../lexer/lexer';
import { TokenTypes } from '../token/tokenConst';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export const startReadLine = (prompt: string): Promise<void> => {
  const retPromise = new Promise<void>((resolve) => {
    rl.question(prompt, (line: string) => {
      const lexer = newLexer(line);
      let [token, nLexer] = nextToken(lexer);
      while (token.type !== TokenTypes.EOF) {
        console.log(token);
        [token, nLexer] = nextToken(nLexer);
      }
      resolve();
    });
  });
  return retPromise;
};
