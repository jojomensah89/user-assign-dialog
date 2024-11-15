import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectProps {
  options: string[];
  placeholder?: string;
  onChange: (value: string[]) => void;
}

export function MultiSelect({ options = [], placeholder, onChange }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];

  const handleSelect = (currentValue: string) => {
    const newSelected = selectedValues.includes(currentValue)
      ? selectedValues.filter((item) => item !== currentValue)
      : [...selectedValues, currentValue];
    
    setSelectedValues(newSelected);
    onChange(newSelected);
    setOpen(true); // Keep the popover open after selection
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between min-w-[150px]"
        >
          {selectedValues.length === 0
            ? placeholder || "Select..."
            : `${selectedValues.length} selected`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder={`Search ${placeholder?.toLowerCase() || ''}...`} 
          />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {safeOptions.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => handleSelect(option)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedValues.includes(option) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}