import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {base} from "$app/paths";

export const load = (({ url }) => {
    let searchElement = url.pathname;
    if (!searchElement.endsWith("/encode") && !searchElement.endsWith("/decode")) {
        console.log("Redirecting to encode")
        throw redirect(302, `${base}/encode`)
    }
}) satisfies LayoutServerLoad;