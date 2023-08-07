import adapter from '@sveltejs/adapter-static';
import {
	vitePreprocess
} from '@sveltejs/kit/vite';

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({strict: false}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '' : '',
		}
	}
};

export default config;