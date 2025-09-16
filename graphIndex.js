import express from "express";
import dotenv from "dotenv";

import {typeDefs} from './graphql/graphIndex.js';
import {resolvers} from './graphql/graphIndex.js';

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import { connectDB } from "./db/dbConnection.js";


dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRouter)
app.use("/tasks", taskRouter)

const apollo = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
});
await apollo.start();

app.use(
	"/graphql",
	expressMiddleware(apollo, {
		context: async () => ({}),
	})
);

const PORT = process.env.PORT || 4000;

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log("Rest is running on port 4000");
		});
	})
	.catch(console.error);