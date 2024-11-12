import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "./MultiSelect";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  position: string;
  avatar?: string;
}

const mockUsers: User[] = [
  { id: "1", name: "Kristin Watson", position: "Junior Associate", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "Jerome Bell", position: "Senior Developer", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Marvin McKinney", position: "Product Manager", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "4", name: "Dianne Russell", position: "Designer", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "5", name: "Floyd Miles", position: "Marketing Lead", avatar: "https://i.pravatar.cc/150?u=5" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserAssignDialog({ open, onOpenChange }: Props) {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const departments = ["Engineering", "Design", "Marketing", "Sales"];
  const positions = ["Junior", "Senior", "Lead", "Manager"];
  const employmentTypes = ["Full-time", "Part-time", "Contract"];

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.position.toLowerCase().includes(search.toLowerCase())
  );

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const areAllSelected = filteredUsers.length > 0 && filteredUsers.every(user => selectedUsers.includes(user.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add employee</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Add one or more individuals to this assessment cycle; their addition will be temporary, only for the current cycle.
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <MultiSelect
              placeholder="Department"
              options={departments}
              onChange={(val) => console.log("Department:", val)}
            />
            <MultiSelect
              placeholder="Position"
              options={positions}
              onChange={(val) => console.log("Position:", val)}
            />
            <MultiSelect
              placeholder="Employment Type"
              options={employmentTypes}
              onChange={(val) => console.log("Employment Type:", val)}
            />
          </div>

          {selectedUsers.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Selected {selectedUsers.length} people
            </p>
          )}

          <ScrollArea className="h-[300px] border rounded-md">
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b">
                <Checkbox
                  checked={areAllSelected}
                  onCheckedChange={handleSelectAll}
                  id="select-all"
                />
                <label
                  htmlFor="select-all"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Select all employees
                </label>
              </div>
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-4 hover:bg-accent rounded-lg p-2 transition-colors"
                >
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleUserToggle(user.id)}
                  />
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                console.log("Saved users:", selectedUsers);
                onOpenChange(false);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}