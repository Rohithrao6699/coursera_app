import { useRecoilState } from "recoil";
import { isSidebarOpen } from "../store/SideBarAtom";
import { useMediaQuery } from "../hooks/useQuery";
import { useEffect } from "react";
import { CrossIcon } from "../icons/cross";
import { BarsIcon } from "../icons/bars";
import { TsIcon } from "../icons/TS";
import { NodeIcon } from "../icons/node";
import { ReactIcon } from "../icons/react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useRecoilState(isSidebarOpen);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(
    function () {
      setIsOpen(isDesktop);
    },
    [isDesktop]
  );
  //we are using useEffect because we want the desktop to manually close only when width changes and
  //we should allow user to manually toggle it to; i.e when screen is small, it should automatically
  //close and if user click on bars, it should open; but if we don't use useEffect the
  //whole shortening and widening depnds on thw useMedia query,
  //if we did something like
  // if(isDesktop == true){
  //   setIsOpen(true)
  // }else{
  //   setIsOpen(false)
  // }
  //when width is small, the isopen is always false so the bar remains closed even when user will
  //click on barIcon to set isOpen to false but if he does that the if statement will re-run because of
  //component re-render and setIsopen is again set to false not opening the sideBar; so useEffect is the best!

  return (
    <>
      {isOpen ? (
        <>
          <div className="flex flex-row justify-end pr-2">
            {isOpen ? (
              <CrossIcon size="md" onclick={() => setIsOpen(false)} />
            ) : (
              <BarsIcon size="md" onclick={() => setIsOpen(true)} />
            )}
          </div>
          <div className="flex flex-col items-center gap-5 p-5">
            <div className="text-md tracking-wide font-light">
              Developed by: <span className="font-normal">Rohith</span>
            </div>
            <p className="text-md tracking-wide font-light">
              This website is made using{" "}
              <span className="font-normal">MERN</span> stack with{" "}
              <span className="font-normal">TypeScript</span>
            </p>
            <div>
              <p className="text-md tracking-wide font-light my-2">
                For more of my work-{" "}
              </p>
              <a
                href="github.com"
                className="font-normal outline-1 p-2 hover:bg-[#dee1e3]"
              >
                Github
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row justify-end pr-2">
            <BarsIcon size="md" onclick={() => setIsOpen(!isOpen)} />
          </div>
          <div className="flex flex-col items-center gap-20 p-5">
            <div>
              <TsIcon />
            </div>
            <div>
              <NodeIcon />
            </div>
            <div>
              <ReactIcon />
            </div>
          </div>
        </>
      )}
    </>
  );
}
