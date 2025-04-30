import { Form } from "../components/Form";
import { Hero } from "../components/Hero";

export function Signin() {
  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        <Hero />
        <Form type="signin" />
      </div>
    </>
  );
}
