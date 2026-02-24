const TOKEN_KEY = "token";

/**
 * تخزين التوكن
 */
export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

/**
 * جلب التوكن
 */
export function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * حذف التوكن (Logout)
 */
export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

/**
 * هل المستخدم مسجل دخول؟
 */
export function isAuthenticated() {
    return !!getToken();
}
