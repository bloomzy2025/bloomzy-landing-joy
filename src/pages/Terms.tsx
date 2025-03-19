
import { Header1 } from "@/components/ui/header";
import { Footerdemo } from "@/components/ui/footer-section";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-brand-green">Terms of Service</h1>
        
        <div className="prose prose-green max-w-none dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300 mb-6">Last Updated: September 1, 2023</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p>
              Welcome to Bloomzy! These Terms of Service govern your use of our website, products, and services. 
              By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
            </p>
            <p>
              If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Description of Services</h2>
            <p>
              Bloomzy provides productivity tools and services designed to help businesses and individuals optimize their time management and efficiency.
              Our services may include but are not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Time tracking and analysis tools</li>
              <li>Productivity assessment tools</li>
              <li>Task management solutions</li>
              <li>Personalized productivity recommendations</li>
              <li>Educational content and resources</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
            <p>
              Some features of our services may require you to create an account. When you create an account, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account and password</li>
              <li>Promptly update your account information as needed</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
            <p>
              We reserve the right to terminate accounts that violate these Terms or for any other reason at our sole discretion.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
            <p>
              The content, features, and functionality of our services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by Bloomzy and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our express prior written consent.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. User Content</h2>
            <p>
              When you submit, upload, or post content to our services ("User Content"), you grant Bloomzy a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your User Content in connection with providing our services.
            </p>
            <p>
              You represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>You own or have the necessary rights to your User Content</li>
              <li>Your User Content does not violate the privacy rights, publicity rights, copyright, contractual rights, or any other rights of any person</li>
              <li>Your User Content does not contain any material that is defamatory, obscene, illegal, threatening, or offensive</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall Bloomzy, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your access to or use of or inability to access or use our services</li>
              <li>Any conduct or content of any third party on our services</li>
              <li>Any content obtained from our services</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            <p>
              This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if we have been advised of the possibility of such damage.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
            <p>
              Our services are provided on an "as is" and "as available" basis without any warranties, expressed or implied. Bloomzy does not warrant that our services will be uninterrupted, timely, secure, or error-free.
            </p>
            <p>
              We make no warranties regarding the accuracy, reliability, completeness, or timeliness of the content, services, text, graphics, links, or communications provided on or through our services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Ontario, Canada, without regard to its conflict of law provisions.
            </p>
            <p>
              Any dispute arising from or relating to these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts located within Hamilton, Ontario.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of any material changes by updating the "Last Updated" date at the top of these Terms.
            </p>
            <p>
              Your continued use of our services after such modifications will constitute your acknowledgment of the modified Terms and agreement to abide and be bound by them.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> <a href="mailto:legal@bloomzy.ca" className="text-accent-green hover:underline">legal@bloomzy.ca</a>
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
