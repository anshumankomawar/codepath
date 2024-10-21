import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/auth";
import { sleep } from "@/lib/utils";

const fallback = "/dashboard" as const;

export function LoginForm() {
	const auth = useAuth();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleLogin() {
		console.log(auth);
		await auth.login(email, password);
		await router.invalidate();

		await sleep(1);

		await router.navigate({ to: fallback });
	}

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="john@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<div className="ml-auto inline-block text-xs underline hover:cursor-pointer">
								Forgot your password?
							</div>
						</div>
						<Input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Button type="submit" className="w-full" onClick={handleLogin}>
						Login
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<div className="underline inline-block hover:cursor-pointer">
						Sign up
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
