import { Form } from "../components/Form";
import { Hero } from "../components/Hero";

export function Signin() {
  function handleClick(e: React.FormEvent<HTMLFormElement>) {
    console.log(e);
  }
  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        <Hero />
        <Form onSubmit={handleClick} type="signin" />
      </div>
    </>
  );
}
