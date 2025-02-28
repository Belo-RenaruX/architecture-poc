import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";

import { UserRoutes } from "./routes/user.route.ts";

export const app: FastifyInstance = Fastify({ logger: true });

app.register(cors);
app.register(fastifyJwt, { secret: 'testSecret' });

const userRouter = new UserRoutes(app);
userRouter.registerRoutes();