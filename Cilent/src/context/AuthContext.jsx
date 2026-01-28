import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Set default axios header
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                setAuthToken(token);
                try {
                    const { data } = await axios.get("http://localhost:5000/api/auth/me");
                    setUser({ ...data, token });
                } catch (error) {
                    localStorage.removeItem("token");
                    setAuthToken(null);
                }
            }
            setLoading(false);
        };

        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post("http://localhost:5000/api/auth/login", {
            email,
            password,
        });
        localStorage.setItem("token", data.token);
        setAuthToken(data.token);
        setUser(data);
    };

    const register = async (username, email, password) => {
        const { data } = await axios.post("http://localhost:5000/api/auth/register", {
            username,
            email,
            password,
        });
        localStorage.setItem("token", data.token);
        setAuthToken(data.token);
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
