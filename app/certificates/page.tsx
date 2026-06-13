import CertificateCard from "@/components/public/CertificateCard";
import { getCertificateList } from "@/lib/actions";

export default async function CertificatesPage() {
  const certificates = await getCertificateList();

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certificates
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Professional certifications and credentials earned by our team.
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-gray-500">
              No certificates yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((c) => (
              <CertificateCard key={c.id} certificate={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
