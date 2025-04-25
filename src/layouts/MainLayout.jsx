import { Outlet, useLocation } from 'react-router-dom';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '../components/mode-toggle';

export default function MainLayout() {
	const location = useLocation();

	// Define breadcrumb mapping based on route
	const breadcrumbMap = {
		'/dashboard': { parent: 'Home', current: 'Dashboard' },
		'/form-ui': { parent: 'Home', current: 'Forms' },
		'*': { parent: 'Home', current: '404 Not Found' },
	};

	const { parent, current } = breadcrumbMap[location.pathname] || {
		parent: 'Home',
		current: 'Unknown',
	};

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center justify-between w-full px-4">
						<div className="flex items-center gap-2">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 h-4" />
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem className="hidden md:block">
										<BreadcrumbLink href="/dashboard">{parent}</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator className="hidden md:block" />
									<BreadcrumbItem>
										<BreadcrumbPage>{current}</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>
						<ModeToggle />
					</div>
				</header>
				<Separator />
				<div className="container mx-auto p-4">
					<Outlet />
				</div>
				<Separator />
				<footer className="py-4 mx-auto">
					<div className="container mx-auto px-4 text-center text-sm font-bold">
						© {new Date().getFullYear()} Shadow CDN. All rights reserved.
					</div>
				</footer>
			</SidebarInset>
		</SidebarProvider>
	);
}
