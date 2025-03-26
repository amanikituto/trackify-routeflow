
import React, { useState } from 'react';
import {
  LayoutGrid,
  ZapIcon,
  Database,
  Smartphone,
  MessageSquare,
  CreditCard,
  BarChart,
  ExternalLink,
  CheckIcon,
  AlertCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import FeatureCard from './ui-components/FeatureCard';
import CustomButton from './ui-components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
  const [showNewIntegrationDialog, setShowNewIntegrationDialog] = useState(false);
  const [showManageConnectionsDialog, setShowManageConnectionsDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<{ name: string; category: string } | null>(null);
  const [apiKey, setApiKey] = useState('');
  
  const handleConnectIntegration = (integration: string, category: string) => {
    setSelectedIntegration({ name: integration, category });
    setShowNewIntegrationDialog(true);
  };

  const handleSaveIntegration = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "API Key is required",
        variant: "destructive",
      });
      return;
    }

    // In a real application, you would send this to your backend
    toast({
      title: "Integration Successful",
      description: `Connected to ${selectedIntegration?.name}`,
      variant: "default",
    });
    
    setShowNewIntegrationDialog(false);
    setApiKey('');
  };

  const handleDisconnectIntegration = (integration: string) => {
    toast({
      title: "Integration Disconnected",
      description: `Disconnected from ${integration}`,
      variant: "default",
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Support Request Sent",
      description: "Our team will contact you shortly about custom integration options.",
      variant: "default",
    });
  };

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
            onClick={() => setShowManageConnectionsDialog(true)}
          >
            Manage Connections
          </CustomButton>
          <CustomButton 
            size="sm" 
            variant="default"
            iconLeft={<ZapIcon size={16} />}
            onClick={() => setShowNewIntegrationDialog(true)}
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
                        <button 
                          className="text-xs text-primary hover:text-primary/70 flex items-center gap-1"
                          onClick={() => integration.status === 'Connected' 
                            ? handleDisconnectIntegration(integration.name)
                            : handleConnectIntegration(integration.name, category.title)
                          }
                        >
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
          onClick={handleContactSupport}
        >
          Contact Support
        </CustomButton>
      </div>

      {/* New Integration Dialog */}
      <Dialog open={showNewIntegrationDialog} onOpenChange={setShowNewIntegrationDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedIntegration ? `Connect to ${selectedIntegration.name}` : 'New Integration'}</DialogTitle>
            <DialogDescription>
              {selectedIntegration 
                ? `Add your ${selectedIntegration.name} API credentials to connect your account.`
                : 'Select an integration service to connect to your account.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedIntegration ? (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="apiKey" className="text-right">
                    API Key
                  </Label>
                  <Input
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="col-span-3"
                  />
                </div>
                <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <AlertCircle size={16} className="mt-0.5" />
                  <p>Your API key is securely encrypted and never shared.</p>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                {integrationCategories.map((category) => (
                  <div key={category.title} className="mb-4">
                    <h4 className="text-sm font-medium mb-2">{category.title}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {category.integrations
                        .filter(integration => integration.status === 'Available')
                        .map(integration => (
                          <Button 
                            key={integration.name} 
                            variant="outline" 
                            className="justify-start"
                            onClick={() => handleConnectIntegration(integration.name, category.title)}
                          >
                            <span className="mr-2">{integration.logo}</span>
                            {integration.name}
                          </Button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowNewIntegrationDialog(false);
              setSelectedIntegration(null);
              setApiKey('');
            }}>
              Cancel
            </Button>
            {selectedIntegration && (
              <Button onClick={handleSaveIntegration}>Save</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Connections Dialog */}
      <Dialog open={showManageConnectionsDialog} onOpenChange={setShowManageConnectionsDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Manage Connections</DialogTitle>
            <DialogDescription>
              View and manage your current integration connections.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            {integrationCategories.map((category) => {
              const connectedIntegrations = category.integrations.filter(i => i.status === 'Connected');
              if (connectedIntegrations.length === 0) return null;
              
              return (
                <div key={category.title} className="mb-6">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <category.icon className="h-4 w-4 mr-1 text-primary" />
                    {category.title}
                  </h4>
                  <div className="space-y-3">
                    {connectedIntegrations.map(integration => (
                      <div key={integration.name} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md flex items-center justify-center text-lg bg-primary/10">
                            {integration.logo}
                          </div>
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <p className="text-xs text-muted-foreground">Connected on June 15, 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleConnectIntegration(integration.name, category.title)}
                          >
                            Configure
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDisconnectIntegration(integration.name)}
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setShowManageConnectionsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Integrations;
