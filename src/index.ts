import { startReadLine } from './repl/repl';

console.log('Enter Commands');

const read = () => {
  startReadLine('>>>').then(() => {
    read();
  });
};

read();
