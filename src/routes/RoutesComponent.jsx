import React, { lazy, Suspense, useEffect, useRef } from "react";
import { Routes, Route, useNavigation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import ErrorBoundary from "./../components/ErrorBoundary";
import NotFound from "../components/NotFound";

// Lazy-loaded components
const Dashboard = lazy(() => import("../Pages/Dashboard/Index"));
const FormUI = lazy(() => import("../Pages/FormUI/Index"));

// Loading component with Tailwind CSS animation
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

// Wrapper for lazy-loaded components
const SuspenseWrapper = ({ children, loadingBarRef }) => {
  useEffect(() => {
    loadingBarRef.current?.complete();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loadingBarRef]);

  return <>{children}</>;
};

export default function RoutesComponent() {
  const loadingBarRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadingBarRef.current?.continuousStart();
    const timer = setTimeout(() => {
      loadingBarRef.current?.complete();
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on route change
    }, 500);
    return () => clearTimeout(timer);
  }, [navigation.state]);

  useEffect(() => {
    if (navigation.state === "loading") {
      loadingBarRef.current?.continuousStart();
    } else {
      loadingBarRef.current?.complete();
    }
  }, [navigation.state]);

  return (
    <>
      <LoadingBar
        color="#3b82f6"
        ref={loadingBarRef}
        shadow={true}
        height={3}
      />
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner loadingBarRef={loadingBarRef} />}>
          <Routes>
            <Route
              path="/"
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
