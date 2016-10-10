import { config } from 'aws-sdk'

import _ from 'lodash'
import awsConfig from './config/aws.config.json'
import db from './lib/db'
import ses from './lib/ses'
import tableConfig from './config/table.config.json'

config.update(awsConfig)

const handler = ({ email, changes }, context, callback) => {
  const subject = `We've found ${changes.length} change${changes.length > 1 ? 's' : ''}!`
  const diffs = _.map(changes, (diffs, url) => 
    `- ${url}:
    ` + 
    _(diffs)
      .values()
      .flatten()
      .filter((diff) => diff.added || diff.removed)
      .map((diff) => `${diff.added ? 'Added' : 'Removed'}: ${diff.value}`)
      .join('\n    ')
      .value()
  )
  const body = `Hey-yo! ${subject}\n\n${diffs.join('\n')}\n\nFrom watch-for-changes`

  try {
    await ses.sendEmail(email, subject, body)
  } catch (error) {
    return callback(error)
  }

  await db.delete({ url }, tableConfig.changes.name)

  callback()
}

export { handler }
