import { createBrowserRouter, RouterProvider } from "react-router"
import { Suspense } from "react"
import Spinner from "./components/Spinner"
import RootLayout from "./layout/RootLayout"
import LoginPage from "@/pages/LoginPage"
import RoleBasedRedirect from "./route-handler/RoleBasedRedirect"
import Administrator from "./layout/Administrator"
import Candidate from "./layout/Candidate"
import LeadPollWatcherLayout from "./layout/LeadPollWatcherLayout"
import LegalOfficer from "./layout/LegalOfficer"
import PollWatcherLayout from "./layout/PollWatcherLayout"
import SuperAdministratorLayout from "./layout/SuperAdministratorLayout"
import LandingPage from "@/pages/LandingPage"
import { Toaster } from 'sonner'
import ProtectedRoute from "./route-handler/ProtectedRoute"
import ERHeader from "./pages/poll-watcher/pages/ERHeader"
import Home from "./pages/home/Home"
import MayorViceMayor from "./pages/poll-watcher/pages/MayorViceMayor"

const App = () => {
  const router = createBrowserRouter([
    { path: "*", element: <div>404</div> },
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/home", element: <Home /> },
    {
      path: "/app",
      element: <ProtectedRoute allowedRoles={["admin", "superadmin", "candidate", "poll-watcher", "leadpollwatcher", "legalofficer"]} />,
      children: [
        {
          element: <RootLayout />,
          children: [
            { index: true, element: <RoleBasedRedirect /> },

            {
              path: "admin",
              element: (
                <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                  <Administrator />
                </ProtectedRoute>
              ),
            },
            {
              path: "candidate",
              element: (
                <ProtectedRoute allowedRoles={["candidate"]}>
                  <Candidate />
                </ProtectedRoute>
              ),
            },
            {
              path: "lead-poll-watcher",
              element: (
                <ProtectedRoute allowedRoles={["leadpollwatcher"]}>
                  <LeadPollWatcherLayout />
                </ProtectedRoute>
              ),
            },
            {
              path: "legal-officer",
              element: (
                <ProtectedRoute allowedRoles={["legalofficer"]}>
                  <LegalOfficer />
                </ProtectedRoute>
              ),
            },
            {
              path: "poll-watcher",
              element: (
                <ProtectedRoute allowedRoles={["poll-watcher"]}>
                  <PollWatcherLayout />
                </ProtectedRoute>
              ),
              children: [
                {
                  path: "er-header",
                  element: <ERHeader />
                },
                {
                  path: "mayor-vice-mayor-er",
                  element: <MayorViceMayor />
                }
              ]
            },
            {
              path: "superadmin",
              element: (
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <SuperAdministratorLayout />
                </ProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);


  return (
    <>
      <Toaster richColors position="top-right" />
      <Suspense fallback={<Spinner />} >
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
