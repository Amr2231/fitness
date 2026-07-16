import about1 from "@/assets/images/about1.png";
import about2 from "@/assets/images/about2.png";
import about3 from "@/assets/images/about3.png";

export default function ImagesShow() {
  return (
    <div className="cols h-105 md:h-150 lg:h-185">
      <div className="relative w-full h-full">
        <img
          src={about1}
          alt="about1-image"
          width={358}
          height={542}
          loading="lazy"
          className="w-3/5 h-[73%] absolute left-0 top-0 z-0 "
        />
        <img
          src={about2}
          alt="about2-image"
          width={222}
          height={188}
          loading="lazy"
          className="w-[37%] h-[24%] absolute right-0 top-1/10 rounded-2xl"
        />
        <img
          src={about3}
          alt="about3-image"
          width={353}
          height={452}
          loading="lazy"
          className="w-[58%] h-[61%] absolute right-0 bottom-0 z-10"
        />
      </div>
    </div>
  );
}
