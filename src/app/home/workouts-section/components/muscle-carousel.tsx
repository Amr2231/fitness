import Card from "@/components/shared/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Props = {
  muscles: {
    _id: string;
    name: string;
    image: string;
  }[];
};

export default function MuscleCarousel({ muscles }: Props) {
  return (
    <Carousel className="w-5/6 mx-auto">
      <CarouselContent>
        {muscles.map((muscle) => (
          <CarouselItem key={muscle._id} className="md:basis-1/2 lg:basis-1/3">
            <Card
              title={muscle.name}
              image={muscle.image}
              buttonText="Explore"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
