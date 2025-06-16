import type { IconName } from 'lucide-react/dynamic'; 
import { DynamicIcon } from 'lucide-react/dynamic';

interface StatCardProps {
    icon : {
        name: IconName,
        class?: any
    },
    title: string,
    value: string | number,
    change?: string,
    color?: string,
}

export default function StatCard ({icon, title, value, color }: StatCardProps){
    return (
    <div className="bg-white w-full rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-4 rounded-lg ${color}`}>
            <DynamicIcon name={icon.name} className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    </div>
);
}