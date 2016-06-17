// import external
import koaRouter from 'koa-router';

// setup main router

const router = koaRouter();

/* /favicon */

router.get('/favicon.ico', function * () {
	this.redirect('https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/12-cube.svg/64px-12-cube.svg.png');
});

/* /domains */

import domainRouter from './domains';
router.use('/domains', domainRouter.routes(), domainRouter.allowedMethods());

/* /update */
import updateRouter from './update';
router.use('/update', updateRouter.routes(), updateRouter.allowedMethods());

/* /authenticate */
import authenticateRouter from './authenticate';
router.use('/authenticate', authenticateRouter.routes(), authenticateRouter.allowedMethods());

/* / */
import mainApp from './apps/main';
router.use('*', mainApp.routes(), mainApp.allowedMethods());

// export

export default router;
