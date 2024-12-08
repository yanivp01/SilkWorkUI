import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export function Landing() {
  const features = [
    'AI-powered resume optimization',
    'Professional templates',
    'ATS-friendly formats',
    'Real-time preview',
    'Export to multiple formats',
    'Expert suggestions',
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Create Your Perfect Resume with AI
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Let our AI-powered platform help you craft a professional resume that stands out and gets you hired.
              </p>
              <Button
                as={Link}
                to="/builder"
                size="lg"
                className="inline-flex items-center"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Our Resume Builder?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-white shadow-sm"
                >
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Build Your Professional Resume?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed their dream jobs using our AI-powered resume builder.
            </p>
            <Button
              as={Link}
              to="/builder"
              variant="outline"
              size="lg"
              className="bg-white"
            >
              Start Building Now
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}