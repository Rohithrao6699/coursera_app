import { Hero } from "../components/Hero";
import { Form } from "../components/Form";

export function Signup() {
  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        <Hero />
        <Form type="signup" />
      </div>
    </>
  );
}
