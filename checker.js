import { config } from 'aws-sdk'
import { diffWords } from 'diff'

import _ from 'lodash'
import awsConfig from './config/aws.config.json'
import browser from './lib/browser'
import db from './lib/db'
import request from './lib/request'
import tableConfig from './config/table.config.json'

config.update(awsConfig)

const handler = ({ url }, context, callback) => {
  try {
    const body = await request(url)
  } catch (error) {
    return callback(error)
  }

  const targets = await db.get({ url }, tableConfig.targets.name)
  const window = await browser(html)

  const newTargets = _.transform(targets, (result, target) => {
    result[target] = window.jQuery(target).text()
  }, {})

  if (!_.eq(targets, newTargets)) {
    const diffs = _.transform(targets, (result, text, target) => {
      result[target] = diffWords(text, newTargets[target])
    }, {})

    await db.put({
      url,
      targets: newTargets
    }, tableConfig.targets.name)

    await db.put({
      url,
      Date.now(): diffs
    }, tableConfig.diffs.name)

    await db.put({
      url,
      diffs
    }, tableConfig.changes.name)
  }

  callback()
}

export { handler }
