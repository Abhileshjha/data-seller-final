import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-dark-card p-8 rounded-lg shadow-lg border border-dark-border">
                <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
                
                <div className="text-gray-300 space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
                        <p className="leading-relaxed">
                            Data Seller Pro ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                            how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
                        <h3 className="text-lg font-medium text-white mb-2">Personal Information</h3>
                        <p className="leading-relaxed mb-3">We may collect personal information that you voluntarily provide, including:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                            <li>Name and contact information (email, phone number)</li>
                            <li>Payment and billing information</li>
                            <li>Account credentials and preferences</li>
                            <li>Communication records with our support team</li>
                        </ul>

                        <h3 className="text-lg font-medium text-white mb-2">Automatically Collected Information</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>IP address and device information</li>
                            <li>Browser type and version</li>
                            <li>Operating system and platform</li>
                            <li>Pages visited and time spent on our site</li>
                            <li>Referral sources and exit pages</li>
                            <li>Cookies and tracking technologies data</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
                        <p className="leading-relaxed mb-3">We use the collected information for the following purposes:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Provide and maintain our services</li>
                            <li>Process payments and transactions</li>
                            <li>Send administrative and service-related communications</li>
                            <li>Improve our website and services</li>
                            <li>Analyze usage patterns and trends</li>
                            <li>Prevent fraud and enhance security</li>
                            <li>Comply with legal obligations</li>
                            <li>Respond to customer inquiries and support requests</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Information Sharing and Disclosure</h2>
                        <p className="leading-relaxed mb-3">We may share your information in the following circumstances:</p>
                        
                        <h3 className="text-lg font-medium text-white mb-2">Service Providers</h3>
                        <p className="leading-relaxed mb-3">
                            We work with trusted third-party service providers who assist us in operating our business, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                            <li>Payment processors (Razorpay, etc.)</li>
                            <li>Cloud hosting services</li>
                            <li>Analytics providers</li>
                            <li>Customer support tools</li>
                        </ul>

                        <h3 className="text-lg font-medium text-white mb-2">Legal Requirements</h3>
                        <p className="leading-relaxed mb-3">We may disclose your information if required by law or in response to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Court orders or legal processes</li>
                            <li>Government requests or investigations</li>
                            <li>Protection of our rights and property</li>
                            <li>Prevention of fraud or security threats</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Data Security</h2>
                        <p className="leading-relaxed mb-3">
                            We implement appropriate technical and organizational security measures to protect your personal information, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Secure payment processing through certified providers</li>
                            <li>Regular security audits and updates</li>
                            <li>Access controls and authentication measures</li>
                            <li>Employee training on data protection</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Cookies and Tracking Technologies</h2>
                        <p className="leading-relaxed mb-3">
                            We use cookies and similar technologies to enhance your experience. Types of cookies we use include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand site usage</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                            <li><strong>Marketing Cookies:</strong> Used for targeted advertising (if applicable)</li>
                        </ul>
                        <p className="leading-relaxed mt-3">
                            You can control cookies through your browser settings, but disabling certain cookies may affect site functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">7. Data Retention</h2>
                        <p className="leading-relaxed">
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, 
                            comply with legal obligations, resolve disputes, and enforce our agreements. Customer data is typically retained 
                            for a period of 7 years after account closure, unless a longer retention period is required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">8. Your Privacy Rights</h2>
                        <p className="leading-relaxed mb-3">
                            Depending on your jurisdiction, you may have the following rights regarding your personal information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Access:</strong> Request copies of your personal information</li>
                            <li><strong>Rectification:</strong> Request correction of inaccurate information</li>
                            <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                            <li><strong>Portability:</strong> Request transfer of your data</li>
                            <li><strong>Objection:</strong> Object to processing of your information</li>
                            <li><strong>Restriction:</strong> Request limitation of processing</li>
                        </ul>
                        <p className="leading-relaxed mt-3">
                            To exercise these rights, please contact us using the information provided below.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">9. International Data Transfers</h2>
                        <p className="leading-relaxed">
                            Your information may be transferred to and processed in countries other than your country of residence. 
                            We ensure that such transfers are conducted with appropriate safeguards and in compliance with applicable 
                            data protection laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">10. Children's Privacy</h2>
                        <p className="leading-relaxed">
                            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
                            information from children. If we become aware that we have collected personal information from a child, 
                            we will take steps to delete such information promptly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">11. Third-Party Links</h2>
                        <p className="leading-relaxed">
                            Our website may contain links to third-party websites. We are not responsible for the privacy practices 
                            of these external sites. We encourage you to read the privacy policies of any third-party websites you visit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">12. Changes to This Privacy Policy</h2>
                        <p className="leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                            posting the updated policy on our website with a new "Last Updated" date. Your continued use of our 
                            services after such changes constitutes your acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">13. Contact Information</h2>
                        <p className="leading-relaxed mb-3">
                            If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, 
                            please contact us:
                        </p>
                        <div className="bg-dark-bg p-4 rounded-md">
                            <p><strong>Email:</strong> privacy@datasellerpro.com</p>
                            <p><strong>Data Protection Officer:</strong> dpo@datasellerpro.com</p>
                            <p><strong>Address:</strong> Data Seller Pro, Business District, India</p>
                            <p><strong>Response Time:</strong> We will respond to your inquiry within 30 days</p>
                        </div>
                    </section>

                    <div className="border-t border-dark-border pt-6 mt-8">
                        <p className="text-sm text-gray-400">
                            <strong>Last Updated:</strong> October 21, 2025<br/>
                            <strong>Effective Date:</strong> October 21, 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;