import { Card } from "@/components/card/Card";
import React, { JSX, useEffect } from "react";
import { FC } from "react";
import { FaChartLine, FaClipboardList, FaUserCircle } from "react-icons/fa";
import "../../components/fonts/font.css"
import 'aos/dist/aos.css';
import AOS from 'aos';

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  headline: string;
  description: string;
  className?: string;
}

const FeatureCard: FC<FeatureProps> = ({ icon, title, headline, description, className }) => (
  <Card className={`p-6 text-center ${className}`}>
    <div className="flex justify-center items-center mb-4 text-3xl">{icon}</div>
    <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
    <h2 className="text-lg font-[Klapt] font-bold  text-gray-900 mt-2">{headline}</h2>
    <p className="text-gray-600 mt-2 text-sm">{description}</p>
  </Card>
);

const BusinessTasks: FC = () => {

      useEffect(() => {
        AOS.init({
          duration: 3000,
          delay: 200,
          easing: 'ease-in-out',
          once: true
        });
      }, []);
      
    
  return (
    <section
    data-aos="fade-up"
    data-aos-duration="1000"
    id="service" className="text-center py-12 px-4 bg-white"
    >
      <h1 className="text-3xl font-[Klapt] font-bold text-gray-900">Simplify everyday business tasks.</h1>
      <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
        Because you’d probably be a little confused if we suggested you complicate your everyday business tasks instead.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
        <FeatureCard
          icon={<FaChartLine className="text-blue-500" />}
          title="Reporting"
          headline="Keep track of everything with continuously updated reporting features"
          description="We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity."
        />

        <FeatureCard
          icon={<FaClipboardList className="text-gray-500" />}
          title="Inventory"
          headline="Stay informed about your stock levels with precise inventory tracking."
          description="We don’t offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure."
        />

        <FeatureCard
          icon={<FaUserCircle className="text-gray-500" />}
          title="Contacts"
          headline="Organize all of your contacts, service providers, and invoices in one place."
          description="This also isn’t actually a feature, it’s just some friendly advice. We definitely recommend that you do this, you’ll feel really organized and professional."
        />
      </div>
    </section>
  );
};

export default BusinessTasks;
