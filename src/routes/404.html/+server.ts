export const prerender = true

import { redirect } from '@sveltejs/kit';

export async function GET() {
    console.log("Redirecting to main page due to 404...")
    throw redirect(302, `/encode`)
}