export type Muscles = {
  idMuscles: string;
  strMuscles: string;
};

export type Workout = {
  idWorkout: string;
  strWorkout: string;
  strWorkoutThumb: string;
};

export type MusclesResponse = {
  musclesGroup: {
    _id: string;
    name: string;
  }[];
};

export type WorkoutResponse = {
  muscles: {
    _id: string;
    name: string;
    image: string | null;
  }[];
};
