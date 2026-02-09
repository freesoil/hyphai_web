
import React from 'react';

export const SafetyPage: React.FC = () => {
  return (
    <div className="bg-white py-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto prose lg:prose-lg">
        <h1>Safety Information</h1>
        <p className="lead">
          Your safety is our top priority. Our machines are designed and built with numerous safety features to protect operators and those nearby. This page provides general safety guidelines. Always refer to the specific operator's manual for your machine for complete safety information.
        </p>
        
        <h2>General Operating Procedures</h2>
        <ul>
          <li><strong>Training:</strong> Never operate machinery without proper training. Understand all controls and functions before starting.</li>
          <li><strong>Inspection:</strong> Before each use, perform a thorough pre-operation inspection. Check for loose parts, hydraulic leaks, and damaged components.</li>
          <li><strong>Clear Area:</strong> Ensure the operating area is clear of bystanders, animals, and obstacles before starting the engine or engaging any mechanisms.</li>
          <li><strong>PTO Safety:</strong> Ensure the Power Take-Off (PTO) shield is always in place. Never approach a rotating PTO shaft.</li>
          <li><strong>Guards and Shields:</strong> Keep all factory-installed guards, shields, and safety decals in place. Do not operate a machine if any guards are missing or damaged.</li>
        </ul>

        <h2>Maintenance Safety</h2>
        <ul>
          <li><strong>Shut Down Engine:</strong> Always turn off the engine, remove the key, and wait for all moving parts to stop before performing any maintenance, cleaning, or repairs.</li>
          <li><strong>Hydraulic Pressure:</strong> Relieve all hydraulic pressure before disconnecting lines or performing work on the hydraulic system.</li>
          <li><strong>Lifting and Blocking:</strong> Use appropriate lifting equipment and securely block any raised components before working underneath them.</li>
        </ul>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-800 p-4 mt-8">
          <p className="font-bold">Disclaimer</p>
          <p>This is placeholder safety information and is not a substitute for the official documentation provided with your equipment. The manufacturer's operation and maintenance manual contains detailed and specific safety instructions that must be followed. Hyphai assumes no liability for incidents arising from failure to follow prescribed safety procedures.</p>
        </div>
      </div>
    </div>
  );
};
