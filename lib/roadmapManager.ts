import type { SavedRoadmap, RoadmapStep } from '../types';

const STORAGE_KEY = 'courseDeckRoadmaps';

export const getRoadmaps = (): SavedRoadmap[] => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    console.error('Failed to parse roadmaps from localStorage', error);
    return [];
  }
};

export const getRoadmapById = (id: string): SavedRoadmap | undefined => {
  const roadmaps = getRoadmaps();
  return roadmaps.find((roadmap) => roadmap.id === id);
};

export const addRoadmap = (careerGoal: string, steps: RoadmapStep[]): SavedRoadmap => {
  const roadmaps = getRoadmaps();
  const newRoadmap: SavedRoadmap = {
    id: crypto.randomUUID(),
    careerGoal,
    steps: steps.map(step => ({
        ...step,
        resources: step.resources.map(resource => ({...resource, completed: false}))
    })),
    createdAt: new Date().toISOString(),
  };
  const updatedRoadmaps = [...roadmaps, newRoadmap];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRoadmaps));
  return newRoadmap;
};

export const updateRoadmap = (updatedRoadmap: SavedRoadmap): void => {
  const roadmaps = getRoadmaps();
  const index = roadmaps.findIndex((roadmap) => roadmap.id === updatedRoadmap.id);
  if (index !== -1) {
    roadmaps[index] = updatedRoadmap;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roadmaps));
  }
};
