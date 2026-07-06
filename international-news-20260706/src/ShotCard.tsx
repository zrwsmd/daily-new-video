import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing, staticFile, Img } from "remotion";

interface ShotProps {
  subtitle: string;
  category: string;
  image: string;
  source: string;
  date: string;
  focalPoint?: "top" | "center" | "bottom";
}

export const ShotCard: React.FC<ShotProps> = ({
  subtitle,
  category,
  image,
  source,
  date,
  focalPoint = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const holdUntil = durationInFrames - 0.3 * fps;
  const exit = interpolate(frame, [holdUntil, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    easing: Easing.in(Easing.ease),
  });
  const opacity = Math.min(enter, exit);

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a1830",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
      }}
    >
      <Img
        src={staticFile(image)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focalPoint === "top" ? "center top" : focalPoint === "bottom" ? "center bottom" : "center center",
          transform: `scale(${scale})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(to top, rgba(10,24,48,0.95) 0%, rgba(10,24,48,0) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          fontSize: 18,
          color: "#ffffff",
          backgroundColor: "rgba(232,184,75,0.2)",
          padding: "6px 16px",
          borderLeft: "3px solid #E8B84B",
          opacity,
        }}
      >
        {category}
      </div>

      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          fontSize: 16,
          color: "#aaaaaa",
          opacity,
        }}
      >
        {date}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: `translateX(-50%)`,
          width: "85%",
          backgroundColor: "rgba(0,0,0,0.75)",
          padding: "20px 40px",
          textAlign: "center",
          opacity,
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: "bold",
            color: "#ffffff",
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 40,
          fontSize: 16,
          color: "#aaaaaa",
          opacity,
        }}
      >
        来源：{source}
      </div>
    </div>
  );
};
