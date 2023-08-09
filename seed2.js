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


Politician.find({})
    .then((found)=>{
        dict = {}
        found.forEach((f)=>{dict[f._id] = f.api_uri})
        return dict
    })
    .then((v)=>
    {
    Object.keys(v).forEach((id)=>{axios.get(v[id],{headers:  `X-API-Key: ${process.env.PROPUBLICA_API_KEY}`})
     .then((y)=>{
        const mostRecentVote = y.data.results[0]['most_recent_vote'];
        const roles = y.data.results[0]['roles']
        Politician.findByIdAndUpdate(id,
        {$set:{'most_recent_vote':mostRecentVote,'roles':roles}},{new:true})
        .then((result)=>{console.log(result)})
    })})

})

