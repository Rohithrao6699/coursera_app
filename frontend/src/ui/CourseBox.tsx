export function CourseCard() {
  return (
    <>
      <div className="flex flex-col gap-2 bg-slate-200 w-70 min-h-65 max-h-80 p-2 rounded-md shadow-lg">
        <div className="bg-yellow-100 h-25">
          <img alt="image" />
        </div>
        <div className="h-20 flex flex-col gap-2 py-1">
          <p className="font-medium text-xs">
            Pontificia Universidad Católica de Chile
          </p>
          <p className="font-thin text-xs">
            English for commoners to become pro at this and help othera at
            learning englid=sh
          </p>
        </div>
        <div className="h-15 py-2">
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
