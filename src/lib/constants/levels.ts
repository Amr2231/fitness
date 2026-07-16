export const LEVEL_VALUES = [
  "level1",
  "level2",
  "level3",
  "level4",
  "level5",
] as const;

export type LevelType = (typeof LEVEL_VALUES)[number];

export const getLevels = (t: (key: string) => string) =>
  [
    { label: t("rookie"), value: "level1" },
    { label: t("beginner"), value: "level2" },
    { label: t("intermediate"), value: "level3" },
    { label: t("advanced"), value: "level4" },
    { label: t("true-beast"), value: "level5" },
  ] as const;
