"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxProps = {
  items: { value: string; label: string }[];
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

export function Combobox({ 
  items, 
  placeholder = "Select item...", 
  searchPlaceholder = "Search items...", 
  noResultsText = "No item found.",
  className,
  value: controlledValue,
  onValueChange,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(controlledValue || "")

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const setValue = isControlled ? onValueChange! : setInternalValue;

  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue || '');
    }
  }, [controlledValue, isControlled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      const commandElement = e.currentTarget as HTMLDivElement;
      const selectedItem = commandElement.querySelector('[aria-selected="true"]');
      if (selectedItem) {
        const itemValue = selectedItem.getAttribute('data-value');
        if (itemValue) {
            setValue(itemValue === value ? "" : itemValue);
            setOpen(false);
            e.preventDefault(); // Prevent default Tab behavior to allow custom focus management if needed
        }
      } else if (e.key === 'Tab') {
          setOpen(false);
      }
    }
  }


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          {value
            ? items.find((item) => item.value.toLowerCase() === value.toLowerCase())?.label ?? placeholder
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command
          filter={(value, search) => {
            const item = items.find(i => i.value === value);
            if (item) {
              return item.label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
            }
            return 0;
          }}
          onKeyDown={handleKeyDown}
        >
          <CommandInput placeholder={searchPlaceholder} disabled={disabled} />
          <CommandEmpty>{noResultsText}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  disabled={disabled}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
