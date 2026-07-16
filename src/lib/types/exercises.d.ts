export interface ExercisesSuccessResponse {
  message: string;
  totalExercises: number;
  totalPages: number;
  currentPage: number;
  exercises: Exercise[];
}

export interface ExercisesErrorResponse {
  message: string;
}

export interface Exercise {
  _id: string;
  exercise: string;
  short_youtube_demonstration: string | null;
  in_depth_youtube_explanation: string | null;
  difficulty_level: string;
  target_muscle_group: string;
  prime_mover_muscle: string;
  secondary_muscle: string | null;
  tertiary_muscle: string | null;
  primary_equipment: string | null;
  _primary_items: number;
  secondary_equipment: string | null;
  _secondary_items: number;
  posture: string | null;
  single_or_double_arm: string | null;
  continuous_or_alternating_arms: string | null;
  grip: string | null;
  load_position_ending: string | null;
  continuous_or_alternating_legs: string | null;
  foot_elevation: string | null;
  combination_exercises: string | null;
  movement_pattern_1: string | null;
  movement_pattern_2: string | null;
  movement_pattern_3: string | null;
  plane_of_motion_1: string | null;
  plane_of_motion_2: string | null;
  plane_of_motion_3: string | null;
  body_region: string | null;
  force_type: string | null;
  mechanics: string | null;
  laterality: string | null;
  primary_exercise_classification: string | null;
  short_youtube_demonstration_link: string | null;
  in_depth_youtube_explanation_link: string | null;
}
