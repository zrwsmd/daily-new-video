import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig, staticFile, Easing } from 'remotion';

interface ShotCardProps {
  image: string;
  subtitle: string;
  focalPoint?: 'top' | 'center' | 'bottom';
  animationType?: 'zoom-in' | 'zoom-out' | 'pan-right' | 'pan-left' | 'zoom-pan';
}

export const ShotCard: React.FC<ShotCardProps> = ({
  image,
  subtitle,
  focalPoint = 'center',
  animationType = 'zoom-in'
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 使用缓动函数让动画更平滑自然
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  // 根据动画类型计算变换效果
  let scale = 1;
  let translateX = 0;
  let translateY = 0;

  switch (animationType) {
    case 'zoom-in':
      scale = interpolate(progress, [0, 1], [1, 1.15]);
      break;
    case 'zoom-out':
      scale = interpolate(progress, [0, 1], [1.15, 1]);
      break;
    case 'pan-right':
      scale = interpolate(progress, [0, 1], [1.1, 1.15]);
      translateX = interpolate(progress, [0, 1], [-3, 3]);
      break;
    case 'pan-left':
      scale = interpolate(progress, [0, 1], [1.1, 1.15]);
      translateX = interpolate(progress, [0, 1], [3, -3]);
      break;
    case 'zoom-pan':
      scale = interpolate(progress, [0, 1], [1, 1.2]);
      translateX = interpolate(progress, [0, 1], [-2, 2]);
      translateY = interpolate(progress, [0, 1], [-1, 1]);
      break;
  }

  // 入场淡入效果
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 出场淡出效果
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const imageOpacity = Math.min(fadeIn, fadeOut);

  // 字幕淡入淡出 - 更平滑的时机
  const subtitleOpacity = interpolate(
    frame,
    [10, 25, durationInFrames - 25, durationInFrames - 10],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    }
  );

  // 根据 focalPoint 调整图片位置
  const getObjectPosition = () => {
    switch (focalPoint) {
      case 'top':
        return 'center top';
      case 'bottom':
        return 'center bottom';
      default:
        return 'center center';
    }
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* 图片层 - 应用动画变换和淡入淡出 */}
      <AbsoluteFill style={{ opacity: imageOpacity }}>
        <Img
          src={staticFile(image)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: getObjectPosition(),
            transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
          }}
        />
      </AbsoluteFill>

      {/* 渐变遮罩 */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)',
          opacity: imageOpacity,
        }}
      />

      {/* 字幕层 */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '80px 100px',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
            opacity: subtitleOpacity,
            maxWidth: '80%',
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
