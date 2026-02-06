import React from 'react';

export interface QuizOptionData {
  id: string;
  ageRange: string;
  label: string;
}

export interface BodyTypeData {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Placeholder for 3D render
}

export interface FooterPillar {
  icon: React.ElementType;
  text: string;
}

export interface VisualObjectiveData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  intensity: number;
  imageUrl: string;
  badge?: string;
  badgeColor?: 'orange' | 'yellow';
}

export interface ProblemZoneData {
  id: string;
  title: string;
  imageUrl: string;
}