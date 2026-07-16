export type MuscleGroup = {
  _id: string;
  name: string;
};

export type Muscle = {
  _id: string;
  name: string;
  image: string;
};

export type MuscleGroupsResponse = {
  message: string;
  musclesGroup: MuscleGroup[];
};

export type MusclesByGroupResponse = {
  message: string;
  muscleGroup: MuscleGroup;
  muscles: Muscle[];
};
