import { Button } from "../ui/Button";

export function CourseBlogContent() {
  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-semibold text-xl">
          Pontificia Universidad Católica de Chile
        </h2>
        <img alt="image" className="min-h-40" />
        <h4 className="font-semibold text-lg">
          English for commoners to become pro at this and help othera at
          learning englid=sh
        </h4>
        <p className="font-thin text-md">the whole body of course</p>
        <p>skills you'll gain</p>
        <div className="flex gap-2">
          <Button variant="primary" size="lg" text="buy now" />
          <Button variant="primary" size="lg" text="add to cart" />
        </div>
      </div>
    </>
  );
}
