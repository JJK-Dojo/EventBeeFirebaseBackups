
"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"

type MultiSelectComboboxProps = {
  items: { value: string; label: string }[];
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  className?: string;
  selectedValues: string[];
  onSelectedValuesChange: (values: string[]) => void;
  allowFreeText?: boolean;
};

export function MultiSelectCombobox({ 
  items, 
  placeholder = "Select items...", 
  searchPlaceholder = "Search items...", 
  noResultsText = "No items found.",
  className,
  selectedValues,
  onSelectedValuesChange,
  allowFreeText = false,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('');

  const handleSelect = (currentValue: string) => {
    const formattedValue = currentValue.toLowerCase().trim();
    if (!formattedValue) return;

    if (!selectedValues.includes(formattedValue)) {
      onSelectedValuesChange([...selectedValues, formattedValue]);
    } else {
      onSelectedValuesChange(selectedValues.filter(v => v !== formattedValue));
    }
    setInputValue('');
  }

  const handleRemove = (valueToRemove: string) => {
    onSelectedValuesChange(selectedValues.filter(v => v !== valueToRemove));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const commandInput = e.currentTarget.querySelector('input');
    if (e.key === 'Backspace' && (!commandInput || commandInput.value === '')) {
        onSelectedValuesChange(selectedValues.slice(0, -1));
    }
    if (e.key === "Escape") {
      setOpen(false)
    }
    if (allowFreeText && (e.key === 'Enter' || e.key === 'Tab') && inputValue) {
        e.preventDefault();
        handleSelect(inputValue);
    }
  }

  const displayedItems = React.useMemo(() => {
    const allValues = new Set([...items.map(item => item.value), ...selectedValues]);
    return Array.from(allValues).map(value => {
        const existingItem = items.find(item => item.value === value);
        return existingItem || { value, label: value };
    });
  }, [items, selectedValues]);

  const selectedLabels = selectedValues.map(value => {
    const item = displayedItems.find(i => i.value === value);
    return item ? item.label : value;
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn("group flex w-full flex-wrap items-center rounded-md border border-input bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2", className)}>
            <div className="flex flex-wrap items-center gap-1.5 p-2">
            {selectedValues.map(value => (
                <Badge
                    key={value}
                    variant="secondary"
                    className="gap-1.5"
                >
                    {displayedItems.find(i => i.value === value)?.label || value}
                    <button
                        aria-label={`Remove ${value}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.stopPropagation();
                                handleRemove(value);
                            }
                        }}
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            {selectedValues.length === 0 && <span className="px-2 text-muted-foreground">{placeholder}</span>}
            </div>
            <ChevronsUpDown className="ml-auto mr-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command
          onKeyDown={handleKeyDown}
        >
          <CommandInput 
            placeholder={searchPlaceholder} 
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => {
                if (allowFreeText && inputValue) {
                    handleSelect(inputValue);
                }
            }}
          />
          <CommandList>
            <CommandEmpty>
                {allowFreeText ? `No results. Press Enter to add "${inputValue}"` : noResultsText}
            </CommandEmpty>
            <CommandGroup>
              {displayedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item.value)}
                  >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(item.value) ? "opacity-100" : "opacity-0"
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
