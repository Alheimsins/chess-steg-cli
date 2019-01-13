const test = require('ava')
const { promisify } = require('util')
const { resolve } = require('path')
const exec = promisify(require('child_process').exec)

const path = resolve(__dirname, '../bin/chess-steg')
// with blunders
const testString = 'hello world'
const expectedPgn = '1. e3 Nh6 2. d4 Nf5 3. Qd2 Rg8 4. Ne2 c6 5. b3 d6 6. a3 Be6 7. d5 Kd7 8. Qd3 Kc8 9. Qb5 b6 10. Ng1 { Black resigns. } 1-0'
const expectedPgnWithoutBlunders = '1. Nf3 g6 2. e3 Bh6 3. a3 d6 4. Bb5+ Kf8 5. Ng1 e5 6. f3 c5 7. a4 Qc7 8. Kf2 a6 9. Bc4 Nc6 10. e4 Ke7 11. d3 Qd7 12. Ke1 Bg7 13. f4 Nb8 { White resigns. } 0-1'

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
