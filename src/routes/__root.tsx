import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { AuthContext } from "@/auth";

interface RouterContext {
	auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
		</>
	),
});
