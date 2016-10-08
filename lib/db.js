import { DynamoDB } from 'aws-sdk'

const dynamoDB = new DynamoDB()

const DB = {
  get (props, table) {
    return new Promise((resolve, reject) => {
      dynamoDB.getItem({
        Item: props,
        TableName: table
      }, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  },

  put (props, table) {
    return new Promise((resolve, reject) =>
      dynamoDB.putItem({
        Item: props,
        TableName: table
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

export default DB
