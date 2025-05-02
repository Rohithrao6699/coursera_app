import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
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

///api/user
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
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
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout() {
  return (
    <>
      <div className="bg-red-200  min-h-screen max-w-screen flex flex-col gap-2 overflow-x-hidden">
        <div className="h-[15vh]">
          <Navbar />
        </div>
        <div className="flex-1 h-full flex flex-row">
          <Outlet />
        </div>
        <div className="h-[10vh]">
          <Footer />
        </div>
      </div>
    </>
  );
}
function AdminLayout() {
  return (
    <>
      <div className="bg-red-200  min-h-screen max-w-screen flex flex-col gap-2 overflow-x-hidden">
        <div className="h-[15vh]">
          <Navbar />
        </div>
        <div className="flex-1 h-full flex flex-row">
          <Outlet />
        </div>
        <div className="h-[10vh]">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
