import "./global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";

import { ThemeProvider } from "./components/theme/theme-provider";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import type { AppRouter } from "../../server/src/index";
import { createTRPCReact } from "@trpc/react-query";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

export const trpc = createTRPCReact<AppRouter>();

dayjs.locale({
	...ptBr,
	weekStart: 1,
});

dayjs()
	.startOf("month")
	.add(1, "day")
	.set("year", 2018)
	.format("YYYY-MM-DD HH:mm:ss");

export function App() {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:3000",
					headers() {
						const token = localStorage.getItem("token");
						return token ? { Authorization: `Bearer ${token}` } : {};
					},
				}),
			],
		}),
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<HelmetProvider>
					<ThemeProvider defaultTheme="light" storageKey="clinicup-theme">
						<Helmet titleTemplate="%s | Clinic Up" />
						<Toaster richColors />
						<AuthProvider>
							<RouterProvider router={router} />
						</AuthProvider>
					</ThemeProvider>
				</HelmetProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export default App;
