// TermsOfService.js
import React from "react";

function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. About WEARLY</h2>
          <p className="text-gray-700">
            WEARLY is a multivendor ecommerce platform that connects independent
            fashion sellers with customers worldwide. We provide the platform
            but are not directly involved in transactions between buyers and
            sellers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. User Responsibilities
          </h2>
          <p className="text-gray-700">
            Buyers are responsible for reading product descriptions carefully
            before purchasing. Sellers are responsible for accurate product
            listings, inventory management, and order fulfillment. All users
            must comply with applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Transactions</h2>
          <p className="text-gray-700">
            Payments are processed through our secure payment gateway. WEARLY
            holds funds in escrow until order completion. Refunds and returns
            are handled according to individual seller policies within the
            bounds of our platform guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Intellectual Property
          </h2>
          <p className="text-gray-700">
            Sellers retain ownership of their product designs and brand assets.
            By listing on WEARLY, sellers grant us a license to display and
            market their products. Buyers may not reproduce or resell products
            without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            WEARLY is not liable for disputes between buyers and sellers, though
            we may mediate. We are not responsible for any indirect, incidental,
            or consequential damages arising from platform use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Governing Law</h2>
          <p className="text-gray-700">
            These terms shall be governed by the laws of the jurisdiction where
            WEARLY is registered. Any disputes shall be resolved through
            arbitration in this jurisdiction.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsOfService;
