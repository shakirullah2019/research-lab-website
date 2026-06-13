import type { Certificate } from "@/lib/types";

interface Props {
  certificate: Certificate;
}

export default function CertificateCard({ certificate }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {certificate.image_url ? (
          <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
            <img
              src={certificate.image_url}
              alt={certificate.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {certificate.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {certificate.issuer}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Issued:{" "}
              {new Date(certificate.issue_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </span>
            {certificate.expiry_date && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Expires:{" "}
                {new Date(certificate.expiry_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            {certificate.file_url && (
              <a
                href={certificate.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View File
              </a>
            )}
            {certificate.credential_url && (
              <a
                href={certificate.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Verify Credential
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
