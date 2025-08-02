// PrivacyPolicy.js
import React from "react";

function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700">
            Welcome to SmartStyler, a multivendor ecommerce platform. We respect
            your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we look after your
            personal data when you visit our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. Information We Collect
          </h2>
          <p className="text-gray-700">
            We collect personal information such as name, email address,
            shipping address, and payment details when you make a purchase. For
            sellers, we collect additional business information to verify your
            identity and process payments.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700">
            Your information is used to process orders, provide customer
            support, improve our services, and communicate with you about
            products, services, and promotions. We never sell your personal
            information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, or destruction.
            All payment transactions are encrypted using SSL technology.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this privacy policy from time to time. The updated
            version will be indicated by an updated "Revised" date and will be
            effective immediately upon posting.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
