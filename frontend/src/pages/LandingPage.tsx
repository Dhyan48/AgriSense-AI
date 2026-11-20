import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, TrendingUp, FlaskConical, ShieldCheck, Database } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Asymmetric Editorial Hero */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block border border-[var(--border-stone)] bg-[var(--bg-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#285442] dark:text-[#D6F36A]">
              Precision Agricultural Intelligence
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
              Data-driven clarity for soil, crop, and yield decisions.
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              AgriSense AI unifies validated machine-learning models into a single workspace—helping researchers, students, and growers evaluate crop suitability, estimate historical yields, and inspect fertilizer categories[cite: 1].
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to={user ? '/dashboard' : '/register'}>
                <Button size="lg">
                  {user ? 'Open Workspace' : 'Create Free Account'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to={user ? '/history' : '/login'}>
                <Button variant="outline" size="lg">
                  {user ? 'View Saved Records' : 'Sign In'}
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-md border border-[var(--border-stone)] bg-[#142B25]">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                alt="Cultivated agricultural fields at sunrise"
                className="h-80 sm:h-96 w-full object-cover opacity-90"
              />
              <div className="border-t border-white/15 bg-[#142B25] p-5 text-[#F3F0E7]">
                <p className="text-xs uppercase tracking-widest text-[#D6F36A]">Integrated Pipeline</p>
                <p className="mt-1 font-heading text-base font-bold">
                  Validated Scikit-learn inference pipelines backed by persistent PostgreSQL audit logs[cite: 1].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Module Breakdown (Asymmetric Grid, Not Generic Equal Cards) */}
      <section className="border-t border-[var(--border-stone)] bg-[var(--bg-surface)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#285442] dark:text-[#D6F36A]">
              Core Capabilities
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight">
              Three specialized models in one unified platform[cite: 1].
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6 border-l-4 border-[#285442] dark:border-[#D6F36A] pl-6 py-2 space-y-3">
              <div className="flex items-center gap-2 text-[#285442] dark:text-[#D6F36A]">
                <Sprout className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Module 01</span>
              </div>
              <h3 className="font-heading text-2xl font-bold">Crop Recommendation</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Evaluates seven soil nutrient and climate parameters—Nitrogen, Phosphorus, Potassium, temperature, humidity, soil pH, and rainfall—to classify suitable crop labels[cite: 1].
              </p>
            </div>

            <div className="lg:col-span-6 space-y-8">
              <div className="border-l-2 border-[var(--border-stone)] pl-6 space-y-2">
                <div className="flex items-center gap-2 text-[#D98B55]">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Module 02</span>
                </div>
                <h3 className="font-heading text-xl font-bold">Crop Yield Prediction</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Regression modeling trained on verified regional agricultural datasets to estimate yield targets with explicit dataset-defined units[cite: 1].
                </p>
              </div>

              <div className="border-l-2 border-[var(--border-stone)] pl-6 space-y-2">
                <div className="flex items-center gap-2 text-[#285442] dark:text-[#D6F36A]">
                  <FlaskConical className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Module 03</span>
                </div>
                <h3 className="font-heading text-xl font-bold">Fertilizer Category Advisory</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Classifies dataset-supported fertilizer categories based on soil composition, crop type, and NPK ratios alongside responsible-use guidance[cite: 1].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-2">
            <span className="font-heading text-3xl font-extrabold text-[#285442] dark:text-[#D6F36A]">01</span>
            <h3 className="font-heading text-lg font-bold">Authenticate & Configure</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Create an account protected by hashed credentials and JWT tokens so every prediction session remains private[cite: 1].
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-heading text-3xl font-extrabold text-[#285442] dark:text-[#D6F36A]">02</span>
            <h3 className="font-heading text-lg font-bold">Run Validated Inference</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Submit soil and environmental parameters through schema-validated forms connected directly to trained pipelines[cite: 1].
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-heading text-3xl font-extrabold text-[#285442] dark:text-[#D6F36A]">03</span>
            <h3 className="font-heading text-lg font-bold">Audit Prediction History</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Inspect past inputs, outputs, and model versions anytime from your personal dashboard and history log[cite: 1].
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-[var(--border-stone)] pt-8 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#285442] dark:text-[#D6F36A]" />
            Token-secured user isolation[cite: 1]
          </span>
          <span className="flex items-center gap-1.5">
            <Database className="h-4 w-4 text-[#285442] dark:text-[#D6F36A]" />
            Zero fabricated metrics or synthetic records[cite: 1]
          </span>
        </div>
      </section>

      <Footer />
    </div>
  );
};