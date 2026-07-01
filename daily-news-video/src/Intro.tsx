import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig, useCurrentFrame, interpolate } from 'remotion';

interface IntroProps {
  title: string;
  date: string;
  primaryColor: string;
}

export const Intro: React.FC<IntroProps> = ({ title, date, primaryColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 0.5 * fps, 4.5 * fps, 5 * fps], [0, 1, 1, 0]);
  const scale = interpolate(frame, [0, 0.5 * fps], [0.8, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: primaryColor }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            textAlign: 'center',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 48,
            color: 'rgba(255, 255, 255, 0.9)',
            marginTop: 40,
          }}
        >
          {date}
        </p>
      </div>
    </AbsoluteFill>
  );
};
