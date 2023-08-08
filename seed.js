require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose')
const Politician = require('./models/Politician')



function range(start, end,s) {
    if(start === end) return [axios.get(s.replace('to_replace',start),{headers:  `X-API-Key: ${process.env.PROPUBLICA_API_KEY}`})];
    return [axios.get(s.replace('to_replace',start),{headers:  `X-API-Key: ${process.env.PROPUBLICA_API_KEY}`}), ...range(start + 1, end,s)];
}
const promises = range(80,118,`https://api.propublica.org/congress/v1/to_replace/senate/members.json`).concat(range(101,118,`https://api.propublica.org/congress/v1/to_replace/house/members.json`))
const results  = async () => {
    try {
        const result = await Promise.all(promises)
        objUnique={}
        result.map((r)=>r.data.results[0].members).flat().forEach((r)=>{objUnique[r.id+r.short_title]=r})
        const politicians = await Politician.create(Object.values(objUnique)) 
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
