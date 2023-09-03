import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ url }) => {
    let searchElement = url.pathname;
    console.log(`${searchElement} - searchElement`)
    if (!searchElement.endsWith("encode") && !searchElement.endsWith("decode")) {
        console.log(`${searchElement} - searchElement, Redirecting to encode`)
        throw redirect(302, `/encode`)
    }
}) satisfies LayoutServerLoad;