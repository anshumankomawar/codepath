import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@/globals.css";
import { routeTree } from "@/routeTree.gen";
import { AuthProvider, useAuth } from "@/auth.tsx";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	context: {
		auth: undefined!,
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</StrictMode>,
);
