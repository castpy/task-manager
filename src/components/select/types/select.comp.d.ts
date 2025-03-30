export interface SelectCompProps {
  onSelect: (value: string) => void;
  groups: {
    key: string;
    label: string;
    items: {
      value: string | number;
      label: string;
      disabled?: boolean;
      default?: boolean;
    }[];
  }[];
  input?: boolean;
}
