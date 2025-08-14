"use client";

import { useState } from "react";
import useDelayedHover from "../hooks/useDelayedHover";

function TimeLine({
  timeNodes,
  onNodeClick
}) {
  const { idx, enter, leave } = useDelayedHover();
  const [activeIdx, setActiveIdx] = useState(0);
  const handleClick = (timeNode, i) => {
    setActiveIdx((prev) => (prev === i ? null : i));
    onNodeClick(timeNode);
  };

  return (
    <div className="flex flex-col justify-between gap-[15px] hover:cursor-pointer">
      {timeNodes.map((timeNode, i) => {
        const distance = idx === null ? Infinity : Math.abs(i - idx);
        let scale = 0.6;
        if (distance === 0) scale = 1.5;
        else if (distance === 1) scale = 1.2;
        else if (distance === 2) scale = 0.8;
        else if (distance === 3) scale = 0.6;

        const isActive = activeIdx === i;

        return (
          <div className="relative flex items-center" key={i}>
            <div
              data-active={isActive}
              className="w-[60px] h-[5px] rounded-[5px] bg-black transition-transform duration-400 data-[active=true]:bg-yellow-400"
              style={{
                transform: `scaleX(${scale})`,
                transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
              }}
              onMouseEnter={() => enter(i)}
              onMouseLeave={leave}
              onClick={() => handleClick(timeNode, i)}
            ></div>
            {isActive && <span className="absolute left-[80px] font-semibold text-yellow-400 text-sm leading-[5px]">{timeNode}</span>}
          </div>
        );
      })}
    </div>
  );
}

export default TimeLine;
