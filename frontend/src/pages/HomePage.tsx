import React from 'react';
import { Link } from 'react-router-dom';
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

const HomePage: React.FC = () => {
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
                Fonctionnalités
              </a>
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
                Comment ça marche
              </a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">
                Témoignages
              </a>
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Connexion
              </Link>
              <Link 
                to="/register" 
                className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-lg transition-colors"
              >
                S'inscrire
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
                Devenez le 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {" "}détective
                </span>
                <br />
                que vous avez toujours rêvé d'être
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Plongez dans des enquêtes policières immersives, analysez des preuves, interrogez des suspects 
                et résolvez des crimes complexes dans un environnement réaliste et captivant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary"
                  size="lg"
                  to="/register"
                  className="inline-flex items-center"
                >
                  <PlayCircleIcon className="h-5 w-5 mr-2" />
                  Commencer l'enquête
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  to="/test-game"
                  className="inline-flex items-center border-slate-400 text-slate-300 hover:text-white hover:border-white"
                >
                  <EyeIcon className="h-5 w-5 mr-2" />
                  Voir la démo
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
                  <div className="text-green-400 text-sm font-mono mb-2">CASE ZERO v1.0</div>
                  <div className="text-white text-lg font-semibold mb-4">📋 Enquête en cours...</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Preuves découvertes: 8/12
                    </div>
                    <div className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      Suspects interrogés: 3/4
                    </div>
                    <div className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      Analyses complétées: 5/6
                    </div>
                  </div>
                  <div className="mt-6 bg-slate-700 rounded p-3">
                    <div className="text-blue-400 text-xs mb-1">DERNIER INDICE DÉCOUVERT</div>
                    <div className="text-white text-sm">
                      "Les empreintes sur le verre correspondent au suspect #2..."
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
              Fonctionnalités Immersives
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Découvrez un environnement d'enquête complet avec des outils professionnels 
              et des mécaniques de jeu réalistes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<DocumentMagnifyingGlassIcon className="h-12 w-12" />}
              title="Analyse de Preuves"
              description="Examinez des indices physiques, analysez des documents et utilisez des outils scientifiques pour découvrir la vérité."
              iconColor="text-blue-400"
              className="hover:border-blue-500/50"
            />

            <FeatureCard 
              icon={<UserGroupIcon className="h-12 w-12" />}
              title="Interrogatoires"
              description="Menez des entretiens avec des suspects, témoins et experts. Chaque question peut révéler des informations cruciales."
              iconColor="text-purple-400"
              className="hover:border-purple-500/50"
            />

            <FeatureCard 
              icon={<ChartBarIcon className="h-12 w-12" />}
              title="Système de Score"
              description="Vos performances sont évaluées en fonction de votre précision, votre rapidité et votre méthode d'investigation."
              iconColor="text-green-400"
              className="hover:border-green-500/50"
            />

            <FeatureCard 
              icon={<LightBulbIcon className="h-12 w-12" />}
              title="Indices Intelligents"
              description="Système d'aide adaptatif qui vous guide sans révéler les solutions, préservant le challenge et l'immersion."
              iconColor="text-yellow-400"
              className="hover:border-yellow-500/50"
            />

            <FeatureCard 
              icon={<ClockIcon className="h-12 w-12" />}
              title="Enquêtes Variées"
              description="Des cas de difficulté croissante : vols, fraudes, homicides. Chaque enquête offre une expérience unique."
              iconColor="text-red-400"
              className="hover:border-red-500/50"
            />

            <FeatureCard 
              icon={<StarIcon className="h-12 w-12" />}
              title="Progression"
              description="Débloquez de nouveaux cas, améliorez vos compétences et gravissez les échelons de détective."
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
              Comment ça marche
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
              <h3 className="text-xl font-semibold text-white mb-3">Choisissez votre cas</h3>
              <p className="text-slate-300">
                Sélectionnez une enquête parmi notre catalogue de crimes à élucider. 
                Chaque cas a sa propre complexité et ses spécificités.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Enquêtez</h3>
              <p className="text-slate-300">
                Explorez la scène de crime, collectez des preuves, analysez les indices 
                et interrogez tous les protagonistes de l'affaire.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Résolvez</h3>
              <p className="text-slate-300">
                Formulez votre accusation en désignant le coupable, son motif et sa méthode. 
                Votre score dépend de votre précision et efficacité.
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
              Ce que disent nos détectives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              name="Marie Dubois"
              role="Détective amateur"
              content="Une expérience incroyablement immersive ! J'ai l'impression d'être vraiment sur une scène de crime. Les indices sont bien pensés et logiques."
              rating={5}
              initials="M"
              gradientFrom="from-blue-400"
              gradientTo="to-purple-400"
            />

            <Testimonial 
              name="Jean Martin"
              role="Étudiant en criminologie"
              content="Parfait pour s'entraîner ! Les cas sont variés et le système de scoring m'aide à améliorer mes techniques d'investigation."
              rating={5}
              initials="J"
              gradientFrom="from-green-400"
              gradientTo="to-blue-400"
            />

            <Testimonial 
              name="Sophie Laurent"
              role="Passionnée de polars"
              content="Enfin un jeu qui me permet de vivre mes fantasmes de détective ! Les histoires sont captivantes et les mécaniques très réalistes."
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
            Prêt à résoudre votre premier cas ?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Rejoignez des milliers de détectives et commencez votre carrière d'enquêteur dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary"
              size="lg"
              to="/register"
            >
              Commencer gratuitement
            </Button>
            <Button 
              variant="outline"
              size="lg"
              to="/test-game"
            >
              Essayer la démo
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
                L'expérience d'enquête policière la plus immersive et réaliste.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="/test-game" className="hover:text-white transition-colors">Démo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 CaseZero. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
