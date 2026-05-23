/**
 * Shared Type Definitions for Open Source Project Matcher
 */

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  domain: string;
  questions: Question[];
}

export type SkillTier = 'easy' | 'medium' | 'hard';

export interface SkillDetails {
  title: string;
  badge: string;
  color: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
  range: string;
  description: string;
  issueLabels: string[];
  contributorProfile: string;
}

export interface GitHubIssue {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  commentsCount: number;
  labels: string[];
}

export interface GitHubRepository {
  id: number;
  name: string;
  ownerName: string;
  ownerAvatarUrl: string;
  description: string;
  starsCount: number;
  forksCount: number;
  language: string;
  url: string;
  issues: GitHubIssue[];
}

export interface AssessmentResult {
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  tier: SkillTier;
  domain: string;
  completedAt: string;
}
