import Page from "@/components/courses/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/courses")({
	component: CoursesPage,
});

function CoursesPage() {
	return <Page />;
}
