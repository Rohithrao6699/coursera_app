import { Content } from "../components/Content";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export function Dashboard() {
  return (
    <>
      <div className="bg-red-200  min-h-screen max-w-screen flex flex-col gap-2">
        <div className="h-[15vh]">
          <Navbar />
        </div>
        <div className="flex-1">
          <Content />
        </div>
        <div className="h-[10vh]">
          <Footer />
        </div>
      </div>
    </>
  );
}
