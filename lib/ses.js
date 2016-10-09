import { SES } from 'aws-sdk'

const ses = new SES()

export default {
  sendEmail (to, subject, body) {
    return new Promise((resolve, reject) => 
      ses.sendEmail({
        Destination: {
          ToAddresses: [to]
        },
        Source: 'ahmed@ahmednuaman.com',
        Message: {
          Subject: {
            Data: subject
          },
          Body: {
            Text: {
              Data: body
            }
          }
        }
      }, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    )
  }
}
