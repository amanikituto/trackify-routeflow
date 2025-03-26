
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Route,
  PackageOpen,
  Layers,
  Cloud,
  ShieldCheck,
  ChevronRight,
  BarChart,
  Terminal,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add a slight delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6 transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Next-Generation Logistics Solution
                </div>
              </div>
              
              <h1 className={`text-5xl md:text-6xl font-bold tracking-tight leading-tight transform transition-all duration-700 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                Revolutionize Your <span className="text-primary">Delivery</span> Operations
              </h1>
              
              <p className={`text-xl text-muted-foreground transform transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                Intelligent route optimization, real-time tracking, and automated inventory management in one powerful platform.
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white rounded-lg h-12 px-6"
                  onClick={() => navigate('/dashboard')}
                >
                  <span>Explore Dashboard</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-lg h-12 px-6"
                >
                  <span>Watch Demo</span>
                </Button>
              </div>
              
              <div className={`pt-8 transform transition-all duration-700 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <p className="text-sm text-muted-foreground mb-4">Trusted by industry leaders</p>
                <div className="flex flex-wrap gap-8">
                  <div className="text-muted-foreground/60 hover:text-muted-foreground">
                    <span className="text-lg font-bold">CompanyOne</span>
                  </div>
                  <div className="text-muted-foreground/60 hover:text-muted-foreground">
                    <span className="text-lg font-bold">LogisticsPro</span>
                  </div>
                  <div className="text-muted-foreground/60 hover:text-muted-foreground">
                    <span className="text-lg font-bold">ShipFast</span>
                  </div>
                  <div className="text-muted-foreground/60 hover:text-muted-foreground">
                    <span className="text-lg font-bold">DeliverEase</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className={`relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 aspect-video glass-morphism rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <MapPin className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Live Fleet Tracking</h3>
                      <p className="text-muted-foreground">Monitor your vehicles in real-time with our advanced GPS tracking system</p>
                      
                      <div className="mt-6 w-full h-32 rounded-lg bg-background/80 flex items-center justify-center relative">
                        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                        
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <path 
                            d="M40,40 Q80,20 120,80 T200,120" 
                            fill="none" 
                            stroke="rgba(59, 130, 246, 0.5)" 
                            strokeWidth="3" 
                            strokeDasharray="8 4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-5 -left-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-accent/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold section-transition">Powerful Features for Modern Logistics</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto section-transition">
              Our comprehensive platform streamlines your delivery operations from end to end
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Real-time Tracking & Monitoring",
                description: "Live GPS tracking, automated alerts, and performance analytics.",
                delay: 0
              },
              {
                icon: Route,
                title: "AI-Powered Route Optimization",
                description: "Reduce fuel costs and delivery times using intelligent algorithms.",
                delay: 100
              },
              {
                icon: PackageOpen,
                title: "Automated Order Management",
                description: "Ensure accurate stock levels and reduce human errors.",
                delay: 200
              },
              {
                icon: Layers,
                title: "Multi-Platform Integration",
                description: "Seamlessly connect with ERP, CRM, and third-party logistics providers.",
                delay: 300
              },
              {
                icon: Cloud,
                title: "Cloud-Based & Scalable",
                description: "Accessible from anywhere, adaptable for businesses of all sizes.",
                delay: 400
              },
              {
                icon: ShieldCheck,
                title: "Robust Security & Compliance",
                description: "Meeting global industry standards for data security and regulatory compliance.",
                delay: 500
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-morphism p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 section-transition"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto glass-morphism rounded-2xl overflow-hidden relative section-transition">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-2/3 space-y-4">
                <h2 className="text-3xl font-bold">Ready to transform your logistics operations?</h2>
                <p className="text-lg text-muted-foreground">
                  Join thousands of businesses that have increased efficiency, reduced costs, and improved customer satisfaction with our platform.
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col gap-3">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white rounded-lg h-12 w-full"
                  onClick={() => navigate('/dashboard')}
                >
                  <span>Try Dashboard</span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-lg h-12 w-full"
                >
                  <span>Schedule Demo</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 lg:px-8 bg-background border-t mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="relative text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <span className="font-bold text-lg">Trackify</span>
                  <span className="text-muted-foreground ml-1">RouteFlow</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                The intelligent logistics platform that transforms your delivery operations with AI-powered optimization and real-time tracking.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                  <BarChart size={14} className="text-primary" />
                </div>
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                  <Terminal size={14} className="text-primary" />
                </div>
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                  <MapPin size={14} className="text-primary" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
              <div>
                <h4 className="font-medium mb-4">Product</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Integrations</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Roadmap</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Resources</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Guides</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Company</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2023 Trackify RouteFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
