import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { ErrorPage } from "./pages/Error";
import { CourseBlogPage } from "./pages/userPages/CourseBlogPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MyCourse } from "./pages/userPages/MyCourse";
import { UserContent } from "./components/UserContent";
import { AdminContent } from "./components/AdminContent";
import { CreateCourse } from "./pages/adminPages/CreateCourse";
import { CartPage } from "./pages/userPages/CartPage";
import { useSetRecoilState } from "recoil";
import { CreateUserAtom } from "./store/CreateUserAtom";

///api/user
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/user/dashboard" element={<Layout />}>
              <Route index element={<UserContent />} />
              <Route path="mycourses" element={<MyCourse />} />
              <Route path="course/:courseId" element={<CourseBlogPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
            <Route path="/admin/dashboard" element={<AdminLayout />}>
              <Route index element={<AdminContent />} />
              <Route path="createcourse" element={<CreateCourse />} />
            </Route>
          </Route>
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function ProtectedRoute() {
  let auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/signin" />;
}

function LandingLayout() {
  const setUserAtom = useSetRecoilState(CreateUserAtom);
  return (
    <>
      <div className="h-screen max-w-screen flex flex-col gap-5">
        <nav className="h-[10%] border-1 border-slate-300 flex items-center justify-between px-5">
          <div className="text-2xl font-black">Coursera</div>
          <div className="flex flex-row gap-5 px-5">
            <div
              className="text-lg font-black text-[#2f27ce] cursor-pointer hover:text-xl"
              onClick={() => setUserAtom("admin")}
            >
              Admin
            </div>
            <div
              className="text-lg font-black text-[#2f27ce] cursor pointer hover:text-xl"
              onClick={() => setUserAtom("user")}
            >
              Learner
            </div>
          </div>
        </nav>
        <div className="h-[80%]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
function Layout() {
  return (
    <>
      <div className="min-h-screen max-w-screen flex flex-col overflow-x-hidden">
        <div className="h-[12vh]">
          <Navbar />
        </div>
        <div className="flex-1 min-h-[78vh] flex flex-col">
          <Outlet />
        </div>
        <div className="h-[10vh] shrink-0">
          <Footer />
        </div>
      </div>
    </>
  );
}
function AdminLayout() {
  return (
    <div className="min-h-screen max-w-screen flex flex-col overflow-x-hidden">
      <div className="h-[12vh]">
        <Navbar />
      </div>
      <div className="flex-1 min-h-[78vh] flex flex-col">
        <Outlet />
      </div>
      <div className="h-[10vh] shrink-0">
        <Footer />
      </div>
    </div>
  );
}

export default App;
