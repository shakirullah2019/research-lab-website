import Link from "next/link";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import CertificateList from "./CertificateList";

export default function AdminCertificatesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Certificates
        </h1>
        <Link href="/admin/certificates/new">
          <Button>
            <Plus size={16} /> New Certificate
          </Button>
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <CertificateList />
      </div>
    </div>
  );
}
