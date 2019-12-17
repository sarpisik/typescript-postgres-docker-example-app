import { Router } from 'express';

const router = Router();

const html = `
<h1 style="text-align:center;">Greetings!</h1>
<p style="text-align:center;">Please visit <a href="https://github.com/sarpisik/typescript-postgres-docker-example-app/blob/master/README.md#routes">documentation</a> for routes definitions.</p>
`;

router.get('/', (_req, res, _next) => {
  res.send(html);
});

export default router;
