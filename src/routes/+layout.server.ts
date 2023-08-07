import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {base} from "$app/paths";

export const load = (({ url }) => {
    if (!["/encode", "/decode"].includes(url.pathname)) {
        throw redirect(302, `${base}/encode`)
    }
}) satisfies LayoutServerLoad;