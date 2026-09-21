"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

export interface CrowdCanvasProps {
  src?: string;
  rows?: number;
  cols?: number;
  maxPeeps?: number;
  className?: string;
  style?: React.CSSProperties;
}

type Peep = {
  image: HTMLImageElement;
  rect: number[];
  width: number;
  height: number;
  drawArgs: (HTMLImageElement | number)[];
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  baseTimeScale: number;
  walk: gsap.core.Timeline | null;
  setRect: (rect: number[]) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
};

export const CrowdCanvas = ({
  src = "/images/peeps/all-peeps.png",
  rows = 15,
  cols = 7,
  maxPeeps,
  className = "",
  style = {},
}: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMounted = true;
    const config = { src, rows, cols, maxPeeps };

    // Speed multiplier state for smooth deceleration and acceleration
    const speedMultiplier = { current: 1 };
    let speedTween: gsap.core.Tween | null = null;
    let autoPauseTimer: NodeJS.Timeout | null = null;

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = <T,>(array: T[]) => (randomRange(0, array.length) | 0);
    const removeFromArray = <T,>(array: T[], i: number): T => array.splice(i, 1)[0];
    const removeItemFromArray = <T,>(array: T[], item: T) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = <T,>(array: T[]): T =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = <T,>(array: T[]): T => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({
      stage,
      peep,
    }: {
      stage: { width: number; height: number };
      peep: Peep;
    }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX: number;
      let endX: number;
      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({
      peep,
      props,
    }: {
      peep: Peep;
      props: { startX: number; startY: number; endX: number };
    }) => {
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;
      const tl = gsap.timeline();
      peep.baseTimeScale = randomRange(0.5, 1.5);
      tl.timeScale(peep.baseTimeScale * speedMultiplier.current);
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10,
        },
        0
      );
      return tl;
    };

    const walks = [normalWalk];

    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        baseTimeScale: 1,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2];
          peep.height = rect[3];
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
        },
        render: (targetCtx: CanvasRenderingContext2D) => {
          targetCtx.save();
          targetCtx.translate(peep.x, peep.y);
          targetCtx.scale(peep.scaleX, 1);
          targetCtx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height
          );
          targetCtx.restore();
        },
      };
      peep.setRect(rect);
      return peep;
    };

    // MAIN
    const img = new Image();
    const stage = {
      width: 0,
      height: 0,
    };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      const { rows: r, cols: c } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = r * c;
      const rectWidth = width / r;
      const rectHeight = height / c;

      allPeeps.length = 0;
      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % r) * rectWidth,
              ((i / r) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        );
      }
    };

    const initCrowd = () => {
      const maxCount = config.maxPeeps ?? availablePeeps.length;
      while (availablePeeps.length && crowd.length < maxCount) {
        const peep = addPeepToCrowd();
        if (peep && peep.walk) {
          peep.walk.progress(Math.random());
        }
      }
    };

    const addPeepToCrowd = (): Peep | null => {
      if (!availablePeeps.length) return null;
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        if (!isMounted) return;
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });
      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    // SPEED & DECELERATION CONTROLLERS
    const syncCrowdSpeed = () => {
      crowd.forEach((peep) => {
        if (peep.walk) {
          peep.walk.timeScale(peep.baseTimeScale * speedMultiplier.current);
        }
      });
    };

    // Smoothly decelerates the crowd to a natural standstill
    const slowDownAndPause = (duration = 1.4) => {
      if (speedTween) speedTween.kill();
      if (autoPauseTimer) clearTimeout(autoPauseTimer);

      speedTween = gsap.to(speedMultiplier, {
        current: 0,
        duration,
        ease: "power2.out",
        onUpdate: syncCrowdSpeed,
      });
    };

    // Accelerates the crowd back to full walking pace for activeDuration, then smoothly slows down
    const resumeWalk = (activeDuration = 2.8) => {
      if (speedTween) speedTween.kill();
      if (autoPauseTimer) clearTimeout(autoPauseTimer);

      speedTween = gsap.to(speedMultiplier, {
        current: 1,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: syncCrowdSpeed,
        onComplete: () => {
          autoPauseTimer = setTimeout(() => {
            if (isMounted) {
              slowDownAndPause(1.4);
            }
          }, activeDuration * 1000);
        },
      });
    };

    const render = () => {
      if (!canvas || !isMounted) return;
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      crowd.forEach((peep) => {
        peep.render(ctx);
      });
      ctx.restore();
    };

    const resize = () => {
      if (!canvas || !isMounted) return;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      stage.width = width;
      stage.height = height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    let imageLoaded = false;
    const init = () => {
      if (!isMounted || imageLoaded) return;
      imageLoaded = true;
      createPeeps();
      resize();
      gsap.ticker.add(render);

      // Initial walk on page arrival: runs for 5.2s (allowing splash screen to finish),
      // then gently slows down into a natural standstill
      autoPauseTimer = setTimeout(() => {
        if (isMounted) {
          slowDownAndPause(1.4);
        }
      }, 5200);
    };

    img.onload = init;
    img.src = config.src;
    if (img.complete && img.naturalWidth > 0) {
      init();
    }

    const handleResize = () => {
      if (imageLoaded) resize();
    };

    window.addEventListener("resize", handleResize);

    // Interactive Hover: on pointerenter or tap, crowd starts walking again for 2.8s, then smoothly slows down
    const handleInteraction = () => {
      if (imageLoaded) {
        resumeWalk(2.8);
      }
    };

    canvas.addEventListener("pointerenter", handleInteraction);
    canvas.addEventListener("pointerdown", handleInteraction);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        if (imageLoaded) resize();
      });
      ro.observe(canvas);
    }

    return () => {
      isMounted = false;
      img.onload = null;
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerenter", handleInteraction);
      canvas.removeEventListener("pointerdown", handleInteraction);
      if (ro) ro.disconnect();
      if (speedTween) speedTween.kill();
      if (autoPauseTimer) clearTimeout(autoPauseTimer);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols, maxPeeps]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        ...style,
      }}
    />
  );
};

export const Skiper39 = () => {
  return (
    <div className="relative h-full w-full bg-white text-black">
      <div className="top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
          Crowd Canvas
        </span>
      </div>
      <div className="relative h-full w-full">
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
      </div>
    </div>
  );
};

export default CrowdCanvas;