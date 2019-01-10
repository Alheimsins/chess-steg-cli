# chess-steg-cli

This is a cli that uses chess-steg, the awesome work by [James Stanley](https://github.com/jes)

[chess-steg](https://github.com/jes/chess-steg) is a tool to encode/decode short messages as chess games.

Too unwieldy for large content, but I believe it technically has no limit on the amount of data
it can encode as it ignores draw by repetition and the 50 move rule. Perhaps it can break in some situation
where a player is left with playing a checkmate as his only legal move?

This game encodes the text "Hello, world!":

1. e3 b6 2. b3 Bb7 3. Nf3 Bxf3 4. Bd3 e6 5. h4 g6 6. b4 h5 7. gxf3 c5 8. Bb2 a5 9. Rh3 e5 10. c4 Bh6 11. Be2 Ke7 { White resigns. } 0-1

More information in James Stanleys blog post: https://incoherency.co.uk/blog/stories/chess-steg.html

## Help

| Option              | Description               |
| ------------------- | ------------------------- |
| -v, --version       | Output the version number |
| -h, --help          | Display help              |
| -s, --steg          | Steg string               |
| -u, --unsteg        | Unsteg chess PGN          |
| -o, --open        | Open steg PGN in browser    |
| -w, --without-blunders | (un)steg without blunders (disabled by default) |
| -d, --debug         | Debug error messages      |

## Requirements

Install [node.js](https://nodejs.org/en/)

## Install globally (or run it without installing through [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b))

```bash
npm i -g chess-steg-cli
# Then use the "chess-steg" to run it
```

## Steg example

```bash
# Steg
npx chess-steg-cli -s "hello world"
# Outputs: 1. e3 Nh6 2. d4 Nf5 3. Qd2 Rg8 4. Ne2 c6 5. b3 d6 6. a3 Be6 7. d5 Kd7 8. Qd3 Kc8 9. Qb5 b6 10. Ng1 { Black resigns. } 1-0

# Steg and open in browser
npx chess-steg-cli -o -s "hello world"
# Outputs: 1. e3 Nh6 2. d4 Nf5 3. Qd2 Rg8 4. Ne2 c6 5. b3 d6 6. a3 Be6 7. d5 Kd7 8. Qd3 Kc8 9. Qb5 b6 10. Ng1 { Black resigns. } 1-0
# https://lichess.org/ZKWeECmI

# Steg without blunders
npx chess-steg-cli -w -s "hello world"
# Outputs: 1. Nf3 g6 2. e3 Bh6 3. a3 d6 4. Bb5+ Kf8 5. Ng1 e5 6. f3 c5 7. a4 Qc7 8. Kf2 a6 9. Bc4 Nc6 10. e4 Ke7 11. d3 Qd7 12. Ke1 Bg7 13. f4 Nb8 { White resigns. } 0-1
```

## Unsteg example

```bash
# Unsteg
npx chess-steg-cli -u "1. e3 Nh6 2. d4 Nf5 3. Qd2 Rg8 4. Ne2 c6 5. b3 d6 6. a3 Be6 7. d5 Kd7 8. Qd3 Kc8 9. Qb5 b6 10. Ng1 { Black resigns. } 1-0"
# Outputs: hello world

# Unsteg and open in browser
npx chess-steg-cli -o -u "1. e3 Nh6 2. d4 Nf5 3. Qd2 Rg8 4. Ne2 c6 5. b3 d6 6. a3 Be6 7. d5 Kd7 8. Qd3 Kc8 9. Qb5 b6 10. Ng1 { Black resigns. } 1-0"
# Outputs: hello world
# https://lichess.org/ZKWeECmI

# Unsteg without blunders example
npx chess-steg-cli -w -u "1. Nf3 g6 2. e3 Bh6 3. a3 d6 4. Bb5+ Kf8 5. Ng1 e5 6. f3 c5 7. a4 Qc7 8. Kf2 a6 9. Bc4 Nc6 10. e4 Ke7 11. d3 Qd7 12. Ke1 Bg7 13. f4 Nb8 { White resigns. } 0-1"
# Outputs: hello world
```
