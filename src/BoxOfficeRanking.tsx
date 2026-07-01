import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, staticFile } from "remotion";
import React from "react";

export const movieData = [
  { rank: 1, title: "疯狂动物城2", englishTitle: "Zootopia 2", boxOffice: 651398000, color: "#FF6B35", bgGradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)", emoji: "🦊" },
  { rank: 2, title: "亲爱的你", englishTitle: "Dear You", boxOffice: 265100000, color: "#FF69B4", bgGradient: "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)", emoji: "💕" },
  { rank: 3, title: "阿凡达:火与灰", englishTitle: "Avatar: Fire and Ash", boxOffice: 171558000, color: "#1E90FF", bgGradient: "linear-gradient(135deg, #1E90FF 0%, #00CED1 100%)", emoji: "🔥" },
  { rank: 4, title: "消失的她", englishTitle: "Vanishing Point", boxOffice: 80200000, color: "#9370DB", bgGradient: "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)", emoji: "👤" },
  { rank: 5, title: "寒战1994", englishTitle: "Cold War 1994", boxOffice: 41900000, color: "#4682B4", bgGradient: "linear-gradient(135deg, #4682B4 0%, #5F9EA0 100%)", emoji: "❄️" },
  { rank: 6, title: "冰雹玛丽计划", englishTitle: "Project Hail Mary", boxOffice: 41410552, color: "#32CD32", bgGradient: "linear-gradient(135deg, #32CD32 0%, #00FA9A 100%)", emoji: "🚀" },
  { rank: 7, title: "玩具总动员5", englishTitle: "Toy Story 5", boxOffice: 29743000, color: "#FFD700", bgGradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", emoji: "🤠" },
  { rank: 8, title: "跳跳侠", englishTitle: "Hoppers", boxOffice: 26884000, color: "#FF4500", bgGradient: "linear-gradient(135deg, #FF4500 0%, #FF6347 100%)", emoji: "🦘" },
  { rank: 9, title: "狂暴", englishTitle: "The Furious", boxOffice: 24700000, color: "#DC143C", bgGradient: "linear-gradient(135deg, #DC143C 0%, #B22222 100%)", emoji: "⚡" },
  { rank: 10, title: "超级马里奥银河", englishTitle: "Super Mario Galaxy", boxOffice: 22512726, color: "#4169E1", bgGradient: "linear-gradient(135deg, #4169E1 0%, #6495ED 100%)", emoji: "🍄" },
];

const formatBoxOffice = (amount: number) => {
  const yi = Math.floor(amount / 100000000);
  const wan = Math.floor((amount % 100000000) / 10000);
  if (yi > 0) {
    return `${yi}.${Math.floor(wan / 1000)}亿`;
  }
  return `${wan}万`;
};

interface MovieSlideProps {
  movie: typeof movieData[0];
}

const MovieSlide: React.FC<MovieSlideProps> = ({ movie }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const posterScale = interpolate(frame, [0, 0.6 * fps], [0.8, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const posterOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const rankScale = interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const textSlide = interpolate(frame, [0.5 * fps, 1 * fps], [100, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const textOpacity = interpolate(frame, [0.5 * fps, 0.9 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const getRankColor = (rank: number) => {
    if (rank === 1) return "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";
    if (rank === 2) return "linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%)";
    if (rank === 3) return "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)";
    return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  };

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)" }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px 60px", gap: "30px" }}>

        <div style={{ width: "180px", height: "180px", borderRadius: "50%", background: getRankColor(movie.rank), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "108px", fontWeight: "900", color: "white", transform: `scale(${rankScale})`, boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)", flexShrink: 0, border: "6px solid rgba(255,255,255,0.2)" }}>
          {movie.rank}
        </div>

        <div style={{ width: "700px", height: "880px", borderRadius: "32px", overflow: "hidden", boxShadow: "0 35px 90px rgba(0, 0, 0, 0.7)", opacity: posterOpacity, transform: `scale(${posterScale})`, flexShrink: 0, background: movie.bgGradient, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "50px", position: "relative" }}>

          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)`, pointerEvents: "none" }} />

          <div style={{ fontSize: "220px", marginBottom: "40px", filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}>
            {movie.emoji}
          </div>

          <div style={{ fontSize: "56px", fontWeight: "900", color: "white", textAlign: "center", marginBottom: "20px", textShadow: "4px 4px 12px rgba(0,0,0,0.8)", lineHeight: 1.2, maxWidth: "90%" }}>
            {movie.title}
          </div>

          <div style={{ fontSize: "38px", fontWeight: "600", color: "rgba(255,255,255,0.9)", textAlign: "center", textShadow: "2px 2px 8px rgba(0,0,0,0.6)", maxWidth: "90%" }}>
            {movie.englishTitle}
          </div>

          <div style={{ position: "absolute", bottom: "40px", left: 0, right: 0, height: "4px", background: "rgba(255,255,255,0.3)" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", transform: `translateY(${textSlide}px)`, opacity: textOpacity }}>

          <div style={{ display: "flex", alignItems: "baseline", gap: "15px" }}>
            <div style={{ fontSize: "88px", fontWeight: "900", color: "#FFD700", textShadow: "0 0 30px rgba(255,215,0,0.8)", letterSpacing: "2px" }}>
              {formatBoxOffice(movie.boxOffice)}
            </div>
            <div style={{ fontSize: "40px", color: "rgba(255,255,255,0.8)", fontWeight: "600", textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}>
              票房
            </div>
          </div>

          <div style={{ fontSize: "32px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "4px", fontWeight: "700" }}>
            2026 中国市场
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const TitleScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = interpolate(frame, [0, 1 * fps], [0.5, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const titleOpacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleSlide = interpolate(frame, [0.5 * fps, 1.2 * fps], [100, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const glowPulse = interpolate(frame % 30, [0, 15, 30], [0.6, 1, 0.6]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "80px" }}>
        <div style={{ transform: `scale(${titleScale})`, opacity: titleOpacity }}>
          <div style={{ fontSize: "96px", fontWeight: "900", color: "white", textAlign: "center", textShadow: `0 0 ${40 * glowPulse}px rgba(255,255,255,${glowPulse}), 6px 6px 20px rgba(0,0,0,0.5)`, lineHeight: 1.2, letterSpacing: "4px" }}>
            2026年中国电影
          </div>
          <div style={{ fontSize: "96px", fontWeight: "900", color: "white", textAlign: "center", textShadow: `0 0 ${40 * glowPulse}px rgba(255,255,255,${glowPulse}), 6px 6px 20px rgba(0,0,0,0.5)`, lineHeight: 1.2, letterSpacing: "4px", marginTop: "10px" }}>
            票房排行榜
          </div>
        </div>

        <div style={{ transform: `translateY(${subtitleSlide}px)`, background: "rgba(255,255,255,0.2)", padding: "30px 80px", borderRadius: "60px", backdropFilter: "blur(10px)", border: "3px solid rgba(255,255,255,0.3)" }}>
          <div style={{ fontSize: "72px", fontWeight: "900", color: "white", textShadow: "4px 4px 12px rgba(0,0,0,0.6)", letterSpacing: "8px" }}>
            TOP 10
          </div>
        </div>

        <div style={{ fontSize: "32px", color: "rgba(255,255,255,0.8)", fontWeight: "600", textShadow: "2px 2px 6px rgba(0,0,0,0.4)", position: "absolute", bottom: "60px" }}>
          数据来源: Box Office Mojo
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const BoxOfficeRanking: React.FC = () => {
  const { fps } = useVideoConfig();
  const titleDuration = 2.5 * fps;
  const movieDuration = 3 * fps;

  return (
    <AbsoluteFill>
      <Sequence durationInFrames={titleDuration}>
        <TitleScreen />
      </Sequence>

      {movieData.map((movie, index) => (
        <Sequence key={movie.rank} from={titleDuration + index * movieDuration} durationInFrames={movieDuration}>
          <MovieSlide movie={movie} />
        </Sequence>
      ))}

      <Audio src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_4d329c6896.mp3" volume={0.25} />
    </AbsoluteFill>
  );
};
