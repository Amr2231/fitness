import {
  extractYoutubeVideoId,
  getYoutubeThumbnail,
} from "@/lib/utils/youtube";
import { useEffect, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import type { Exercise } from "@/lib/types/exercises";
import { useTranslations } from "use-intl";

export default function ExercisePreviewPanel({
  exercise,
}: {
  exercise: Exercise;
}) {
  // Translation
  const t = useTranslations("ExerciseDetails.preview");

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setIsEnded(false);
  }, [exercise._id]);

  // Variables
  const videoLink =
    exercise.short_youtube_demonstration_link ||
    exercise.in_depth_youtube_explanation_link;

  const videoId = extractYoutubeVideoId(videoLink);
  const previewImage = getYoutubeThumbnail(videoLink);

  const badges = [
    exercise.mechanics,
    exercise.force_type,
    exercise.body_region,
    exercise.primary_equipment,
    exercise.posture,
  ].filter(Boolean) as string[];

  const details = [
    {
      title: t("movement"),
      value: exercise.movement_pattern_1 || t("general"),
    },
    {
      title: t("posture"),
      value: exercise.posture || t("general"),
    },
    {
      title: t("laterality"),
      value: exercise.laterality || t("general"),
    },
  ];

  return (
    <section className="overflow-hidden rounded-4xl border border-white/10 bg-white/3 backdrop-blur-sm">
      <div className="relative min-h-130 overflow-hidden">
        {/* Thumbnail */}
        {!isPlaying && (
          <>
            <img
              src={previewImage}
              alt={exercise.exercise}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/45 to-[#111111]" />

            {videoId && (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 z-20 flex items-center justify-center"
                aria-label={t("playVideo", { exercise: exercise.exercise })}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-[0_12px_40px_rgba(255,99,35,0.45)] transition hover:scale-110">
                  <Play className="h-8 w-8 fill-current" />
                </div>
              </button>
            )}
          </>
        )}

        {/* Video */}
        {isPlaying && videoId && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
            title={exercise.exercise}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              const handleMessage = (event: MessageEvent) => {
                if (
                  typeof event.data === "string" &&
                  event.data.includes("onStateChange")
                ) {
                  const data = JSON.parse(event.data);
                  if (data.info === 0) {
                    setIsEnded(true);
                  }
                }
              };
              window.addEventListener("message", handleMessage);
              return () => {
                window.removeEventListener("message", handleMessage);
              };
            }}
          />
        )}

        {/* Replay Button */}
        {isEnded && (
          <button
            onClick={() => {
              setIsPlaying(false);
              setIsEnded(false);
              setTimeout(() => setIsPlaying(true), 0);
            }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-xl transition hover:scale-110">
              <RotateCcw className="h-8 w-8" />
            </div>
          </button>
        )}

        {/* Content (hide while playing) */}
        {!isPlaying && (
          <div className="relative z-10 flex min-h-130 flex-col justify-end md:p-8">
            <h2 className="max-w-3xl text-3xl font-bold text-white md:text-5xl">
              {exercise.exercise}
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              {exercise.prime_mover_muscle} • {exercise.target_muscle_group} •{" "}
              {exercise.difficulty_level}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      {!isPlaying && (
        <div className="grid gap-4 border-t border-white/10 p-6 md:grid-cols-3">
          {details.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/4 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                {item.title}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
