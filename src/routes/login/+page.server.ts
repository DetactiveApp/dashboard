import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private"
import { redirect } from "@sveltejs/kit"
import { OAuth2Client } from "google-auth-library"
import Config from "$lib/server/config.json"
import { dev } from "$app/environment"

export const load = ({ cookies }) => {
    const email = cookies.get('email')
    if (Config.authorizedEmails.includes(email as string)) {
        throw redirect(303, "/")
    }
}

export const actions = {
    OAuth2: async ({ }) => {
        const redirectUrl = !dev ? 'https://dashboard.detactive.de/api/oauth' : 'http://localhost:5173/api/oauth'
        console.log(redirectUrl)

        const oAuth2Client = new OAuth2Client(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            redirectUrl
        )

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.email openid',
            prompt: 'consent',
        })

        throw redirect(302, authorizeUrl);
    }
}