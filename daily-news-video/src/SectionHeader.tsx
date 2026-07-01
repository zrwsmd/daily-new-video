import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface SectionHeaderProps {
  text: string;
  primaryColor: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ text, primaryColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 0.3 * fps, 2 * fps, 2.5 * fps], [0, 1, 1, 0]);
  const translateX = interpolate(frame, [0, 0.5 * fps], [-100, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: primaryColor }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          opacity,
        }}
      >
        <h2
          style={{
            fontSize: 96,
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            transform: `translateX(${translateX}px)`,
          }}
        >
          {text}
        </h2>
      </div>
    </AbsoluteFill>
  );
};
