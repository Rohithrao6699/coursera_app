import { Hero } from "../components/Hero";
import { Form } from "../components/Form";

export function Signup() {
  function handleClick(e: React.FormEvent<HTMLFormElement>) {
    console.log(e);
  }
  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        <Hero />
        <Form onSubmit={handleClick} type="signup" />
      </div>
    </>
  );
}
