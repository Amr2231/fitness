import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

type InfoDialogProps = {
  title: string;
  description?: string;
  content: string[];
  trigger: React.ReactNode;
};

export function InfoDialog({
  title,
  description,
  content,
  trigger,
}: InfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pe-1 text-sm leading-relaxed text-foreground/80">
          {content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
