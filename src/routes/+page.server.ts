import Config from "$lib/server/config.json"
import { redirect } from "@sveltejs/kit"

export const load = ({ cookies }) => {
    const email = cookies.get('email')
    if (!Config.authorizedEmails.includes(email as string)) {
        throw redirect(303, "/login")
    }

}