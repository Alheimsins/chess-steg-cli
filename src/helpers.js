const axios = require('axios')
const { stringify } = require('querystring')

const getPgnUrl = async (pgn, flags) => {
  const options = {
    method: 'POST',
    data: stringify({ pgn: pgn })
  }
  try {
    const { request: { res } } = await axios('https://lichess.org/import', options)
    return res.responseUrl
  } catch (error) {
    console.error('Could not get lichess.org URL')
    if (flags.debug) console.error(error)
  }

}

const getPgnFromId = async (id, flags) => {
  const numMoves = moves => {
    let moveCount = 0
    return moves.split(' ').map((move, i) => {
      return ++i % 2 !== 0 ? `${++moveCount}. ${move}` : move
    }).join(' ')
  }
  const axios = require('axios')
  const options = {
    url: `https://lichess.org/game/export/${id}`,
    method: 'GET',
    headers: {
      Accept: 'application/json'
    },
    params: {
      tags: true,
      clocks: false,
      evals: false,
      opening: false
    }
  }
  try {
    const { data: { winner, moves } } = await axios(options)
    const end = winner === 'white' ? '{ Black resigns. } 1-0' : '{ White resigns. } 0-1'
    return `${numMoves(moves)} ${end}`
  } catch (error) {
    console.error(`Could not get PGN from ${options.url}`)
    if (flags.debug) console.error(error)
  }
}

module.exports = {
  getPgnUrl,
  getPgnFromId
}
