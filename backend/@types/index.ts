export interface Weight {
  weightId: string;
  userId: string;
  weight: number;
  date: string;
  createdAt: number;
  updatedAt: number;
}

export interface Categories {
  categoryId: string;
  displayName: string;
  color: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Exercise {
  exerciseId: string;
  routineIds: string[];
  categoryIds: string[];
  displayName: string;
  description: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Routine {
  routineId: string;
  displayName: string;
  description: string;
  userId: string;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Timeline {
  timelineId: string;
  userId: string;
  exerciseId: string;
  routineId: string;
  date: string;
  createdAt: number;
  updatedAt: number;
  sets: WorkoutSet[];
}

export interface WorkoutSet {
  weight: number;
  reps: number;
  createdAt: number;
  updatedAt: number;
}
