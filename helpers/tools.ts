import * as fs from 'fs';
const EventEmitter = require('events');
const assert = require('assert');
import { setInterval } from 'timers';
import { logger, profiller } from './logger';

; (async () => {
  try {

  } catch (error) {
    logger(error)
  }
})


const someFunc = () => {
  setTimeout(() => {
    // some code...
  }, 3000)
}

profiller(someFunc)

// const stream = fs.createReadStream(`/home/socket/text.txt`)
//   .on('open', (chunk) => {
//     console.log('reading');

//   })

export const myFirstTools = () => { }