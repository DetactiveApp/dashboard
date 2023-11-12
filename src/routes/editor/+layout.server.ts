import type { LayoutServerLoad } from "../$types";
import { SECRET_STUDIO_KEY } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = ({ cookies }) => {
    if (cookies.get("studio_key") != SECRET_STUDIO_KEY) {
        cookies.delete("studio_key");
        throw redirect(307, "/");
    }
}