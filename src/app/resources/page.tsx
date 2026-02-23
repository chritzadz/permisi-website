
"use client";

import React from "react";
import Footer from "@/components/footer";

export default function ResourcesPage() {
  return (
    <>
      {/* Content wrapper */}
      <div className="relative min-h-screen">
        <section className="py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Resources</h1>
          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Planning your journey to Hong Kong?</h2>
            <p className="mb-4">Here’s everything you need to prepare before you embark on this exciting adventure, along with important resources and what to expect during your stay.</p>
          </section>
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-2">Pre-Arrival Preparations</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <span className="font-semibold">Passport</span><br />
                Ensure your passport is valid for at least 6 months from your intended date of arrival.<br />
                <span className="text-sm text-gray-600">Important Note: Keep your landing slip safe, as it may be essential for various administrative processes.</span>
              </li>
              <li className="mb-2">
                <span className="font-semibold">Student Visa</span><br />
                Check your visa for the following key dates:
                <ul className="list-disc pl-6">
                  <li>Date of Issue: When your visa was granted.</li>
                  <li>Date of Expiry: The last day your visa is valid.</li>
                  <li>"Must Enter By": Some visas stipulate a specific date for your initial entry.</li>
                </ul>
              </li>
              <li className="mb-2">
                <span className="font-semibold">Hong Kong Identity Card (HKID)</span><br />
                Book an appointment for your HKID as soon as you receive your visa; you have 30 days from your arrival.<br />
                For details, visit <a href="https://www.gov.hk/en/residents/immigration/idcard/hkid.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Online Appointment Booking for HKID</a>.
              </li>
              <li className="mb-2">
                <span className="font-semibold">Flights</span><br />
                <span>Direct Options:</span> Cathay Pacific, Garuda Indonesia.<br />
                <span>Indirect Options:</span> Singapore Airlines, Malaysia Airlines, Air Asia.<br />
                Benefit from student fares and additional baggage allowances.
              </li>
              <li className="mb-2">
                <span className="font-semibold">Insurance</span><br />
                <span>Mandatory:</span> CityUHK Basic Package.<br />
                <span>Optional:</span> CityUHK Top Up Package.
              </li>
              <li className="mb-2">
                <span className="font-semibold">Banking</span><br />
                Consider opening a multi-currency account with options such as Jenius (VISA Card), OCBC (MasterCard, cash withdrawal), Livin by Mandiri, or Wondr by BNI.<br />
                If you choose not to open an account, ensure you have enough cash to cover initial expenses.
              </li>
            </ul>
          </section>
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-2">Packing Essentials</h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <span className="font-semibold">Clothing:</span><br />
                <span>Summer (April-November):</span> Expect temperatures between 27-31°C (humid).<br />
                <span>Winter (December-March):</span> Prepare for cooler temperatures of 8-12°C (with strong winds).
              </li>
              <li className="mb-2">
                <span className="font-semibold">Other Items:</span>
                <ul className="list-disc pl-6">
                  <li>Personal medicines.</li>
                  <li>Important documents (original and translated).</li>
                  <li>Bedding necessities (bed cover, blanket, pillow).</li>
                  <li>Instant food and snacks.</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-2">On Arrival</h3>
            
            <h4 className="text-md font-semibold mb-2">Important Dates to Remember</h4>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <span className="font-semibold">Early August:</span> Keep an eye on your inbox for the CityUHK Enrollment Notification email; this is your first step for enrollment!
              </li>
            </ul>

            <h4 className="text-md font-semibold mb-2">Enrollment Steps</h4>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <span className="font-semibold">Complete Pre-Enrolment:</span><br />
                Follow instructions in your notification email to ensure everything is set before arriving.
              </li>
              <li className="mb-2">
                <span className="font-semibold">On-Campus Enrollment (SID Verification):</span><br />
                Confirm your student ID and finalize your enrollment.
              </li>
            </ul>

            <h4 className="text-md font-semibold mb-2">What to Bring for Pre-Enrollment</h4>
            <p className="mb-2">When attending pre-enrollment, be sure to have the following documents:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Passport: Your primary identification.</li>
              <li>Visa: Required for your stay.</li>
              <li>Landing Slip: Essential for administrative processes at CityU.</li>
              <li>Parental Consent Form: Necessary if you are under 18 on the enrollment day.</li>
            </ul>

            <h4 className="text-md font-semibold mb-2">Getting Your Temporary Octopus Card</h4>
            <p className="mb-2">You can obtain a temporary Octopus card from:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>7-Eleven and Circle K stores.</li>
              <li>Selected MTR Stations (including the Airport MTR).</li>
              <li>Airport Octopus vending machines.</li>
            </ul>
            <p className="mb-4">The Octopus card helps you conveniently travel around the city.</p>

            <h4 className="text-md font-semibold mb-2">Transportation Options from the Airport</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>HK-Taxi: Pay with cash for a straightforward ride.</li>
              <li>Bus: An economical choice, payable with your Octopus card.</li>
              <li>Airport Express + MTR: Quick travel option, also using Octopus.</li>
              <li>CityUHK Shuttle Bus: Available during orientation week; check for availability.</li>
            </ul>

            <h4 className="text-md font-semibold mb-2">SIM Card Options for Connectivity</h4>
            <p className="mb-2">Stay connected with these SIM card options:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>SO SIM: Available at Watsons & ParknShop for $139 for 90 days (120 GB data).</li>
              <li>CMHK: Plan available at 7-Eleven for $88 for 120 days (120 GB data).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-2">Post Arrival Steps</h3>
            
            <h4 className="text-md font-semibold mb-2">Bank Account Setup</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Appointment: Book your appointment a week ahead.</li>
              <li>Eligibility: Applicants must be 18 years or older.</li>
              <li>Requirements: Passport or HKID, SID, proof of residence, etc.</li>
              <li>Guardian Requirement: For students under 18, bring your translated KK (Kartu Keluarga).</li>
            </ul>

            <h4 className="text-md font-semibold mb-2">Local Bank Options</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>HSBC</li>
              <li>Hang Seng Bank</li>
              <li>Bank of China</li>
            </ul>

            <h4 className="text-md font-semibold mb-2">Required Documents for HSBC:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>HK phone number</li>
              <li>SID</li>
              <li>Passport</li>
            </ul>

            <h4 className="text-md font-semibold mb-2">Required Documents for Hang Seng:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>HK phone number</li>
              <li>Passport</li>
              <li>Proof of residence (from the Student Residence MOS Office).</li>
            </ul>

            <h4 className="text-md font-semibold mb-2">Student Octopus Card</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Registration: Instructions will be provided on how to apply.</li>
              <li>Discount Benefits: 50% discount on fares.</li>
              <li>Getting Your Card: Download the Octopus App, submit necessary documents, and verify your personal information.</li>
            </ul>

            <h4 className="text-md font-semibold mb-2">Course Management</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <span className="font-semibold">Add and Drop Courses:</span><br />
                Check the <a href="https://www.cityu.edu.hk/its/services-facilities/list-of-services-facilities/a/aims-banner?c=%7B50520DE6-2A0E-4A46-BE9F-1E8074961FC8%7D" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">AIMS for the schedule</a>.<br />
                Review your programme's requirements and recommendations.
              </li>
            </ul>
          </section>
          </div>
        </section>
      </div>
      
      {/* Footer at bottom of page content */}
      <Footer />
    </>
  );
}
