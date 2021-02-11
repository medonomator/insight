import { put, takeEvery, all } from 'redux-saga/effects'
import { getAphorisms } from '../fetch'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

export function* incrementAsync() {
  const products = yield getAphorisms()
  console.log(products)
  yield delay(5000)
  yield put({ type: 'INCREMENT' })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()])
}
