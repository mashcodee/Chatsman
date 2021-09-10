import { gql } from '@apollo/client'

export const HEALTH_CHECKUP = gql`
    query ExampleQuery {
        health
    }
`

export const GET_USER = gql`
query GetUser($id:String){
  getUser(id:$id){
    success
    message
    user{
      id
      name
      image
      name
    }
  }
}
`

export const GET_CONVERSATIONS = gql`
    query GetConversation{
  getConversations {
    message
    success
    conversations {
      id
      members
      name
      isGroup
      image
    }
  }
}
`