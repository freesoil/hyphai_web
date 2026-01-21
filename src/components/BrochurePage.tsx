
import React from 'react';
import { machines } from '../machineData';
import { Machine } from '../types';
import { Tractor, Mail, Phone, Settings, CheckSquare } from 'lucide-react';

const BrochurePage: React.FC = () => {
  const featuredTransplanter = machines.find(m => m.model === '2ZBZ-1 / 2ZBZ-2');
  const featuredRidgingMachine = machines.find(m => m.model === '双垄起垄机带覆膜功能');

  const allInOneMachine: Machine = {
    type: 'Transplanter',
    category: 'All-in-One',
    name: 'All-in-One Land Prep & Transplant System',
    model: 'HY-AIO-4',
    specs: {
        'Functions': 'Ridging, Drip Line Laying, Pelleted Fertilizing, Transplanting',
        'Rows': '2 or 4, customizable',
        'Required Power': '≥90 horsepower',
    },
    features: 'A fully integrated solution that performs ridging, lays drip irrigation lines, applies pelleted fertilizer, and transplants seedlings in a single pass. Maximize your efficiency and reduce field preparation time significantly.',
    imageUrls: ['/media/pineapple_transplanter/菠萝四行起垄覆膜移栽施肥一体机5.jpg'], // Changed image
  };

  const renderMachine = (machine?: Machine) => {
    if (!machine) return null;
    let imageUrl = machine.imageUrls.find(url => url.endsWith('.jpg'));
    // Fallback if no JPG is found, or for specific machines
    if (machine.model === '2ZBZ-1 / 2ZBZ-2') {
        imageUrl = '/media/self_propelled_transplanter/微信图片_20241225191128.jpg'; // Specific new image
        // imageUrl = '/media/three_four_row_transplanter/变速箱移栽机三行带覆膜功能3.jpg'; // Specific new image
    } else if (machine.model === '双垄起垄机带覆膜功能') {
        imageUrl = '/media/ridging_machine/双垄覆膜一体机.jpg'; // Specific new image
    } else if (machine.model === 'HY-AIO-4') {
        imageUrl = '/media/ridge_transplant.png'; // Specific new image
    }
    if (!imageUrl) imageUrl = machine.imageUrls[0]; // Fallback to first if still nothing

    return (
        <div key={machine.model} className="machine-card-brochure">
        <img 
            src={imageUrl} 
            alt={machine.name} 
            className="machine-image-brochure" 
        />
        <div className="machine-info-brochure">
            <h3>{machine.name}</h3>
            <p className="machine-features-brochure">{machine.features}</p>
        </div>
        </div>
    );
  }

  return (
    <div className="brochure-container-brochure">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        @media print {
          @page { size: A4; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          .brochure-container-brochure, .brochure-container-brochure * { visibility: visible; }
          .brochure-container-brochure { position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden; }
          .machine-card-brochure, .customization-section-brochure { page-break-inside: avoid; }
          .footer-brochure { position: fixed; bottom: 0; width: 100%; }
        }
        .brochure-container-brochure {
          font-family: 'Poppins', sans-serif;
          background-color: #f8f9fa;
          padding: 2rem;
          color: #343a40;
          max-width: 1200px;
          margin: auto;
        }
        .header-brochure {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2.5rem 2rem;
          background: linear-gradient(45deg, #2E7D32, #4CAF50);
          color: white;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .header-brochure h1 {
          font-size: 2.8rem;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .header-brochure p {
          font-size: 1.2rem;
          margin-top: 0.75rem;
          opacity: 0.95;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .section-title-brochure {
          font-size: 2rem;
          font-weight: 600;
          color: #2E7D32;
          text-align: center;
          margin-bottom: 2.5rem;
          position: relative;
        }
        .section-title-brochure::after {
          content: '';
          width: 70px;
          height: 4px;
          background: #4CAF50;
          border-radius: 2px;
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
        }
        .machine-grid-brochure {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .machine-card-brochure {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .machine-card-brochure:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .machine-image-brochure {
          width: 100%;
          height: 480px;
          object-fit: cover;
        }
        .machine-info-brochure {
          padding: 1.5rem;
          flex-grow: 1;
        }
        .machine-info-brochure h3 {
          font-size: 1.4rem;
          font-weight: 600;
          color: #343a40;
          margin: 0 0 0.5rem 0;
        }
        .machine-model-brochure {
          font-size: 0.9rem;
          font-weight: 600;
          color: #6c757d;
          margin-bottom: 1rem;
        }
        .machine-features-brochure {
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .customization-section-brochure {
            background: #e8f5e9;
            padding: 2.5rem;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 3rem;
        }
        .customization-section-brochure .lucide-settings {
            color: #4CAF50;
        }
        .customization-section-brochure h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #2E7D32;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
        }
        .footer-brochure {
          text-align: center;
          padding: 2rem;
          background: #343a40;
          color: white;
          border-radius: 12px 12px 0 0;
        }
        .footer-brochure h2 {
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }
        .contact-info-brochure {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }
        .contact-item-brochure {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
      `}</style>
      
      <div className="header-brochure">
        <h1><Tractor size={42} /> Hyphai Agricultural Technology</h1>
        <p>Pioneering Smart, Durable, and Efficient Machinery to Revolutionize Your Farming Operations.</p>
      </div>

      <div>
        <h2 className="section-title-brochure">Our All-in-One Solution</h2>
        <div className="machine-grid-brochure" style={{gridTemplateColumns: '1fr'}}>
          {renderMachine(allInOneMachine)}
        </div>
      </div>
      
      <div className="customization-section-brochure">
        <h2><Settings size={32} />Bespoke Machinery Solutions</h2>
        <p>Your farm is unique. Your machinery should be too. We specialize in customizing our equipment to meet your specific crops, terrain, and operational needs. Contact us to design your perfect solution.</p>
      </div>

      <div>
        <h2 className="section-title-brochure">Featured Standard Machines</h2>
        <div className="machine-grid-brochure">
          {renderMachine(featuredTransplanter)}
          {renderMachine(featuredRidgingMachine)}
        </div>
      </div>

      <div className="footer-brochure">
        <h2>Ready to Boost Your Productivity?</h2>
        <p>Contact our experts for a personalized quote and discover the perfect machine for your needs.</p>
        <div className="contact-info-brochure">
            <div className="contact-item-brochure"><Mail size={20} /> info@hyphai-agri.com</div>
            <div className="contact-item-brochure"><Phone size={20} /> +1 (555) 123-4567</div>
        </div>
      </div>
    </div>
  );
};

export default BrochurePage;
