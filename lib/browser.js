import { env } from 'jsdom'
import jquery from 'raw!jquery'

export default (html) =>
  new Promise((resolve, reject) => {
    env(html, [jquery], (error, window) => {
      if (error) {
        return reject(error)
      }

      resolve(window)
    })
  })
