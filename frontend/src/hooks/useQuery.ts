import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(
    //explain the flow of the whole effect also
    function () {
      const media = window.matchMedia(query); /// what does media hold --
      // matches: true | false, //based on query we sent
      // media: "(min-width: 768px)",
      // onchange: null,
      // addListener: fn,
      // removeListener: fn,
      // addEventListener: fn,
      // removeEventListener: fn

      if (media.matches !== matches) {
        //what does media.matches hold? // true as intially h=the screen size is 1440 px whixh satisfir=es the conditon
        setMatches(media.matches); //why are we updating state here -- for intial render we are setting the matches state to true
      }
      const listener = () => setMatches(media.matches); //and why are updating again --- now we are adding a listener that automatically
      //updates the state value to truw or false, i.e if less than the query then it'll return false.
      media.addListener(listener); // here we are telling it to run this listener everytime the media(screen-size changes)

      return () => media.removeListener(listener); //what is hapeening here
    },
    [matches, query]
  );
  return matches;
}
