import { getToken } from "./authToken";

export function requireAuth(router) {
    const token = getToken();

    if (!token) {
        router.push("/login");
        return false;
    }

    return true;
}
