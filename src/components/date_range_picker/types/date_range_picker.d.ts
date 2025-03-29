export interface DatePickerWithRangeProps {
  className?: string;
  onChange(value: { from: Date; to: Date }): void;
}
