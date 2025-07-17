import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoadmapById, updateRoadmap } from '../lib/roadmapManager';
import type { SavedRoadmap } from '../types';
import RoadmapCard from './RoadmapCard';
import { Button } from './ui/Button';
import ProgressBar from './ui/ProgressBar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import AppNavMenu from './AppNavMenu';
import Squares from './ui/Squares/Squares';
const RoadmapPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<SavedRoadmap | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/dashboard');
      return;
    }
    const foundRoadmap = getRoadmapById(id);
    if (foundRoadmap) {
      setRoadmap(foundRoadmap);
    } else {
      // If roadmap not found, maybe show a "Not Found" message or redirect
      navigate('/dashboard');
    }
  }, [id, navigate]);

  const handleToggleResource = (stepIndex: number, resourceIndex: number) => {
    if (!roadmap) return;

    // Create a deep copy to avoid direct state mutation
    const newRoadmap = JSON.parse(JSON.stringify(roadmap));
    const resource = newRoadmap.steps[stepIndex].resources[resourceIndex];
    resource.completed = !resource.completed;

    setRoadmap(newRoadmap);
    updateRoadmap(newRoadmap);
  };

  const progress = useMemo(() => {
    if (!roadmap) return 0;
    let totalTasks = 0;
    let completedTasks = 0;
    roadmap.steps.forEach(step => {
        totalTasks += step.resources.length;
        step.resources.forEach(resource => {
            if (resource.completed) completedTasks++;
        });
    });
    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  }, [roadmap]);

  if (!roadmap) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold">Loading Roadmap...</h2>
        </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* LetterGlitch as animated background */}

      <AppNavMenu />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8">
        <div className="pointer-events-none fixed inset-0 -z-10 w-full h-full">
          <Squares 
            speed={0.5} 
            squareSize={40}
            direction='diagonal' // up, down, left, right, diagonal
            borderColor='#fff'
            hoverFillColor='#222'
          />
        </div>
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Your Roadmap to Becoming a {roadmap.careerGoal}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 font-medium text-sm">{Math.round(progress)}%</span>
                <ProgressBar value={progress} />
              </div>
            </CardContent>
          </Card>
          {roadmap.steps.map((step, stepIndex) => (
            <RoadmapCard 
              key={stepIndex} 
              step={step} 
              index={stepIndex}
              onToggleResource={(resourceIndex) => handleToggleResource(stepIndex, resourceIndex)}
            />
          ))}
        </div>
      </div>
       
    </div>
  );
};

export default RoadmapPage;
