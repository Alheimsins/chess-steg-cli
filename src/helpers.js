const axios = require('axios')
const { stringify } = require('querystring')
const isUrl = id => id.startsWith('http')
const extractId = url => url.split('/').pop()

// Post PGN to lichess.org/import and return lichess url
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
    throw error
  }
}

// Retrive PGN from lichess ID through lichess API. Returns PGN
const getPgnFromId = async (id, flags) => {
  // Adds full move numbers to PGN
  const numMoves = moves => {
    let moveCount = 0
    return moves.split(' ').map((move, i) => {
      return ++i % 2 === 1 ? `${++moveCount}. ${move}` : move
    }).join(' ')
  }
  const axios = require('axios')
  const options = {
    url: `https://lichess.org/game/export/${isUrl(id) ? extractId(id) : id}`,
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
    throw error
  }
}

module.exports = {
  getPgnUrl,
  getPgnFromId
}
