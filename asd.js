const { stringify } = require('querystring')
const axios = require('axios')
const url = 'https://lichess.org/import'

const pgn = {
  pgn: '1. e3 Nh6 2. d4 Nf5 3. Qd2 Rg8 4. Ne2 c6 5. b3 d6 6. a3 Be6 7. d5 Kd7 8. Qd3 Kc8 9. Qb5 b6 10. Ng1 { Black resigns. } 1-0'
}

const options = {
  method: 'POST',
  data: stringify(pgn)
}

axios(url, options)
  .then(res => {
    console.log(res.request.res.responseUrl)
  })
  .catch(error => console.log(error))
