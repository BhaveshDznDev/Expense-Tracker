import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar } from "./componenets";
import { setAuthToken } from "./libs/apiCall";
import { AccountsPage, Dashboard, SettingsPage, Transactions } from "./pages";
import useStore from "./store";
import { SignupPage } from "./pages/auth/sign-up";
import SigninPage from "./pages/auth/sign-in";

const RootLayout = () => {
  const { user } = useStore((state) => state);

  setAuthToken(user?.token || "");

  return !user ? (
    <Navigate to={"/sign-in"} replace={true} />
  ) : (
    <>
      <Navbar />
      <div className="min-h-[cal(h-screen-100px)]">
        <Outlet />
      </div>
    </>
  );
};

const App = () => {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <main>
      <div className="w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900">
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Navigate to={"/overview"} />} />
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/sign-in" element={<SigninPage />} />
        </Routes>
      </div>

      <Toaster richColors position="top-center" />
    </main>
  );
};

export default App;
