import _ from 'lodash'
import { config } from 'aws-sdk'
import { diffWords } from 'diff'

config.loadFromPath('./config.json')

import browser from './lib/browser'
import db from './lib/db'
import request from './lib/request'

const handler = ({ url, targets }, context, callback) => {
  const html = await request(url)
  const window = await browser(html)

  const newTargets = _.transform(targets, (result, target) => {
    result[target] = window.jQuery(target).text()
  }, {})

  await db.put({
    url: url,
    targets: 
  })
}

export { handler }
