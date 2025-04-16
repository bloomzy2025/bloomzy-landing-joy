
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderActionsProps {
  isMobile?: boolean;
}

export function HeaderActions({
  isMobile = false
}: HeaderActionsProps) {
  return (
    <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
      <Button 
        variant="default" 
        className="bg-[#00529B] hover:bg-[#003366] text-white font-bold px-6 py-2 rounded-md"
      >
        Let's Talk
      </Button>
    </div>
  );
}
