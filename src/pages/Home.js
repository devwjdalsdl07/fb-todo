import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
const Home = () => {
  // html 태그를 참조해서 활용하고 싶을 때
  const h1 = useRef(null);

  useEffect(() => {
    // anime({
    //   targets: h1.current,
    //   translateX: 250,
    //   rotate: "1turn",
    //   backgroundColor: "#FFF",
    //   duration: 800,
    // });
  }, []);
  return (
    <div>
      <h1 ref={h1}>Home</h1>
    </div>
  );
};

export default Home;
