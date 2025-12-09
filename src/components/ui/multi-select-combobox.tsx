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
};

export function MultiSelectCombobox({ 
  items, 
  placeholder = "Select items...", 
  searchPlaceholder = "Search items...", 
  noResultsText = "No items found.",
  className,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedValues, setSelectedValues] = React.useState<string[]>([])

  const handleSelect = (currentValue: string) => {
    setSelectedValues(prev => 
      prev.includes(currentValue)
        ? prev.filter(v => v !== currentValue)
        : [...prev, currentValue]
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = e.currentTarget.querySelector('input')
    if (e.key === 'Backspace' && (!input || input.value === '')) {
      setSelectedValues(prev => prev.slice(0, -1));
    }
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const selectedLabels = selectedValues.map(value => {
    const item = items.find(i => i.value === value);
    return item ? item.label : value;
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn("group flex w-full flex-wrap items-center rounded-md border border-input bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2", className)}>
            <div className="flex flex-wrap items-center gap-1.5 p-2">
            {selectedLabels.map(label => (
                <Badge
                    key={label}
                    variant="secondary"
                    className="gap-1.5"
                >
                    {label}
                    <button
                        aria-label={`Remove ${label}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            const valueToToggle = items.find(item => item.label === label)?.value
                            if(valueToToggle) handleSelect(valueToToggle);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.stopPropagation();
                                const valueToToggle = items.find(item => item.label === label)?.value
                                if(valueToToggle) handleSelect(valueToToggle);
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
          filter={(value, search) => {
            const item = items.find(i => i.value === value);
            if (item) {
              return item.label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
            }
            return 0;
          }}
          onKeyDown={handleKeyDown}
        >
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{noResultsText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
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
