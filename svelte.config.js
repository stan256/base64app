import adapter from '@sveltejs/adapter-static';
import {
	vitePreprocess
} from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev')

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: dev ? '' : process.env.BASE_PATH
		}
	}
};

export default config;