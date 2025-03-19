
import { Header1 } from "@/components/ui/header";
import { Footerdemo } from "@/components/ui/footer-section";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header1 />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-gray-600 hover:text-brand-green"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-brand-green">Privacy Policy</h1>
        
        <div className="prose prose-green max-w-none dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300 mb-6">Last Updated: September 1, 2023</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Bloomzy! We are committed to protecting your privacy and providing you with a safe online experience. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p>
              By accessing or using our services, you consent to the practices described in this Privacy Policy. Please read this policy carefully to understand our practices regarding your information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-medium mb-2">Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Register for an account</li>
              <li>Sign up for our newsletter</li>
              <li>Complete forms on our website</li>
              <li>Participate in surveys or feedback</li>
              <li>Contact our customer support</li>
            </ul>
            <p>
              This information may include your name, email address, phone number, company name, job title, and any other information you choose to provide.
            </p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Usage Information</h3>
            <p>
              We automatically collect certain information about your device and how you interact with our services, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring websites</li>
              <li>Device information</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information, such as updates or security alerts</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send promotional communications, such as special offers or newsletters</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Protect the security and integrity of our services</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Cookies and Similar Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect and track information about your browsing activities. You can control cookies through your browser settings and other tools.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Information Sharing and Disclosure</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations or respond to legal process</li>
              <li>To protect the rights, property, or safety of Bloomzy, our users, or others</li>
              <li>In connection with a business transaction, such as a merger or acquisition</li>
              <li>With your consent or at your direction</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
            <p>
              Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date at the top of this policy. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> <a href="mailto:privacy@bloomzy.ca" className="text-accent-green hover:underline">privacy@bloomzy.ca</a>
            </p>
            <p>
              <strong>Address:</strong> 245 Fennell Ave W., Hamilton, ON L9C 7V7
            </p>
          </section>
        </div>
      </main>
      
      <Footerdemo />
    </div>
  );
}
