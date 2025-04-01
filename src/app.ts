import { fileURLToPath } from 'url';

import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import ejs from 'ejs';
import Fastify from 'fastify';

import { UserDocs } from './docs/user.docs.ts';
import { OpenApiManager } from './managers/openapi.manager.ts';
import { UserRoutes } from './routes/user.route.ts';

export const app = Fastify({ logger: true });

app.register(cors);
app.register(fastifyJwt, { secret: 'testSecret' });

const registry = new OpenAPIRegistry();
const manager = new OpenApiManager(registry);

new UserDocs(manager).registerDocs();

const generator = new OpenApiGeneratorV3(registry.definitions);

app.get('/docs', async (_, reply) => {
  const spec = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'Architecture PoC OAS3',
      version: '1.0.0',
    },
  });
  const encodedSpec = encodeURIComponent(JSON.stringify(spec));
  const templatePath = fileURLToPath(new URL('./docs/template.ejs', import.meta.url));

  const html = await ejs.renderFile(templatePath, { openApi: encodedSpec });

  reply.type('text/html').send(html);
});

const userRouter = new UserRoutes(app);
userRouter.registerRoutes();
