import Card from "@/components/shared/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

type Props = {
  muscles: {
    _id: string;
    name: string;
    image: string;
  }[];
  locale?: string;
  groupId?: string;
};

export default function MuscleCarousel({ muscles, locale, groupId }: Props) {
  return (
    <Carousel className="w-5/6 mx-auto">
      <CarouselContent>
        {muscles.map((muscle) => (
          <CarouselItem key={muscle._id} className="md:basis-1/2 lg:basis-1/3">
            <Link to={`/${locale}/classes/${groupId}/muscles/${muscle._id}`}>
              <Card
                title={muscle.name}
                image={muscle.image}
                buttonText="Explore"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
