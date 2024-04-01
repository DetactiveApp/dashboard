import { dev } from "$app/environment";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { redirect, type RequestHandler } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library";
import Config from "$lib/server/config.json"

export const GET: RequestHandler = async ({ url, cookies }) => {
    const redirectUrl = !dev ? 'https://dashboard.detactive.de/api/oauth' : 'http://localhost:5173/api/oauth'
    const code = await url.searchParams.get('code')

    try {
        const oAuth2Client = new OAuth2Client(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            redirectUrl
        )

        const r = await oAuth2Client.getToken(code as string)
        oAuth2Client.setCredentials(r.tokens)

        const ticket = await oAuth2Client.verifyIdToken({
            idToken: r.tokens?.id_token as string,
            audience: GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        const email = payload!['email']

        if (!Config.authorizedEmails.includes(email as string)) {
            throw redirect(303, "/login")
        }

        cookies.set('email', email as string, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: !dev,
            maxAge: 60 * 60 * 24 * 30
        });

        throw redirect(303, '/')

    } catch (err) {
        throw redirect(303, "/login")
    }
}