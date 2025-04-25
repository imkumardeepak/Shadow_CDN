import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import ErrorBoundary from './../components/ErrorBoundary';
import NotFound from '../components/NotFound';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Lazy-loaded pages
const Dashboard = lazy(() => import('../Pages/Dashboard/Index'));
const FormUI = lazy(() => import('../Pages/FormUI/Index'));
const LoginForm = lazy(() => import('../Pages/Auth/LoginForm'));

// Spinner
const LoadingSpinner = ({ loadingBarRef }) => {
	useEffect(() => {
		loadingBarRef.current?.continuousStart();
		return () => loadingBarRef.current?.complete();
	}, [loadingBarRef]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
		</div>
	);
};

const SuspenseWrapper = ({ children, loadingBarRef }) => {
	useEffect(() => {
		loadingBarRef.current?.complete();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [loadingBarRef]);

	return <>{children}</>;
};

export default function RoutesComponent() {
	const loadingBarRef = useRef(null);
	const location = useLocation();

	useEffect(() => {
		loadingBarRef.current?.continuousStart();
		const timer = setTimeout(() => {
			loadingBarRef.current?.complete();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 500);
		return () => clearTimeout(timer);
	}, [location.pathname]);

	return (
		<>
			<LoadingBar color="#3b82f6" ref={loadingBarRef} shadow={true} height={3} />
			<ErrorBoundary>
				<Suspense fallback={<LoadingSpinner loadingBarRef={loadingBarRef} />}>
					<Routes>
						<Route path="/" element={<AuthLayout />}>
							<Route index element={<LoginForm />} />
						</Route>

						{/* Main Layout - with sidebar/navbar */}
						<Route element={<MainLayout />}>
							<Route
								path="/dashboard"
								element={
									<SuspenseWrapper loadingBarRef={loadingBarRef}>
										<Dashboard />
									</SuspenseWrapper>
								}
							/>
							<Route
								path="/form-ui"
								element={
									<SuspenseWrapper loadingBarRef={loadingBarRef}>
										<FormUI />
									</SuspenseWrapper>
								}
							/>
						</Route>

						{/* Catch-all 404 page */}
						<Route
							path="*"
							element={
								<SuspenseWrapper loadingBarRef={loadingBarRef}>
									<NotFound />
								</SuspenseWrapper>
							}
						/>
					</Routes>
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
