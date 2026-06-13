import Link from "next/link";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Advancing the Frontiers of{" "}
            <span className="text-blue-300">Intelligence</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 mb-8 leading-relaxed">
            We are a multidisciplinary research lab exploring Artificial
            Intelligence, Machine Learning, and Robotics. Our mission is to push
            the boundaries of what machines can learn and do.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/research">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50"
              >
                Explore Research
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Join Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
