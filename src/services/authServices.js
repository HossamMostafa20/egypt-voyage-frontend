
//            Register
export async function sendRegisterData(userData) {
    try {
        const response = await fetch("http://egyptvoyage.runasp.net/api/Auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        // console.log(data);
        return data;

    } catch (data) {
        console.log(data.message);
        return data.message;
    }
};


//            Login
export async function sendLoginData(data) {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    });

    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(payload?.message || "Login failed");
    }

    return payload;
}
