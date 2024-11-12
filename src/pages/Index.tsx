import { Button } from "@/components/ui/button";
import { UserAssignDialog } from "@/components/UserAssignDialog";
import { useState } from "react";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          Assign Users
        </Button>

        <UserAssignDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen}
        />
      </div>
    </div>
  );
};

export default Index;