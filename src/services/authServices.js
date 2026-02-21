
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
export async function sendLoginData(userData) {
    try {
        const response = await fetch("http://egyptvoyage.runasp.net/api/Auth/login", {
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
