export function Footer() {
  return (
    <>
      <div className="border-t-1 border-slate-100 bg-[#F9FBFC] flex flex-row items-center justify-between px-10 h-[10vh]">
        <div className="text-xs font-light">2025 COURSERA -- RohithRao</div>
        <div className="flex flex-row gap-3">
          <p className="text-xs font-light cursor-pointer hover:font-medium hover:text-[#2f27ce]">
            More Code
          </p>
          <p className="text-xs font-light cursor-pointer hover:font-medium hover:text-[#2f27ce]">
            GitHub
          </p>
        </div>
      </div>
    </>
  );
}
