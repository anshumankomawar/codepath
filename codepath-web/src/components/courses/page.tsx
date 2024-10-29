import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
	return (
		<div>
			<header className="sticky top-0 h-12 flex shrink-0 items-center gap-2 border-b bg-background p-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>Inbox</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</header>
			<div className="h-full w-full items-center">
				<div className="flex flex-col px-8 py-4">
					<div className="flex flex-col space-y-4 p-6">
						{/* Course Title */}
						<h1 className="text-2xl font-bold text-gray-800">
							Building Your Application
						</h1>

						{/* Course Description */}
						<p className="text-gray-600">
							This course will teach you how to design, build, and deploy a
							fully functional application from scratch. You'll gain hands-on
							experience with front-end and back-end technologies, databases,
							and deployment workflows.
						</p>

						{/* Learning Outcomes */}
						<div>
							<h2 className="text-lg font-semibold text-gray-700">
								What you'll learn:
							</h2>
							<ul className="list-disc list-inside text-gray-600">
								<li>Understand the fundamentals of full-stack development</li>
								<li>Design an interactive user interface using React</li>
								<li>Build a REST API with Node.js and Express</li>
								<li>Store and manage data with a database like PostgreSQL</li>
								<li>Deploy your application to a cloud provider like Heroku</li>
							</ul>
						</div>

						{/* Prerequisites */}
						<div>
							<h2 className="text-lg font-semibold text-gray-700">
								Prerequisites:
							</h2>
							<ul className="list-disc list-inside text-gray-600">
								<li>Basic understanding of HTML, CSS, and JavaScript</li>
								<li>Familiarity with Git and GitHub for version control</li>
							</ul>
						</div>

						{/* Module Breakdown */}
						<div>
							<h2 className="text-lg font-semibold text-gray-700">
								Course Modules:
							</h2>
							<div className="flex flex-col space-y-3">
								<div className="bg-gray-50 p-4 rounded-md shadow-sm">
									<h3 className="font-bold text-gray-800">
										Module 1: Front-end Development with React
									</h3>
									<p className="text-gray-600">
										Learn how to create an interactive user interface using
										React, manage component state, and handle routing.
									</p>
								</div>

								<div className="bg-gray-50 p-4 rounded-md shadow-sm">
									<h3 className="font-bold text-gray-800">
										Module 2: Back-end Development with Node.js
									</h3>
									<p className="text-gray-600">
										Explore how to build a REST API with Express, handle HTTP
										requests, and manage data with a database.
									</p>
								</div>

								<div className="bg-gray-50 p-4 rounded-md shadow-sm">
									<h3 className="font-bold text-gray-800">
										Module 3: Database Management
									</h3>
									<p className="text-gray-600">
										Learn how to store and retrieve data using PostgreSQL and
										set up the database for your application.
									</p>
								</div>

								<div className="bg-gray-50 p-4 rounded-md shadow-sm">
									<h3 className="font-bold text-gray-800">
										Module 4: Deployment
									</h3>
									<p className="text-gray-600">
										Discover how to deploy your application to a cloud platform
										like Heroku and maintain it in a live environment.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
