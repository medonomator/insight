import test from 'tape'

import { incrementAsync } from './sagas'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync()

  assert.deepEqual(
    gen.next(),
    { done: false, value: 'test' },
    'incrementAsync должен вернуть Обещание которое разрешится через 1 секунду'
  )
})
