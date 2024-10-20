import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";

function App() {
	const [value, setValue] = React.useState("console.log('hello world!');");
	const onChange = React.useCallback((val, viewUpdate) => {
		console.log("val:", val);
		setValue(val);
	}, []);

	const fixedHeightEditor = EditorView.theme({
		"&": { height: "100%" },
		".cm-scroller": { overflow: "auto", "z-index": 0 },
	});

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 z-50 w-full absolute bg-white items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">components</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">ui</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>button.tsx</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<CodeMirror
					value={value}
					className="h-full fixed top-16 w-full overscroll-contain"
					theme={fixedHeightEditor}
					extensions={[javascript({ jsx: true })]}
					onChange={onChange}
				/>
			</SidebarInset>
		</SidebarProvider>
	);
}

export default App;
