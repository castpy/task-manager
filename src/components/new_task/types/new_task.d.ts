import { NewTaskForm } from "./use.new_task";

interface DefaultValues extends NewTaskForm {
  id: string;
}

export interface NewTaskProps {
  open: boolean;
  onClose: () => void;
  defaultStatus: "to-do" | "in-progress" | "completed";
  defaultValues?: DefaultValues;
}
