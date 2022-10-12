# apollo-interactions

Simple application to demonstrate use of apollo server, apollo client and redux-toolkit. 
For client app to work properly you need to have server running.

To run server app:
- cd server
- npm install (requires node >=16)
- npm run dev

To run client app:
- cd client
- npm install (requires node >=16)
- npm run dev

# Features
- List, update topic and delete interactions with gql api
- Update and delete works optimistically
- You can update or delete only active interaction (you need to have accordion open to mark interaction active)
- E2E tests could be added with Cypress
