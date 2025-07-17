import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { getRoadmaps } from '../lib/roadmapManager';
import type { SavedRoadmap } from '../types';
import ProgressBar from './ui/ProgressBar';
import Silk from './ui/Particles';


const calculateProgress = (roadmap: SavedRoadmap): number => {
    let totalTasks = 0;
    let completedTasks = 0;
    roadmap.steps.forEach(step => {
        totalTasks += step.resources.length;
        step.resources.forEach(resource => {
            if (resource.completed) {
                completedTasks++;
            }
        });
    });
    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState<SavedRoadmap[]>([]);

  useEffect(() => {
    setRoadmaps(getRoadmaps().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  return (
    <div className="relative flex w-full max-w-4xl mx-auto px-4 items-center justify-center bg-white">
      {/* Silk as animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10 w-full h-full">
        <Silk
          speed={5}
          scale={1}
          color="#0582CA"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center sm:text-left w-full">
            <h1 className="text-4xl font-bold tracking-tight">Your Learning Hub</h1>
            <p className="mt-2 text-lg text-gray-400">
              Continue your journey or start a new one.
            </p>
          </div>
          <Button size="lg" onClick={() => navigate('/create-roadmap')} className="w-full sm:w-auto bg-neutral-900 text-white hover:bg-neutral-800">
            + New Roadmap
          </Button>
        </div>

        {roadmaps.length > 0 ? (
          <div className="space-y-4">
            {roadmaps.map(roadmap => {
              const progress = calculateProgress(roadmap);
              return (
                <Link to={`/roadmap/${roadmap.id}`} key={roadmap.id}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xl font-semibold">{roadmap.careerGoal}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Created on {new Date(roadmap.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right sm:w-1/4 w-full mt-4 sm:mt-0">
                          <span className="text-sm font-medium">{Math.round(progress)}% complete</span>
                          <ProgressBar value={progress} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm">
            <h2 className="text-xl font-semibold">No Roadmaps Yet</h2>
            <p className="text-gray-500 mt-2">Click the button below to generate your first learning plan!</p>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default Dashboard;