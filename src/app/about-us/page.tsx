"use client";

import React from "react";
import Footer from "@/components/footer";

export default function AboutUsPage() {
  return (
    <>
      {/* Content wrapper */}
      <div className="relative min-h-screen">
        <section className="py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
            
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold mb-4">"PERMISI"</h2>
              <p className="mb-4">
                PERMISI stands for <strong>Persatuan Mahasiswa Indonesia CityU</strong> which translates to Indonesian Students' Association CityU. 
                Permisi is also Indonesian for "excuse me", a way of notifying others of our presence. We chose this as our name because 
                it represents our culture of respecting and valuing others - something that Indonesians are known for and are proud of. 
                Thus, through this community, we are making our presence known in the international world without letting go of our roots. 
                We hope every Indonesian student in CityU can be part of our journey as we continue to grow.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4">Vision:</h3>
              <p className="mb-4">
                To foster a tight-knit community and provide a platform for every Indonesian student at City University of Hong Kong 
                to develop their ideas and talents.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4">Mission:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Support the holistic development of our community members through active interaction and meaningful engagement
                </li>
                <li>
                  Build strong and lasting partnerships with external parties to increase opportunities and community exposure 
                  and provide a bridge for our community members
                </li>
                <li>
                  Introduce and showcase Indonesian culture to the global community at City University
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4">PERMISI Constitution</h3>
              <p className="mb-4">
                Learn more about our organizational structure, rules, and guidelines in our official constitution document.
              </p>
              <a 
                href="/files/PERMISI's Constitution.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium mr-4 mb-2"
              >
                📄 Download Constitution (PDF)
              </a>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4">Application Handbook</h3>
              <p className="mb-4">
                Interested in joining PERMISI? Download our application handbook for detailed information about membership, 
                activities, and the application process.
              </p>
              <a 
                href="/files/Application Handbook Permisi 2024_2025.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
              >
                📘 Download Handbook (PDF)
              </a>
            </section>
          </div>
        </section>
      </div>
      
      {/* Footer at bottom of page content */}
      <Footer />
    </>
  );
}