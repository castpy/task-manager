export interface NewTaskProps {
  open: boolean;
  onClose: () => void;
  defaultStatus: "to-do" | "in-progress" | "completed";
}
