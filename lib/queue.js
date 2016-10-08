import { SQS } from 'aws-sdk'

const sqs = new SQS()

const sqsCall = (method, params) =>
  new Promise((resolve, reject) =>
    sqs[method](params, (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  )

export default {
  send (QueueUrl, MessageBody, MessageAttributes) {
    return sqsCall('sendMessage', {
      MessageBody,
      MessageAttributes,
      QueueUrl
    })
  }
}
