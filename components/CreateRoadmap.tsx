import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRoadmap } from '../services/gemini';
import { addRoadmap } from '../lib/roadmapManager';
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import Beams from './ui/Beams';
import AppNavMenu from './AppNavMenu';

const CreateRoadmap: React.FC = () => {
  const [careerGoal, setCareerGoal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!careerGoal.trim()) {
      setError('Please enter a career goal.');
      return;
    }
    
    setError(null);
    setIsLoading(true);

    try {
      const resultSteps = await generateRoadmap(careerGoal);
      const newRoadmap = addRoadmap(careerGoal, resultSteps);
      navigate(`/roadmap/${newRoadmap.id}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && careerGoal.trim()) {
      handleGenerate();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden  flex items-center justify-center">
      {/* Beams as animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10 w-full h-full">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>

      

      <div className="relative z-10 flex w-full max-w-4xl mx-auto px-4 items-center justify-center min-h-screen">
        <Card className="w-full bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Create a New Learning Roadmap</CardTitle>
            <CardDescription>
              Enter your desired career goal, and our AI will generate a step-by-step learning plan for you.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="e.g., 'AI Engineer' or 'Full-Stack Developer'"
                className="flex-grow"
                disabled={isLoading}
                onKeyPress={handleKeyPress}
              />
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !careerGoal.trim()}
                className="w-full sm:w-auto bg-neutral-900 text-white hover:bg-neutral-800"
              >
                {isLoading ? <Skeleton className="h-5 w-24" /> : "Generate Roadmap"}
              </Button>
            </div>
            
            {error && (
              <p className="mt-4 text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
            
            {isLoading && (
              <p className="mt-4 text-center text-gray-600">
                Please wait, this may take a moment...
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateRoadmap;