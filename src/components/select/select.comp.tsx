import { Select } from "@radix-ui/themes";
import React from "react";
import { SelectCompProps } from "./types/select.comp";

export const SelectComp = ({ groups, onSelect }: SelectCompProps) => {
  const handleFindDefault = (groups: SelectCompProps["groups"]) => {
    return (
      groups
        .flatMap((group) =>
          String(group.items.find((item) => item.default)?.value || "")
        )
        .find((value) => value) || ""
    );
  };

  return (
    <Select.Root
      size="3"
      onValueChange={onSelect}
      defaultValue={handleFindDefault(groups)}
    >
      <Select.Trigger />
      <Select.Content>
        {groups.map((group, index) => (
          <Select.Group key={`group-${index}`}>
            <Select.Label>{group.label}</Select.Label>
            {group.items.map((item, index) => (
              <Select.Item
                value={String(item.value)}
                key={`item-${index}`}
                disabled={item.disabled}
              >
                {item.label}
              </Select.Item>
            ))}
          </Select.Group>
        ))}
        {groups.length > 0 && <Select.Separator />}
      </Select.Content>
    </Select.Root>
  );
};
