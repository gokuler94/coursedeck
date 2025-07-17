
export interface LearningResource {
  title: string;
  url: string;
  completed: boolean;
}

export interface RoadmapStep {
  title: string;
  description: string;
  resources: LearningResource[];
}

export interface SavedRoadmap {
    id: string;
    careerGoal: string;
    steps: RoadmapStep[];
    createdAt: string;
}