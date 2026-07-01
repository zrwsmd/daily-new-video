import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';

interface Story {
  headline: string;
  body: string;
  source: string;
  imagePath?: string;
}

interface StoryCardProps {
  story: Story;
  durationInFrames: number;
  primaryColor: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, durationInFrames, primaryColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = interpolate(frame, [0, 0.5 * fps], [0, 1], { extrapolateRight: 'clamp' });
  const holdUntil = durationInFrames - 0.5 * fps;
  const exit = interpolate(frame, [holdUntil, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' });
  const opacity = Math.min(enter, exit);

  const headlineY = interpolate(frame, [0, 0.5 * fps], [50, 0], { extrapolateRight: 'clamp' });

  // Ken Burns effect - slow zoom
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a1a' }}>
      <div style={{ opacity, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Visual area with image */}
        <div
          style={{
            height: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {story.imagePath ? (
            <div style={{
              width: '100%',
              height: '100%',
              transform: `scale(${scale})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Img
                src={staticFile(story.imagePath)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '8px 16px',
                borderRadius: 4,
                fontSize: 18,
                color: '#ccc'
              }}>
                资料图
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 42, color: '#cccccc', textAlign: 'center', lineHeight: 1.6 }}>
              📊 新闻画面
            </div>
          )}
        </div>

        {/* Headline strip */}
        <div
          style={{
            padding: '40px 80px',
            backgroundColor: primaryColor,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          <h3
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
            }}
          >
            {story.headline}
          </h3>
        </div>

        {/* Body text / subtitle area */}
        <div
          style={{
            flex: 1,
            padding: '40px 80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontSize: 36,
              color: '#ffffff',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {story.body}
          </p>
          <p
            style={{
              fontSize: 24,
              color: '#888888',
              marginTop: 30,
            }}
          >
            来源：{story.source}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
