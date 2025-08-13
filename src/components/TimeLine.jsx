"use client";

import { useState } from "react";
import useDelayedHover from "../hooks/useDelayedHover";

function TimeLine({
  startYear,
  onYearClick,
  endYear = new Date().getFullYear(),
}) {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  const { idx, enter, leave } = useDelayedHover();
  const [activeIdx, setActiveIdx] = useState(years.length - 1);
  const handleClick = (year, i) => {
    setActiveIdx((prev) => (prev === i ? null : i));
    onYearClick(year);
  };

  return (
    <div className="flex flex-col-reverse justify-between gap-[15px] hover:cursor-pointer">
      {years.map((year, i) => {
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
              onClick={() => handleClick(year, i)}
            ></div>
            {isActive && <span className="absolute left-[80px] font-semibold text-yellow-400 text-sm leading-[5px]">{year}</span>}
          </div>
        );
      })}
    </div>
  );
}

export default TimeLine;
