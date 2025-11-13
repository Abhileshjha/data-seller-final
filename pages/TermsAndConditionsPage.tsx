import React from 'react';

const TermsAndConditionsPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-dark-card p-8 rounded-lg shadow-lg border border-dark-border">
                <h1 className="text-3xl font-bold text-white mb-8">Terms and Conditions</h1>
                
                <div className="text-gray-300 space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                        <p className="leading-relaxed">
                            By accessing and using Data Seller Pro's services, you accept and agree to be bound by the terms and provision of this agreement. 
                            If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Service Description</h2>
                        <p className="leading-relaxed mb-3">
                            Data Seller Pro provides digital data analytics and insights services. Our services include but are not limited to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Premium analytics reports</li>
                            <li>Customer behavior insights</li>
                            <li>Market trend analysis</li>
                            <li>Business intelligence dashboards</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
                        <p className="leading-relaxed mb-3">
                            By using our services, you agree to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Provide accurate and complete information</li>
                            <li>Maintain the confidentiality of your account credentials</li>
                            <li>Use the service only for lawful purposes</li>
                            <li>Not redistribute or resell our data without permission</li>
                            <li>Comply with all applicable laws and regulations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Payment Terms</h2>
                        <p className="leading-relaxed">
                            All payments are processed securely through our payment gateway. By making a purchase, you agree to pay all charges 
                            associated with your order. Prices are subject to change without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Intellectual Property</h2>
                        <p className="leading-relaxed">
                            All content, data, reports, and analytics provided by Data Seller Pro are protected by intellectual property laws. 
                            You may not copy, distribute, or create derivative works without our express written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Data Privacy and Security</h2>
                        <p className="leading-relaxed">
                            We take your privacy seriously. All personal information collected is handled according to our Privacy Policy. 
                            We implement industry-standard security measures to protect your data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
                        <p className="leading-relaxed">
                            Data Seller Pro shall not be liable for any direct, indirect, incidental, special, or consequential damages 
                            resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">8. Service Availability</h2>
                        <p className="leading-relaxed">
                            We strive to maintain 99.9% uptime, but we do not guarantee uninterrupted service. 
                            We reserve the right to modify, suspend, or discontinue any aspect of our service with or without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">9. Account Termination</h2>
                        <p className="leading-relaxed">
                            We reserve the right to terminate or suspend accounts that violate these terms. 
                            You may terminate your account at any time by contacting our support team.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
                        <p className="leading-relaxed">
                            These terms shall be governed by and construed in accordance with the laws of India. 
                            Any disputes arising under these terms shall be subject to the exclusive jurisdiction of Indian courts.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">11. Changes to Terms</h2>
                        <p className="leading-relaxed">
                            We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. 
                            Continued use of our services constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">12. Contact Information</h2>
                        <p className="leading-relaxed">
                            For questions about these Terms and Conditions, please contact us at:
                        </p>
                        <div className="bg-dark-bg p-4 rounded-md mt-3">
                            <p><strong>Email:</strong> legal@datasellerpro.com</p>
                            <p><strong>Address:</strong> Data Seller Pro, Business District, India</p>
                        </div>
                    </section>

                    <div className="border-t border-dark-border pt-6 mt-8">
                        <p className="text-sm text-gray-400">
                            <strong>Last Updated:</strong> October 21, 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;