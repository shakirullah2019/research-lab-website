import CertificateForm from "../CertificateForm";

export default function NewCertificatePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        New Certificate
      </h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <CertificateForm />
      </div>
    </div>
  );
}
