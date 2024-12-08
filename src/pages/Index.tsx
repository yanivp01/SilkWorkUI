import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText, Sparkles, Download } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Logo and Navigation */}
      <header className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <img 
            src="../../logo.png" 
            alt="SilkWork" 
            className="h-12 w-auto"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 animate-fadeIn">
            Create Your Perfect CV with
            <span className="gradient-text"> AI </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 animate-fadeIn">
            Build a professional resume in minutes with our AI-powered resume builder.
            Stand out from the crowd and land your dream job.
          </p>
          <Button
            size="lg"
            className="animate-fadeIn"
            onClick={() => navigate("/SilkWorkUI/builder")}
          >
            Create CV <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our CV Builder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-primary" />}
              title="AI-Powered Suggestions"
              description="Get intelligent suggestions for your resume content based on your experience and industry."
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8 text-primary" />}
              title="Professional Templates"
              description="Choose from a variety of ATS-friendly templates designed to help you stand out."
            />
            <FeatureCard
              icon={<Download className="h-8 w-8 text-primary" />}
              title="Easy Export"
              description="Download your resume in PDF format, ready to send to employers."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;