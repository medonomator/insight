
import * as Pino from 'pino';
import * as util from 'util';

export default Pino({
  prettyPrint: true
});

export const logger = (item: any) => {
  console.log('I`m custom Logger:', util.inspect(item, { showHidden: true, depth: null, colors: true, showProxy: true }));
}

export const profiller = (func) => {
  console.time('metka')
  func()
  console.timeEnd('metka')
}