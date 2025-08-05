import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  PlayCircleIcon, 
  EyeIcon, 
  DocumentMagnifyingGlassIcon,
  UserGroupIcon,
  ChartBarIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { 
  ShieldCheckIcon,
  LightBulbIcon,
  ClockIcon
} from '@heroicons/react/24/solid';
import Button from '../components/ui/Button';
import FeatureCard from '../components/ui/FeatureCard';
import Testimonial from '../components/ui/Testimonial';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white flex items-center">
                <ShieldCheckIcon className="h-8 w-8 text-blue-400 mr-2" />
                Case<span className="text-blue-400">Zero</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                {t('navigation.features')}
              </a>
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
                {t('navigation.howItWorks')}
              </a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">
                {t('navigation.testimonials')}
              </a>
              <LanguageSwitcher />
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {t('navigation.login')}
              </Link>
              <Link 
                to="/register" 
                className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-lg transition-colors"
              >
                {t('navigation.register')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                {t('hero.title')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {" "}{t('hero.titleHighlight')}
                </span>
                <br />
                {t('hero.subtitle')}
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary"
                  size="lg"
                  to="/register"
                  className="inline-flex items-center"
                >
                  <PlayCircleIcon className="h-5 w-5 mr-2" />
                  {t('hero.ctaPrimary')}
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  to="/test-game"
                  className="inline-flex items-center border-slate-400 text-slate-300 hover:text-white hover:border-white"
                >
                  <EyeIcon className="h-5 w-5 mr-2" />
                  {t('hero.ctaSecondary')}
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700">
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="mt-8">
                  <div className="text-green-400 text-sm font-mono mb-2">{t('hero.terminalTitle')}</div>
                  <div className="text-white text-lg font-semibold mb-4">{t('hero.terminalSubtitle')}</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {t('hero.terminalLine1')}
                    </div>
                    <div className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      {t('hero.terminalLine2')}
                    </div>
                    <div className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {t('hero.terminalLine3')}
                    </div>
                  </div>
                  <div className="mt-6 bg-slate-700 rounded p-3">
                    <div className="text-blue-400 text-xs mb-1">RÉSULTAT</div>
                    <div className="text-white text-sm">
                      {t('hero.terminalLine4')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<DocumentMagnifyingGlassIcon className="h-12 w-12" />}
              title={t('features.case1.title')}
              description={t('features.case1.description')}
              iconColor="text-blue-400"
              className="hover:border-blue-500/50"
            />

            <FeatureCard 
              icon={<UserGroupIcon className="h-12 w-12" />}
              title={t('features.case2.title')}
              description={t('features.case2.description')}
              iconColor="text-purple-400"
              className="hover:border-purple-500/50"
            />

            <FeatureCard 
              icon={<ChartBarIcon className="h-12 w-12" />}
              title={t('features.case3.title')}
              description={t('features.case3.description')}
              iconColor="text-green-400"
              className="hover:border-green-500/50"
            />

            <FeatureCard 
              icon={<LightBulbIcon className="h-12 w-12" />}
              title={t('features.case4.title')}
              description={t('features.case4.description')}
              iconColor="text-yellow-400"
              className="hover:border-yellow-500/50"
            />

            <FeatureCard 
              icon={<ClockIcon className="h-12 w-12" />}
              title={t('features.case5.title')}
              description={t('features.case5.description')}
              iconColor="text-red-400"
              className="hover:border-red-500/50"
            />

            <FeatureCard 
              icon={<StarIcon className="h-12 w-12" />}
              title={t('features.case6.title')}
              description={t('features.case6.description')}
              iconColor="text-indigo-400"
              className="hover:border-indigo-500/50"
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('process.title')}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Suivez ces étapes simples pour commencer votre carrière de détective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t('process.step1.title')}</h3>
              <p className="text-slate-300">
                {t('process.step1.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t('process.step2.title')}</h3>
              <p className="text-slate-300">
                {t('process.step2.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t('process.step3.title')}</h3>
              <p className="text-slate-300">
                {t('process.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('testimonials.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              name={t('testimonials.testimonial1.name')}
              role={t('testimonials.testimonial1.role')}
              content={t('testimonials.testimonial1.content')}
              rating={5}
              initials="M"
              gradientFrom="from-blue-400"
              gradientTo="to-purple-400"
            />

            <Testimonial 
              name={t('testimonials.testimonial2.name')}
              role={t('testimonials.testimonial2.role')}
              content={t('testimonials.testimonial2.content')}
              rating={5}
              initials="J"
              gradientFrom="from-green-400"
              gradientTo="to-blue-400"
            />

            <Testimonial 
              name={t('testimonials.testimonial3.name')}
              role={t('testimonials.testimonial3.role')}
              content={t('testimonials.testimonial3.content')}
              rating={5}
              initials="S"
              gradientFrom="from-purple-400"
              gradientTo="to-pink-400"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary"
              size="lg"
              to="/register"
            >
              {t('cta.button')}
            </Button>
            <Button 
              variant="outline"
              size="lg"
              to="/test-game"
            >
              {t('hero.ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold text-white flex items-center mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-blue-400 mr-2" />
                Case<span className="text-blue-400">Zero</span>
              </div>
              <p className="text-slate-400">
                {t('footer.tagline')}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.product')}</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">{t('footer.features')}</a></li>
                <li><a href="/test-game" className="hover:text-white transition-colors">Démo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.pricing')}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.documentation')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.mentions')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
