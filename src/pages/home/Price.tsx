import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import "../../components/fonts/font.css"
import 'aos/dist/aos.css';

const PricingSection = () => {
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 3000,
      delay: 200,
      easing: 'ease-in-out',
      once: true
    });
  }, []);
  

  const plans = [
    {
      name: "Hello ",
      price: 4,
      yearlyPrice: 48,
      features: [
        "All Hello modules are activated",
        "Accessible from any connected device",
        "Maintenance",
        "Limited number of users",
        "Limited storage",
        "Limited chatbot conversations",
        "24/7 availability"
      ]
    },
    {
      name: "Hello PLUS",
      price: 9,
      yearlyPrice: 108,
      features: [
        "All ERP Hello modules are activated",
        "Accessible from any connected device",
        "Maintenance",
        "Limited number of users",
        "Limited storage",
        "Limited chatbot conversations",
        "24/7 availability"
      ],
      highlighted: true
    },
    {
      name: "Premium",
      price: 13,
      yearlyPrice: 156,
      features: [
        "All Hello modules are activated",
        "Accessible from any connected device",
        "Maintenance",
        "Unlimited number of users",
        "Unlimited storage",
        "Unlimited chatbot conversations",
        "24/7 availability"
      ]
    }
  ];

  return (
    <div  className="bg-gray-50 py-16 px-4 "
     data-aos="fade-up"
     data-aos-duration="1000"
    
    >
      <div id="price" className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4 font-[Klapt]">Custom Pricing Plans</h2>
          <p className="text-gray-600">
            ERP Hello offers  ERP CRM online with a fixed cost, regardless of the applications used.
          </p>
          
          <div  className="flex items-center justify-center mt-6 gap-4">
            <span className={`text-sm ${!isAnnualBilling ? 'text-[#7367f0]' : 'text-gray-600'}`}>
              Monthly payment
            </span>
            <button
              onClick={() => setIsAnnualBilling(!isAnnualBilling)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-800"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isAnnualBilling ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnualBilling ? 'text-[#7367f0]' : 'text-gray-600'}`}>
              Annual payment
            </span>
          </div>
        </div>

        <div  className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-8 ${
                plan.highlighted
                  ? 'ring-2 ring-blue-800 shadow-lg scale-105'
                  : 'border border-gray-200'
              }`}
            >
              <h3 className="text-xl font-[Klapt] font-semibold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$ {isAnnualBilling ? plan.yearlyPrice : plan.price}</span>
                <span className="text-gray-600 ml-2">{isAnnualBilling ? "/year" : "/month"}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start ">
                    <svg
                      className="h-5 w-5 text-[#7367f0] mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full font-[Klapt] py-3 px-4 rounded-lg font-medium ${
                  plan.highlighted
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'text-gray-600 border border-gray-800 hover:bg-gray-50'
                }`}
              >
                Install now
              </button>
              
              {!plan.highlighted && (
                <p className="text-xs text-gray-500 text-center mt-4">
                  Free trial (30 days or more, no commitment)
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
