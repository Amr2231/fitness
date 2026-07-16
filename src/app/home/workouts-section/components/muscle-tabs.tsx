import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MuscleGroup = {
  _id: string;
  name: string;
};

type Props = {
  groups: MuscleGroup[];
  value: string;
  onChange: (value: string) => void;
};

export default function MuscleTabs({ groups, value, onChange }: Props) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList className="flex gap-2 hide-scrollbar overflow-x-auto  w-180 mx-auto scroll-smooth  ">
        {groups.map((group) => (
          <TabsTrigger
            key={group._id}
            value={group._id}
            className="
              shrink-0
              px-2 py-2 rounded-3xl text-md font-bold
              bg-muted text-muted-foreground
              hover:bg-primary/20 transition
              data-[state=active]:bg-primary
              data-[state=active]:text-white
              data-[state=active]:shadow-md
            "
          >
            {group.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
