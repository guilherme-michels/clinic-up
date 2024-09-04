import { trpc } from "@/App";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextData {
	user: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => void;
	isAuthenticated: boolean;
	getToken: () => string | null;
	checkAuth: () => Promise<void>;
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
	const checkAuthMutation = trpc.auth.profile.useQuery();

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

	const checkAuth = async () => {
		const token = getToken();
		if (token) {
			try {
				const result = await checkAuthMutation.refetch();
				if (result.data) {
					setUser({
						id: result.data.id,
						name: result.data.name || "",
						email: result.data.email,
					});
					setIsAuthenticated(true);
				} else {
					throw new Error("Dados de autenticação inválidos");
				}
			} catch (error) {
				setIsAuthenticated(false);

				console.error("Erro ao verificar autenticação:", error);
				signOut();
			}
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, signIn, signOut, isAuthenticated, getToken, checkAuth }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
