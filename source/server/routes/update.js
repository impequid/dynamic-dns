// import external
import koaRouter from 'koa-router';

// import internal
import domains from '../domains';

// routes
const router = koaRouter();

router.get('/:token', function * (next) {

	const {token} = this.params;
	const ip = this.headers['x-real-ip'] || this.ip;

	yield domains.update(token, ip).then(result => {
		const {domain} = result;
		this.body = `${domain}.${config.domain} -> ${ip}`;
	}).catch((error) => {
		this.body = `something went wrong: ${error}`;
		this.status = 500;
	});

	console.log(this.body);

	yield next;
});

export default router;
