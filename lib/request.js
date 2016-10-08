import request from 'request'

export default (url) =>
  new Promise((resolve, reject) =>
    request(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(response)
      } else {
        resolve(body)
      }
    })
  )
