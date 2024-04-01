import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private"
import { redirect } from "@sveltejs/kit"
import { OAuth2Client } from "google-auth-library"

export const actions = {
    OAuth2: async ({ }) => {
        const redirectUrl = process.env.NODE_ENV === 'production' ? 'https://dashboard.detactive.de/api/oauth' : 'http://localhost:5173/api/oauth'

        const oAuth2Client = new OAuth2Client(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            redirectUrl
        )

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
            prompt: 'consent',
        })


        throw redirect(302, authorizeUrl);
    }
}