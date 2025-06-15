// AboutUs.js
import React from "react";

function AboutUs() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About WEARLY</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting all brands with conscious consumers in pakistan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2025, WEARLY began as a small platform for independent
            fashion designers/brands to showcase their work.
          </p>
          <p className="text-gray-600">
            Our mission is to democratize fashion by removing barriers between
            talented designers and the customers who appreciate their craft.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden h-80">
          {/* Placeholder for an image */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-500">
            <span className="text-white text-xl">WEARLY Team</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Our Vision
          </h3>
          <p className="text-gray-600">
            To create a sustainable fashion ecosystem where every creator has
            equal opportunity and every purchase makes a positive impact.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            For Sellers
          </h3>
          <p className="text-gray-600">
            We provide the tools, platform, and audience so you can focus on
            what you do best - creating amazing fashion.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            For Buyers
          </h3>
          <p className="text-gray-600">
            Discover unique, high-quality fashion while supporting independent
            designers and sustainable practices.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "Zaryab Ali", role: "Founder & CEO" },
            { name: "M.Talha Khan", role: "Founder & CTO" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-amber-400 to-pink-500">
                  <span className="text-white text-lg">
                    {member.name.split(" ")[0][0]}
                    {member.name.split(" ")[1][0]}
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
