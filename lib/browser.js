import _ from 'lodash'
import jquery from 'raw!jquery'
import jsdom from 'jsdom'

const Browser = (html, targets) => new Promise((resolve, reject) => {
  jsdom.env(html, [jquery], (error, window) => {
    if (error) {
      return reject(error)
    }

    const $ = window.$

    resolve(_.transform(targets, (result, target) => {
      result[target] = $(target).text()
    }, {}))
  })
})

export default Browser
