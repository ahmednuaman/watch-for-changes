import _ from 'lodash'
import { config } from 'aws-sdk'
import { diffWords } from 'diff'
import awsConfig from './aws.config.json'
import browser from './lib/browser'
import db from './lib/db'
import queue from './lib/queue'
import queueConfig from './queue.config.json'
import tableConfig from './table.config.json'

config.update(awsConfig)

const handler = ({ url, html }, context, callback) => {
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
    })

    await queue.send(queueConfig.diffs, url, {
      diffs: {
        DataType: 'string',
        StringValue: JSON.stringify(diffs)
      }
    })
  }

  callback()
}

export { handler }
