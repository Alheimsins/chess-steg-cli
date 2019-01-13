const test = require('ava')
const { promisify } = require('util')
const { resolve } = require('path')
const exec = promisify(require('child_process').exec)

const path = resolve(__dirname, '../bin/chess-steg')
// with blunders
const testString = 'hello world'
const expectedPgn = '1. e3 Nh6 2. d4 Nf5 3. Qd2 Rg8 4. Ne2 c6 5. b3 d6 6. a3 Be6 7. d5 Kd7 8. Qd3 Kc8 9. Qb5 b6 10. Ng1 { Black resigns. } 1-0'
const expectedPgnWithoutBlunders = '1. g3 h5 2. a4 b6 3. f3 d6 4. Bg2 c6 5. e3 e5 6. Kf1 Qe7 7. b3 Ba6+ 8. Ke1 h4 9. Bf1 Bb7 10. a5 hxg3 11. h3 b5 12. Qe2 Qh4 13. Qg2 d5 14. Bb2 Qg5 15. Ra2 { Black resigns. } 1-0'

test('basic check', t => {
  t.true(true, 'ava works ok')
})

test('test steg', async t => {
  const { stdout } = await exec(`${path} -s "${testString}"`)
  const result = stdout.slice(0, -1)
  t.is(result, expectedPgn)
})

test('test unsteg', async t => {
  const { stdout } = await exec(`${path} -u "${expectedPgn}"`)
  const result = stdout.slice(0, -1)
  t.is(result, testString)
})

test('test steg without blunders', async t => {
  const { stdout } = await exec(`${path} -w -s "${testString}"`)
  const result = stdout.slice(0, -1)
  t.is(result, expectedPgnWithoutBlunders)
})

test('test unsteg without blunders', async t => {
  const { stdout } = await exec(`${path} -w -u "${expectedPgnWithoutBlunders}"`)
  const result = stdout.slice(0, -1)
  t.is(result, testString)
})

test('test unsteg with lichess ID', async t => {
  const { stdout } = await exec(`${path} -u ZKWeECmI`)
  const result = stdout.slice(0, -1)
  t.is(result, testString)
})

test('test unsteg with lichess url', async t => {
  const { stdout } = await exec(`${path} -u https://lichess.org/ZKWeECmI`)
  const result = stdout.slice(0, -1)
  t.is(result, testString)
})
