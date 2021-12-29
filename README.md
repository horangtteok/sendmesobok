# boiler-plate

## Stack

FrontEnd

<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" style="height : auto; margin-right : 10px;"> <img src="https://img.shields.io/badge/Javascript-efd81d?style=flat&logo=javascript&logoColor=black" style="height : auto;margin-right : 10px;">

BackEnd

<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white" style="height : auto;margin-right : 10px;"> <img src="https://img.shields.io/badge/Express-white?style=flat&logo=Express&logoColor=black" style="height : auto;margin-right : 10px;"> <img src="https://img.shields.io/badge/mongoDB-4ea94b?style=flat&logo=MongoDB&logoColor=white" style="height : auto;margin-right : 10px;">

<br>

## Get Started

- Create /server/config/dev.js: need mongoDB URI
  ```javascript
  module.exports = {
    mongoURI: '{your own URI}',
  }
  ```

- Start both frontend and backend: 
`
npm run dev
`

<br>

### Features
1. Data schema: User
2. Login/ Logout/ Register
4. Auth hoc
    - Bcrypt: password encryption
