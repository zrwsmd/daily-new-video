import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface OutroProps {
  primaryColor: string;
}

export const Outro: React.FC<OutroProps> = ({ primaryColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 0.5 * fps, 4.5 * fps, 5 * fps], [0, 1, 1, 0]);

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
        }}
      >
        <p
          style={{
            fontSize: 56,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          完整新闻来源见视频简介
        </p>
        <p
          style={{
            fontSize: 40,
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: 40,
          }}
        >
          Sources in video description
        </p>
      </div>
    </AbsoluteFill>
  );
};
