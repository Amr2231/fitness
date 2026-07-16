declare type ApiErrorResponse = {
  message?: string;
  error?: string;
};

declare type RegisterState = Partial<RegisterSchema> & {
  gender?: "male" | "female";
  age?: number;
  weight?: number;
  height?: number;
  goal?:
    | "Gain Weight"
    | "Lose Weight"
    | "Get Fitter"
    | "Gain More Flexible"
    | "Learn The Basic";
  activityLevel?:
    | "Rookie"
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "True Beast";
};

declare type RegisterFormProps = {
  nextStep?: () => void;
};
