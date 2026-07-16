type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "male" | "female";
  age: number;
  weight: number;
  height: number;
  activityLevel: "level1" | "level2" | "level3" | "level4" | "level5";
  goal: string;
  photo: string;
  createdAt: string;
};

type UserResponse = {
  message: string;
  user: User;
};
