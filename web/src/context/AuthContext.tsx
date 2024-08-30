import { trpc } from "@/App";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextData {
	user: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => void;
	isAuthenticated: boolean;
	getToken: () => string | null;
}

interface User {
	id: string;
	name: string;
	email: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const signInMutation = trpc.auth.signIn.useMutation();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const signIn = async (email: string, password: string) => {
		try {
			const result = await signInMutation.mutateAsync({ email, password });
			const { token, user } = result;
			localStorage.setItem("token", token);
			setUser({
				id: user.id,
				name: user.name || "",
				email: user.email,
			});
			setIsAuthenticated(true);
		} catch (error) {
			console.error("Erro ao fazer login:", error);
			throw error;
		}
	};

	const signOut = () => {
		setUser(null);
		setIsAuthenticated(false);
		localStorage.removeItem("token");
	};

	const getToken = () => {
		return localStorage.getItem("token");
	};

	return (
		<AuthContext.Provider
			value={{ user, signIn, signOut, isAuthenticated, getToken }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
