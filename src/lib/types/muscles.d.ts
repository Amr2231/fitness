export type MusclesErrorResponse = {
  message: string;
};

export type Muscle = {
  _id: string;
  name: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MusclesSuccessResponse = {
  message: string;
  totalMuscles: number;
  muscles: PrimeMoverMuscle[];
};
