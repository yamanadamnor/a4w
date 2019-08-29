import React, { useState, useRef, useLayoutEffect } from "react";
import { useScrollPosition } from "./hooks/useScrollPosition";
import { useSpring, animated } from "react-spring";

import "./style/card.scss";
import Image from "./Image";

function Card(props) {
  const [elementPosition, setElementPosition] = useState();
  const elementRef = useRef();

  const spring = useSpring({
    to: { opacity: 1, transform: "translateY(0px)" },
    from: { opacity: 0, transform: "translateY(50px)" }
  });

  const opacity = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 300
  });

  useLayoutEffect(
    () =>
      setElementPosition(
        elementRef.current.getBoundingClientRect().y.toFixed()
      ),
    []
  );

  //won't work if html tag has overflow: hidden;
  useScrollPosition(
    ({ prevPos, currPos }) => {
      setElementPosition(currPos.y.toFixed());
    },
    [],
    elementRef
  );

  return (
    <animated.div
      style={spring}
      className="card-container"
      onClick={() => console.log(elementRef)}>
      <h1
        ref={elementRef}
        className="card__title"
        style={{
          transform: `translate( ${elementPosition / 3}px, -50% )`
        }}>
        {props.title}
      </h1>

      <section className="top">
        <Image src={props.img} />
      </section>

      <animated.section style={opacity} className="bottom">
        {props.children}
      </animated.section>
    </animated.div>
  );
}

export default Card;
