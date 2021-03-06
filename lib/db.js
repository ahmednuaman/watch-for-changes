import { DynamoDB } from 'aws-sdk'

const dynamoDB = new DynamoDB.DocumentClient()

const dynamoCall = (method, params) =>
  new Promise((resolve, reject) =>
    dynamoDB[method](params, (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  )

export default {
  query (TableName, KeyConditionExpression, ExpressionAttributeNames, ExpressionAttributeValues) {
    return dynamoCall('query', {
      TableName,
      KeyConditionExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues
    })
  },

  scan (TableName, ProjectionExpression, FilterExpression, ExpressionAttributeNames, ExpressionAttributeValues) {
    return dynamoCall('query', {
      TableName,
      ProjectionExpression,
      FilterExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues
    })
  },

  get (Key, TableName) {
    return dynamoCall('get', {
      Key,
      TableName
    })
  },

  put (Item, TableName) {
    return dynamoCall('put', {
      Item,
      TableName
    })
  }

  delete (Key, TableName) {
    return dynamoCall('delete', {
      Key,
      TableName
    })
  }
}
