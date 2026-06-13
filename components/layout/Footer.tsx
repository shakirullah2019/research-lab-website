import Link from "next/link";

const footerLinks = {
  Research: [
    { label: "Projects", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Blog", href: "/blog" },
  ],
  Lab: [
    { label: "Team", href: "/team" },
    { label: "Certificates", href: "/certificates" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-950 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RL</span>
              </div>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                Research Lab
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Advancing the frontiers of AI, Machine Learning, and Robotics
              through cutting-edge research and innovation.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-blue-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Research Lab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
