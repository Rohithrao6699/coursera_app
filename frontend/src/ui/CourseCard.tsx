interface CourseCardProps {
  handleClick: () => void;
}
export function CourseCard(props: CourseCardProps) {
  return (
    <>
      <div
        className="flex flex-col gap-2 bg-slate-200 max-w-70 min-h-65 max-h-100 p-2 rounded-md shadow-lg"
        onClick={props.handleClick}
      >
        <div className="bg-yellow-100 min-h-25">
          <img alt="image" />
        </div>
        <div className="min-h-20 flex flex-col gap-2 py-1">
          <p className="font-medium text-xs">
            Pontificia Universidad Católica de Chile
          </p>
          <p className="font-thin text-xs">
            English for commoners to become pro at this and help othera at
            learning englid=sh
          </p>
        </div>
        <div className="min-h-15 py-2">
          <p className="text-xs">
            <span className="text-sm">skills you'll gain:</span> javaSvript,
            typeScript, express, mongoDB and others
          </p>
        </div>
        <div className="">
          <p>type-intermediate</p>
          <p>{Date.now()}</p>
        </div>
      </div>
    </>
  );
}
