import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { useUser, SignInButton } from '@clerk/clerk-react';
import Hyperspeed from './ui/Hyperspeed/Hyperspeed';
import TrueFocus from './TrueFocus/TrueFocus';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
              rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
              sticks: 0x03B3C3,
            }
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <TrueFocus 
          sentence="Course Deck"
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          glowColor='rgba(255, 255, 255, 0.6)'
          animationDuration={2}
          pauseBetweenAnimations={1}
          textColor="#fff"
          className="text-8xl md:text-[8rem] font-extrabold mb-12 drop-shadow-2xl"
        />
        <p className="mt-8 max-w-3xl text-3xl md:text-4xl font-semibold text-gray-100">
          Your personal AI-powered guide to mastering new skills. Turn your career ambitions into a structured learning plan.
        </p>
        <div className="mt-16">
          {isSignedIn ? (
            <Button size="lg" className="text-2xl px-14 py-8 bg-white/90 text-gray-900 hover:bg-white focus-visible:ring-gray-300 font-bold shadow-xl" onClick={handleGetStarted}>
              Get Started
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button size="lg" className="text-2xl px-14 py-8 bg-white/90 text-gray-900 hover:bg-white focus-visible:ring-gray-300 font-bold shadow-xl">
                Get Started
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;