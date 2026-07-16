export type Locale = string | undefined;

export interface MuscleGroup {
  _id: string;
  name: string;
}

export interface MusclesGroupSuccessResponse {
  message: string;
  musclesGroup: MuscleGroup[];
}

export interface MusclesGroupErrorResponse {
  message: string;
}
