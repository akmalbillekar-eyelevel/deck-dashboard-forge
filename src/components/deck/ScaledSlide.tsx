import { useEffect, useRef, useState } from "react";

export function ScaledSlide({ children }: { children: React.ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const s = Math.min(r.width / 1920, r.height / 1080);
      setScale(s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="slide-stage h-full w-full">
      <div className="slide-wrapper" style={{ ["--scale" as never]: scale }}>
        <div className="slide-content">{children}</div>
      </div>
    </div>
  );
}
