
import React from 'react';
import {
  ShieldCheck,
  Lock,
  CheckCircle,
  LockKeyhole,
  FileCheck,
  Users,
  Eye,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';
import FeatureCard from './ui-components/FeatureCard';
import CustomButton from './ui-components/Button';

const Security = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="h2">Security & Compliance</h1>
          <p className="text-muted-foreground">Our robust security measures and compliance standards</p>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton 
            size="sm" 
            variant="outline"
            iconLeft={<FileCheck size={16} />}
          >
            Security Reports
          </CustomButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title="Data Encryption"
          description="End-to-end encryption for all data in transit and at rest, using industry-standard AES-256 encryption."
          icon={Lock}
          className="animate-slide-up"
        />
        <FeatureCard
          title="Access Controls"
          description="Role-based access control (RBAC) to ensure users only access data they're authorized to view."
          icon={Users}
          className="animate-slide-up"
          style={{ animationDelay: '100ms' }}
        />
        <FeatureCard
          title="Audit Logging"
          description="Comprehensive audit logs of all system access and changes for compliance and security analysis."
          icon={Eye}
          className="animate-slide-up"
          style={{ animationDelay: '200ms' }}
        />
        <FeatureCard
          title="Regular Security Testing"
          description="Scheduled penetration testing and vulnerability assessments by third-party security experts."
          icon={ShieldAlert}
          className="animate-slide-up"
          style={{ animationDelay: '300ms' }}
        />
        <FeatureCard
          title="Secure Authentication"
          description="Multi-factor authentication (MFA) and single sign-on (SSO) options for enhanced security."
          icon={LockKeyhole}
          className="animate-slide-up"
          style={{ animationDelay: '400ms' }}
        />
        <FeatureCard
          title="Compliance Framework"
          description="Aligned with major regulatory requirements including GDPR, HIPAA, and SOC 2."
          icon={FileCheck}
          className="animate-slide-up"
          style={{ animationDelay: '500ms' }}
        />
      </div>
      
      <div className="glass-morphism rounded-xl p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Compliance Certifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'ISO 27001', description: 'Information Security Management' },
            { name: 'SOC 2 Type II', description: 'Service Organization Control' },
            { name: 'GDPR Compliant', description: 'EU Data Protection' },
            { name: 'HIPAA Compliant', description: 'Healthcare Information Privacy' },
            { name: 'PCI DSS', description: 'Payment Card Industry Data Security' },
            { name: 'CCPA Compliant', description: 'California Consumer Privacy' },
          ].map((certification) => (
            <div 
              key={certification.name} 
              className="border rounded-lg p-4 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">{certification.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{certification.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="glass-morphism rounded-xl p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h3 className="text-xl font-semibold mb-6">Security Infrastructure</h3>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Physical Security</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Data centers with 24/7 security, biometric access controls, and video surveillance</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Redundant power systems with backup generators and UPS</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Environmental controls including fire suppression and climate control</p>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Network Security</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Advanced firewall protection and intrusion detection systems</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">DDoS protection and mitigation services</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Regular vulnerability scanning and penetration testing</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">24/7 security monitoring and threat intelligence</p>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Application Security</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Secure software development lifecycle (SDLC) practices</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Regular code reviews and security testing</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Automated vulnerability scanning in CI/CD pipeline</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Web application firewall (WAF) protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 glass-morphism rounded-xl p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h3 className="text-xl font-semibold mb-4">Security Whitepapers</h3>
          <div className="space-y-4">
            {['Data Security Overview', 'Compliance Guide', 'Security Best Practices', 'Privacy Framework'].map((paper) => (
              <div key={paper} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/30 transition-colors">
                <span>{paper}</span>
                <CustomButton 
                  size="sm" 
                  variant="outline"
                  iconRight={<ExternalLink size={14} />}
                >
                  Download
                </CustomButton>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 glass-morphism rounded-xl p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <h3 className="text-xl font-semibold mb-4">Security FAQs</h3>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h4 className="font-medium mb-1">How is my data protected?</h4>
              <p className="text-sm text-muted-foreground">We use enterprise-grade encryption at rest and in transit to protect all your sensitive data.</p>
            </div>
            <div className="border-b pb-3">
              <h4 className="font-medium mb-1">Do you share data with third parties?</h4>
              <p className="text-sm text-muted-foreground">We never sell your data. We only share with third parties when necessary to provide services you've requested.</p>
            </div>
            <div className="border-b pb-3">
              <h4 className="font-medium mb-1">How often do you conduct security audits?</h4>
              <p className="text-sm text-muted-foreground">We perform internal security audits quarterly and engage third-party auditors annually.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">How do I report a security concern?</h4>
              <p className="text-sm text-muted-foreground">Contact our security team at security@trackify.com or through our responsible disclosure program.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
