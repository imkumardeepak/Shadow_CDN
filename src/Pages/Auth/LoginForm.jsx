import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginForm() {
	return (
		<div className={cn('flex flex-col gap-6')}>
			<Card className="overflow-hidden p-0 shadow-md md:shadow-lg">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form className="p-6 md:p-8">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center text-center">
								<h1 className="text-2xl font-bold">Welcome back</h1>
								<p className="text-muted-foreground text-balance">Login to your Acme Inc account</p>
							</div>
							<div className="grid gap-4">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" placeholder="m@example.com" required />
							</div>
							<div className="grid gap-4">
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" required />
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox id="remember" />
								<Label htmlFor="remember" className="ml-2">
									Remember me
								</Label>
							</div>
							<Button type="submit" className="w-full">
								Login
							</Button>
						</div>
					</form>
					<div className="bg-muted relative hidden md:block">
						<img
							src="https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							alt="Image"
							className="absolute inset-0 h-full w-full object-cover dark:grayscale"
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
