require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose')
const Politician = require('./models/Politician')



function range(start, end) {
    if(start === end) return [axios.get(`https://api.propublica.org/congress/v1/${start}/senate/members.json`
    , {
        headers:  'X-API-Key: ecUtaApjr5p3Vbt8F8BGWnv1NEAHbY6fSQhGLfTO'
    })];
    return [axios.get(`https://api.propublica.org/congress/v1/${start}/senate/members.json`
    , {
        headers:  'X-API-Key: ecUtaApjr5p3Vbt8F8BGWnv1NEAHbY6fSQhGLfTO'
    }), ...range(start + 1, end)];
}
const promises = range(80,117)
console.log(promises)
const results  = async () => {
    try {
        const result = await Promise.all(promises)
        const politicians = await Politician.create(result.map((r)=>r.data.results[0].members).flat()) 
    } catch (err) {
        console.log("Error creating politicians", err)
    }
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .then(results())
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

//mongoose.connection.close()
