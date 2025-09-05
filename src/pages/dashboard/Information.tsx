
import { usePathname } from "next/navigation";
import Dashboard from "./dashboard";

function Information() {
    const pathname = usePathname();
    return (
        <Dashboard currentPath={pathname} >
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 font-[Klapt]">Information</h2>
          
          </div>
        </Dashboard>
      );
    }

export default Information