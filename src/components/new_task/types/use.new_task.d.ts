export interface NewTaskForm {
  title: string;
  description: string;
  date: {
    from: string;
    to: string;
  };
  status: string;
}
