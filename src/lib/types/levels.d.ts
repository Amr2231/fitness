export interface Level {
  _id: string;
  name: string;
}

export interface LevelsSuccessResponse {
  message: string;
  levels: Level[];
}

export interface LevelsErrorResponse {
  message: string;
}
