import { CourseBlogContentType } from "../types/UserTypes";
import { Button } from "../ui/Button";

export function UserCourseBlogContent({
  filteredcourse,
}: CourseBlogContentType) {
  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-semibold text-xl">{filteredcourse.title}</h2>
        <img alt="image" src={filteredcourse.image} className="min-h-40" />
        <h4 className="font-semibold text-lg">{filteredcourse.title}</h4>
        <p className="font-thin text-md">{filteredcourse.body}</p>
        <p>
          <span>skills you'll gain:</span>
          {filteredcourse.skills}
        </p>
        <div className="flex gap-2">
          <Button variant="primary" size="lg" text="buy now" />
          <Button variant="primary" size="lg" text="add to cart" />
        </div>
      </div>
    </>
  );
}
