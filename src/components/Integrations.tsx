
import React from 'react';
import {
  LayoutGrid,
  ZapIcon,
  Database,
  Smartphone,
  MessageSquare,
  CreditCard,
  BarChart,
  ExternalLink
} from 'lucide-react';
import FeatureCard from './ui-components/FeatureCard';
import CustomButton from './ui-components/Button';

const integrationCategories = [
  {
    title: 'Enterprise Systems',
    description: 'Connect with enterprise resource planning and management systems',
    icon: LayoutGrid,
    integrations: [
      { name: 'SAP', status: 'Connected', logo: '🔄' },
      { name: 'Oracle', status: 'Available', logo: '📦' },
      { name: 'Microsoft Dynamics', status: 'Available', logo: '📦' },
      { name: 'NetSuite', status: 'Available', logo: '📦' },
    ]
  },
  {
    title: 'Logistics Providers',
    description: 'Integrate with third-party shipping and logistics solutions',
    icon: ZapIcon,
    integrations: [
      { name: 'FedEx', status: 'Connected', logo: '🔄' },
      { name: 'UPS', status: 'Connected', logo: '🔄' },
      { name: 'DHL', status: 'Available', logo: '📦' },
      { name: 'USPS', status: 'Available', logo: '📦' },
    ]
  },
  {
    title: 'E-commerce Platforms',
    description: 'Connect your online sales channels for seamless order management',
    icon: CreditCard,
    integrations: [
      { name: 'Shopify', status: 'Connected', logo: '🔄' },
      { name: 'WooCommerce', status: 'Available', logo: '📦' },
      { name: 'Magento', status: 'Available', logo: '📦' },
      { name: 'BigCommerce', status: 'Available', logo: '📦' },
    ]
  },
  {
    title: 'CRM Systems',
    description: 'Connect your customer relationship management systems',
    icon: MessageSquare,
    integrations: [
      { name: 'Salesforce', status: 'Connected', logo: '🔄' },
      { name: 'HubSpot', status: 'Available', logo: '📦' },
      { name: 'Zoho', status: 'Available', logo: '📦' },
      { name: 'Pipedrive', status: 'Available', logo: '📦' },
    ]
  },
];

const Integrations = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="h2">Integrations</h1>
          <p className="text-muted-foreground">Connect with your favorite tools and systems</p>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton 
            size="sm" 
            variant="outline"
          >
            Manage Connections
          </CustomButton>
          <CustomButton 
            size="sm" 
            variant="default"
            iconLeft={<ZapIcon size={16} />}
          >
            New Integration
          </CustomButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          title="API Access"
          description="Access our RESTful API for custom integrations. Get detailed documentation and support for seamless connectivity."
          icon={Database}
          className="animate-slide-up hover:shadow-lg"
        />
        <FeatureCard
          title="Mobile App Integration"
          description="Connect with our mobile applications for iOS and Android. Enable mobile scanning, tracking, and order management."
          icon={Smartphone}
          className="animate-slide-up hover:shadow-lg"
          style={{ animationDelay: '100ms' }}
        />
        <FeatureCard
          title="Data Analytics"
          description="Integrate with business intelligence tools. Extract valuable insights and create custom reports."
          icon={BarChart}
          className="animate-slide-up hover:shadow-lg"
          style={{ animationDelay: '200ms' }}
        />
        <FeatureCard
          title="Zapier Integration"
          description="Connect with 3,000+ apps through our Zapier integration. Automate workflows without coding."
          icon={ZapIcon}
          className="animate-slide-up hover:shadow-lg"
          style={{ animationDelay: '300ms' }}
        />
      </div>
      
      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-semibold">Available Integrations</h2>
        
        <div className="space-y-8">
          {integrationCategories.map((category, index) => (
            <div 
              key={category.title} 
              className="glass-morphism rounded-xl p-4 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {category.integrations.map((integration) => (
                  <div 
                    key={integration.name}
                    className="p-4 border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-3">
                        {integration.logo}
                      </div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <span className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                        integration.status === 'Connected' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {integration.status}
                      </span>
                      <div className="mt-3">
                        <button className="text-xs text-primary hover:text-primary/70 flex items-center gap-1">
                          {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                          <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="glass-morphism rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 animate-slide-up">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">Need a custom integration?</h3>
          <p className="text-muted-foreground">
            Our team can help you build custom integrations with your proprietary systems or specialized technologies.
          </p>
        </div>
        <CustomButton 
          variant="default" 
          iconRight={<ExternalLink size={16} />}
        >
          Contact Support
        </CustomButton>
      </div>
    </div>
  );
};

export default Integrations;
