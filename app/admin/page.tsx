import Link from "next/link";
import {
  FlaskConical,
  BookOpen,
  Newspaper,
  Users,
  Award,
  Image,
} from "lucide-react";

const dashboardCards = [
  {
    label: "Research Projects",
    href: "/admin/research",
    icon: FlaskConical,
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
  },
  {
    label: "Publications",
    href: "/admin/publications",
    icon: BookOpen,
    color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    label: "Blog Posts",
    href: "/admin/blog",
    icon: Newspaper,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
  },
  {
    label: "Team Members",
    href: "/admin/team",
    icon: Users,
    color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30",
  },
  {
    label: "Certificates",
    href: "/admin/certificates",
    icon: Award,
    color: "text-rose-600 bg-rose-100 dark:bg-rose-900/30",
  },
  {
    label: "Media Library",
    href: "/admin/media",
    icon: Image,
    color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <div
                className={`inline-flex p-3 rounded-lg ${card.color} mb-4`}
              >
                <Icon size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                {card.label}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage content
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
