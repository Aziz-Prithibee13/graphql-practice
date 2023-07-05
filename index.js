const express = require('express');
const cors = require("cors");

const graphql = require('graphql');

const { graphqlHTTP } = require("express-graphql")

const { Mongoose, default: mongoose } = require('mongoose');
const product = require('./Models/Product')
const user = require('./Models/User')

require("dotenv").config();



const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());



const { GraphQLObjectType, GraphQLString, GraphQLSchema, buildSchema } = graphql



app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
      type products 
      {
        _id : String!
        name : String!
        family : String!
        scientificName : String!
      }

      type user{
        name : String!
      }

      type RootQuery 
      {
          data : [products!]!
          user : [user!]!
      }

      type RootMutation 
      {
          getData(data: String): String
      }


        schema {
          query: RootQuery
          mutation: RootMutation
        }
    
    `
  ),
  rootValue:
  {
    data: () => {
      return product.find().
      then(events =>
        {
          return events.map(event=>{
            console.log(...event._doc);
            return {...event._doc};
          })
        }).
      catch(err=>
        {
          throw err;
        })
    },
    user : async () => {
      const users = await user.find({})
      return users;
    },

    getData: (args) => {
      const newData = args.name;
      return newData
    }
  },
  graphiql: true
}))




app.get("/", (req, res) => {
  res.send("graphql practice Running");
});

app.listen(port, () => {

  mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@birdly.ou1diwj.mongodb.net/birdly?retryWrites=true&w=majority`).catch((err) => {
    console.log(err);
  })

  console.log("Graphql practice in port ", port);
});