import TeamCard from "@/components/public/TeamCard";
import { getActiveTeamMembers } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const team = await getActiveTeamMembers();

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Team
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Meet the researchers, engineers, and visionaries driving our
            mission.
          </p>
        </div>

        {team.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-gray-500">
              No team members listed yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <TeamCard key={m.id} member={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
