import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ url }) => {
    if (!["/encode", "/decode"].includes(url.pathname)) {
        throw redirect(302, "/encode")
    }
}) satisfies LayoutServerLoad;