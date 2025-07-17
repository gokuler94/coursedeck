import React from 'react';
import type { RoadmapStep } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { cn } from '../lib/utils';

interface RoadmapCardProps {
  step: RoadmapStep;
  index: number;
  onToggleResource: (resourceIndex: number) => void;
}

const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500 group-hover:text-gray-800 flex-shrink-0">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
    </svg>
);


const RoadmapCard: React.FC<RoadmapCardProps> = ({ step, index, onToggleResource }) => {
  return (
    <Card className="w-full transition-all bg-white">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-200">
            <span className="text-xl font-bold text-gray-700">{index + 1}</span>
          </div>
          <CardTitle className="text-xl">{step.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">{step.description}</p>
        <div>
          <h4 className="font-semibold mb-3">Checklist:</h4>
          <ul className="space-y-2">
            {step.resources.map((resource, i) => (
              <li key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group">
                <input
                    type="checkbox"
                    id={`resource-${index}-${i}`}
                    checked={resource.completed}
                    onChange={() => onToggleResource(i)}
                    className="h-5 w-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                />
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 flex-grow"
                >
                  <LinkIcon />
                  <label htmlFor={`resource-${index}-${i}`} className={cn("text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors cursor-pointer", resource.completed && "line-through text-gray-500")}>
                    {resource.title}
                  </label>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapCard;
