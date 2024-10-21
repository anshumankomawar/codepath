import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/auth";
import Dashboard from "@/components/dashboard";

export const Route = createFileRoute("/_auth/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	const auth = useAuth();

	return <Dashboard />;
}
