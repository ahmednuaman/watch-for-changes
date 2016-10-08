import _ from 'lodash'
import { config } from 'aws-sdk'
import { diffWords } from 'diff'
import awsConfig from './aws.config.json'
import browser from './lib/browser'
import db from './lib/db'
import tables from './table.config.json'

config.update(awsConfig)

const handler = ({ url, html }, context, callback) => {
  const targets = await db.get({ url }, tables.targets.name)
  const window = await browser(html)

  const newTargets = _.transform(targets, (result, target) => {
    result[target] = window.jQuery(target).text()
  }, {})

  db.put({
    url
    targets: newTargets
  }, tables.targets.name)

  if (!_.eq(targets, newTargets)) {
    await db.put({
      url,
      Date.now(): _.transform(targets, (result, text, target) => {
        result[target] = diffWords(text, newTargets[target])
      }, {})
    })

    
  }
}

export { handler }
