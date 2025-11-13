import React from 'react';

const RefundPolicyPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-dark-card p-8 rounded-lg shadow-lg border border-dark-border">
                <h1 className="text-3xl font-bold text-white mb-8">Refund Policy</h1>
                
                <div className="text-gray-300 space-y-6">
                    {/* Important Notice */}
                    <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-red-300 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            Important Notice: No Refunds Policy
                        </h2>
                        <p className="leading-relaxed text-red-200">
                            <strong>ALL SALES ARE FINAL. Data Seller Pro does NOT provide refunds for any purchases made on our platform.</strong> 
                            Please read this policy carefully before making any purchase.
                        </p>
                    </div>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. No Refund Policy</h2>
                        <p className="leading-relaxed mb-3">
                            Data Seller Pro operates under a strict <strong>NO REFUND</strong> policy. Once a purchase is completed and payment is processed, 
                            we do not provide refunds, returns, or exchanges under any circumstances, including but not limited to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Change of mind after purchase</li>
                            <li>Duplicate purchases</li>
                            <li>Technical issues on the customer's end</li>
                            <li>Inability to access or use the purchased data</li>
                            <li>Dissatisfaction with the content or quality</li>
                            <li>Financial hardship or budget constraints</li>
                            <li>Accidental purchases</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Nature of Digital Products</h2>
                        <p className="leading-relaxed">
                            Our services consist of digital data analytics, reports, and insights. Due to the instantaneous nature of digital delivery 
                            and the proprietary value of our data, all purchases are considered final upon completion of payment processing.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Pre-Purchase Considerations</h2>
                        <p className="leading-relaxed mb-3">
                            Before making any purchase, please ensure that:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>You have carefully reviewed the product description and specifications</li>
                            <li>You understand the scope and limitations of the data provided</li>
                            <li>You have the necessary technical requirements to access the data</li>
                            <li>You are authorized to make the purchase on behalf of your organization</li>
                            <li>You agree to the terms and conditions of use</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Payment Processing</h2>
                        <p className="leading-relaxed">
                            All payments are processed through secure payment gateways. Once a payment is successfully processed and confirmed, 
                            the transaction is considered complete and irreversible. We do not have the ability to reverse or cancel completed transactions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Technical Support</h2>
                        <p className="leading-relaxed">
                            While we do not provide refunds, we are committed to helping customers access their purchased data. 
                            If you experience technical difficulties accessing your purchase, please contact our technical support team. 
                            However, technical support does not constitute grounds for a refund.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Fraudulent Transactions</h2>
                        <p className="leading-relaxed">
                            In cases of proven fraudulent transactions or unauthorized use of payment methods, we may consider reversing the transaction 
                            only after proper verification and documentation from relevant financial institutions or law enforcement agencies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">7. Service Interruptions</h2>
                        <p className="leading-relaxed">
                            Temporary service interruptions, maintenance downtime, or technical issues on our platform do not constitute grounds for refunds. 
                            We will work diligently to restore services as quickly as possible.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">8. Legal Compliance</h2>
                        <p className="leading-relaxed">
                            This no-refund policy is in compliance with applicable consumer protection laws for digital goods and services. 
                            By making a purchase, you acknowledge and agree to waive any right to refund or return.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">9. Exceptions</h2>
                        <p className="leading-relaxed">
                            <strong>There are NO exceptions to this policy.</strong> We do not make case-by-case determinations for refunds. 
                            All customer requests for refunds will be declined, regardless of the circumstances.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">10. Contact for Questions</h2>
                        <p className="leading-relaxed mb-3">
                            If you have questions about this refund policy before making a purchase, please contact us:
                        </p>
                        <div className="bg-dark-bg p-4 rounded-md">
                            <p><strong>Email:</strong> support@datasellerpro.com</p>
                            <p><strong>Note:</strong> Contact us BEFORE purchasing if you have any doubts or questions</p>
                        </div>
                    </section>

                    <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-yellow-300 mb-3">Final Reminder</h3>
                        <p className="text-yellow-200 leading-relaxed">
                            By proceeding with any purchase on Data Seller Pro, you explicitly acknowledge that you have read, 
                            understood, and agree to this NO REFUND policy. All sales are final, and no refunds will be issued under any circumstances.
                        </p>
                    </div>

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

export default RefundPolicyPage;