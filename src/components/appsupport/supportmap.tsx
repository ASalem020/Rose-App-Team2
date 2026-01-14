import {WebSupport} from "@/type/supporttype"

export default function SupportInfo ({icon,title,description,}: WebSupport) {
  const Icon = icon ;
  return (
    <div className="flex items-center gap-4">
      
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-600 text-white">
        <Icon size={30} strokeWidth={1}/>
      </div>

      
      <div className="flex flex-col">
        <h4 className="text-sm font-semibold text-maroon-600">
          {title}
        </h4>
        <p className="text-xs text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}
