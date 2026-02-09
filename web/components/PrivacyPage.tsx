
import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white py-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto prose lg:prose-lg">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-stone-500">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <p className="lead">
          This placeholder Privacy Policy outlines how Hyphai ("we", "our", or "us") might collect, use, and disclose information from users of our website. This is a template and not legal advice.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect information you provide directly to us, such as when you request a quote or fill out an inquiry form. This information may include:</p>
        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your phone number</li>
          <li>Information about your farm or operation</li>
        </ul>
        
        <h2>2. How We Use Your Information</h2>
        <p>We may use the information we collect to:</p>
        <ul>
            <li>Respond to your inquiries, questions, and comments.</li>
            <li>Provide you with quotes and information about our products and services.</li>
            <li>Improve our website and services.</li>
            <li>Communicate with you about promotions, upcoming events, and other news.</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
        
        <h2>4. User Behavior Tracking</h2>
        <p>To improve our service, we may track user interactions within our website, such as clicks on different machine options or paths taken through our configurator. This data is collected anonymously and in aggregate to help us understand what our customers are looking for.</p>

        <h2>5. Your Consent</h2>
        <p>By using our site, you consent to this placeholder privacy policy.</p>

        <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-800 p-4 mt-8">
          <p className="font-bold">Disclaimer</p>
          <p>This is a template Privacy Policy and should not be considered legally binding. You should consult with a legal professional to create a policy that is compliant with regulations applicable to your business and jurisdiction.</p>
        </div>
      </div>
    </div>
  );
};
