import { Lamp } from "lucide-react";

export default function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      <div className="bg-neutral-200 px-10 py-12">
        <Lamp className="h-10 w-10 mb-6"/>
        <h3 className="text-2xl font-bold mb-2">Send Money</h3>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem labore natus dolorem.</p>
      </div>

      <div className="bg-teal-200 px-10 py-12">
        <Lamp className="h-10 w-10 mb-6"/>
        <h3 className="text-2xl font-bold mb-2">Send Money</h3>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem labore natus dolorem.</p>
      </div>

      <div className="bg-amber-200 px-10 py-12">
        <Lamp className="h-10 w-10 mb-6"/>
        <h3 className="text-2xl font-bold mb-2">Send Money</h3>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem labore natus dolorem.</p>
      </div>

      <div className="bg-blue-200 px-10 py-12">
        <Lamp className="h-10 w-10 mb-6"/>
        <h3 className="text-2xl font-bold mb-2">Send Money</h3>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem labore natus dolorem.</p>
      </div>
    </div>
  );
}
