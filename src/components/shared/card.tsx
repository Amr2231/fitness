import { ArrowRight } from "lucide-react";

interface HealthyCardProps {
  image: string;
  title: string;
  buttonText: string;
}

export default function Card({ image, title, buttonText }: HealthyCardProps) {
  return (
    <div className="relative  rounded-xl overflow-hidden shadow-lg bg-gray-900/10 backdrop-blur-sm w-full h-90">
      {/* Card Image */}
      <img
        src={image}
        alt={title}
        className="relative w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />

      {/* Card Title and Button */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-[#24242480]/90 shadow-lg backdrop-blur-sm">
        <h3 className="text-white text-lg font-semibold uppercase mb-2">
          {title}
        </h3>
        <button className="text-primary font-semibold flex items-center gap-2 cursor-pointer">
          <span>{buttonText}</span>
          <div className="px-1 py-1 flex justify-center items-center text-sm bg-primary rounded-full text-black ">
            <ArrowRight size={12} />
          </div>
        </button>
      </div>
    </div>
  );
}
