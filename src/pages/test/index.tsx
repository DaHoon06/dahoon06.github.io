import { useEffect } from "react";

const testFunction = async () => {
    const headers = {
        Authorization: "8ILsgn5XGHAJditbBnplpCRYCl0ji9KXjV2MVwfqfzEbhX2Gvz",
    };
    try {
        const response = await fetch(
            "https://simple-server-roan-psi.vercel.app",
            {
                headers,
                method: "GET",
            }
        );
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);
    } catch (error) {
        console.error(error);
    }
};

export default function TestPage() {
    useEffect(() => {
        testFunction();
    }, []);
    return <div>hello world</div>;
}
