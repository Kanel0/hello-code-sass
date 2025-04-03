import { useLocation } from "react-router-dom";
import Dashboard from "./dashboard";

function Licences() {
    const location = useLocation();

  return (
         <Dashboard currentPath={location.pathname} >
           <div className="p-6 bg-white rounded-lg shadow-lg">
             <h2 className="text-2xl font-semibold text-gray-700 font-[Klapt]">Licences</h2>
           
           </div>
         </Dashboard>
       );
     }
export default Licences