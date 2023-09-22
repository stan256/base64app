import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ url }) => {
    let searchElement = url.pathname;
    console.log(`${searchElement} - url.pathname`)
    if (!searchElement.endsWith("encode") && !searchElement.endsWith("decode") && !searchElement.endsWith("sitemap")) {
        console.log(`${searchElement} - searchElement, Redirecting to encode`)
        throw redirect(302, `/encode`)
    }
}) satisfies LayoutServerLoad;