import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/components/login/login-form";

const fallback = "/dashboard" as const;

export const Route = createFileRoute("/login")({
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: fallback });
		}
	},
	component: () => (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<LoginForm />
		</div>
	),
});
