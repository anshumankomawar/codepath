import { AppSidebar } from "@/components/dashboard/sidebar";
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
import { python } from "@codemirror/lang-python";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
	const [value, setValue] = React.useState("print('Hello, World!')");
	const onChange = React.useCallback((val: string) => {
		setValue(val);
	}, []);

	const submitCode = () => {
		// TODO: Call the API to submit the code
	};

	const fixedHeightEditor = EditorView.theme({
		"&": { height: "100%" },
		"&.cm-editor.cm-focused": {
			outline: "none",
		},
		".cm-scroller": { overflow: "auto" },
	});

	return (
		<div>
			<header className="flex h-12 shrink-0 w-full bg-white items-center gap-2 border-b px-4">
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
				<div className="flex-1"></div>
				<Button size={"sm"} variant={"success"} onClick={submitCode}>
					Submit
				</Button>
			</header>
			<CodeMirror
				value={value}
				basicSetup={{
					autocompletion: false,
				}}
				className="h-full fixed top-20 w-full overscroll-contain"
				theme={fixedHeightEditor}
				extensions={[python()]}
				onChange={onChange}
			/>
		</div>
	);
}
