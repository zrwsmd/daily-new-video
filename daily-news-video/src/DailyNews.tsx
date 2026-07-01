import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Intro } from './Intro';
import { SectionHeader } from './SectionHeader';
import { StoryCard } from './StoryCard';
import { Outro } from './Outro';
import newsData from './newsData.json';
import config from '../config.json';

export const DailyNews: React.FC = () => {
  const fps = 30;
  let currentFrame = 0;

  // Intro: 5 seconds
  const introStart = currentFrame;
  const introDuration = 5 * fps;
  currentFrame += introDuration;

  // Domestic section
  const domesticHeaderStart = currentFrame;
  const domesticHeaderDuration = 2.5 * fps;
  currentFrame += domesticHeaderDuration;

  const domesticStories = newsData.sections.find(s => s.type === 'domestic')?.stories || [];
  const domesticSequences = domesticStories.map(story => {
    const start = currentFrame;
    const duration = story.duration * fps;
    currentFrame += duration;
    return { story, start, duration };
  });

  // International section
  const intlHeaderStart = currentFrame;
  const intlHeaderDuration = 2.5 * fps;
  currentFrame += intlHeaderDuration;

  const intlStories = newsData.sections.find(s => s.type === 'international')?.stories || [];
  const intlSequences = intlStories.map(story => {
    const start = currentFrame;
    const duration = story.duration * fps;
    currentFrame += duration;
    return { story, start, duration };
  });

  // Outro: 5 seconds
  const outroStart = currentFrame;
  const outroDuration = 5 * fps;
  currentFrame += outroDuration;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* Intro */}
      <Sequence from={introStart} durationInFrames={introDuration}>
        <Intro
          title={config.branding.title}
          date={newsData.date}
          primaryColor={config.branding.primary_color}
        />
      </Sequence>

      {/* Domestic section */}
      <Sequence from={domesticHeaderStart} durationInFrames={domesticHeaderDuration}>
        <SectionHeader text="国内新闻" primaryColor={config.branding.primary_color} />
      </Sequence>

      {domesticSequences.map((seq, idx) => (
        <Sequence key={`domestic-${idx}`} from={seq.start} durationInFrames={seq.duration}>
          <StoryCard
            story={seq.story}
            durationInFrames={seq.duration}
            primaryColor={config.branding.primary_color}
          />
        </Sequence>
      ))}

      {/* International section */}
      <Sequence from={intlHeaderStart} durationInFrames={intlHeaderDuration}>
        <SectionHeader text="国际新闻" primaryColor={config.branding.primary_color} />
      </Sequence>

      {intlSequences.map((seq, idx) => (
        <Sequence key={`intl-${idx}`} from={seq.start} durationInFrames={seq.duration}>
          <StoryCard
            story={seq.story}
            durationInFrames={seq.duration}
            primaryColor={config.branding.primary_color}
          />
        </Sequence>
      ))}

      {/* Outro */}
      <Sequence from={outroStart} durationInFrames={outroDuration}>
        <Outro primaryColor={config.branding.primary_color} />
      </Sequence>
    </AbsoluteFill>
  );
};
