import * as React from "react";
import {
	ChevronRight,
	Command,
	File,
	Folder,
	Library,
	MessagesSquare,
	SquareTerminal,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { useLocation, useRouter } from "@tanstack/react-router";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";

const tree_data = {
	changes: [
		{
			file: "README.md",
			state: "",
		},
	],
	tree: [
		[
			"app",
			[
				"api",
				["hello", ["route.ts"]],
				"page.tsx",
				"layout.tsx",
				["blog", ["page.tsx"]],
			],
		],
		[
			"components",
			["ui", "button.tsx", "card.tsx"],
			"header.tsx",
			"footer.tsx",
		],
		["lib", ["util.ts"]],
		["public", "favicon.ico", "vercel.svg"],
		".eslintrc.json",
		".gitignore",
		"next.config.js",
		"tailwind.config.js",
		"package.json",
		"README.md",
	],
};

const courses = [
	"Building Your Application",
	"Data Fetching",
	"Authentication",
	"Testing",
	"Deployment",
	"Optimization",
	"Next Steps",
];

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Courses",
			url: "/courses",
			icon: Library,
			isActive: true,
			sidebar: (
				<>
					<Sidebar collapsible="none" className="hidden flex-1 md:flex">
						{" "}
						<SidebarContent>
							<SidebarGroup>
								<SidebarGroupLabel>Course Plan</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{courses.map((course, index) => (
											<SidebarMenuItem key={index}>
												<SidebarMenuButton>
													<span>{course}</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>
					</Sidebar>
					<SidebarRail />
				</>
			),
		},
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: SquareTerminal,
			isActive: false,
			sidebar: (
				<>
					<Sidebar collapsible="none" className="hidden flex-1 md:flex">
						{" "}
						<SidebarContent>
							<SidebarGroup>
								<SidebarGroupLabel>Files</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{tree_data.tree.map((item, index) => (
											<Tree key={index} item={item} />
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>
					</Sidebar>
					<SidebarRail />
				</>
			),
		},
		{
			title: "Messages",
			url: "#",
			icon: MessagesSquare,
			isActive: false,
			sidebar: <></>,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const router = useRouter();
	const location = useLocation();
	console.log(location.pathname);
	const [activeItem, setActiveItem] = React.useState(
		data.navMain.filter((item) => item.url === location.pathname)[0],
	);
	const { setOpen } = useSidebar();

	return (
		<Sidebar
			collapsible="icon"
			className="bg-blue-500 overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
			{...props}
		>
			<Sidebar
				collapsible="none"
				className="!w-[calc(var(--sidebar-width-icon)_+_1px)] h-full border-r"
			>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
								<a href="#">
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<Command className="size-4" />
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">Acme Inc</span>
										<span className="truncate text-xs">Enterprise</span>
									</div>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent className="px-1.5 md:px-0">
							<SidebarMenu>
								{data.navMain.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											tooltip={{
												children: item.title,
												hidden: false,
											}}
											onClick={() => {
												setActiveItem(item);
												router.navigate({ to: item.url });
												setOpen(true);
											}}
											isActive={activeItem.title === item.title}
											className="px-2.5 md:px-2"
										>
											<item.icon />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<NavUser user={data.user} />
				</SidebarFooter>
			</Sidebar>
			{activeItem.sidebar}
		</Sidebar>
	);
}

function Tree({ item }: { item: string | any[] }) {
	const [name, ...items] = Array.isArray(item) ? item : [item];

	if (!items.length) {
		return (
			<SidebarMenuButton
				isActive={name === "button.tsx"}
				className="data-[active=true]:bg-transparent"
			>
				<File />
				{name}
			</SidebarMenuButton>
		);
	}

	return (
		<SidebarMenuItem>
			<Collapsible
				className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
				defaultOpen={name === "components" || name === "ui"}
			>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton>
						<ChevronRight className="transition-transform" />
						<Folder />
						{name}
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{items.map((subItem, index) => (
							<Tree key={index} item={subItem} />
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</Collapsible>
		</SidebarMenuItem>
	);
}
