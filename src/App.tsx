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

const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <div>404</div>
    },
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/app",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <RoleBasedRedirect />
        },
        {
          path: "admin",
          element: <Administrator />
        },
        {
          path: "candidate",
          element: <Candidate />
        },
        {
          path: "lead-poll-watcher",
          element: <LeadPollWatcherLayout />
        },
        {
          path: "legal-officer",
          element: <LegalOfficer />
        },
        {
          path: "poll-watcher",
          element: <PollWatcherLayout />
        },
        {
          path: "superadmin",
          element: <SuperAdministratorLayout />
        },
      ]
    },
  ])

  return (
    <Suspense fallback={<Spinner />} >
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
