require('dotenv').config()

const axios = require('axios')
const mongoose = require('mongoose')

const Politician = require('./models/Politician')


mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


axios.get("https://api.propublica.org/congress/v1/116/senate/members.json"
, {
    headers:  'X-API-Key: ecUtaApjr5p3Vbt8F8BGWnv1NEAHbY6fSQhGLfTO'
})
    .then((results) => {
        Politician.create(results.data.results[0].members)
            .then((createdPoliticians) => {
                console.log("Created ====>", createdPoliticians)
                mongoose.connection.close()
            })
            .catch((err) => {
                console.log("Error creating politicians", err)
            })


    })
    .catch((err) => {
        console.log("Error connecting with Axios", err)
        next(err)

    
 
    })