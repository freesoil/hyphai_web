
import React from 'react';
import { ShieldCheck, Truck, Cog, MapPin, ClipboardCheck, Users, Info } from 'lucide-react';

export const STEPS = [
  { title: 'Configuration', icon: <Cog className="w-5 h-5" />, description: 'Find the exact specs for your seasonal crops.' },
  { title: 'Local Demo', icon: <MapPin className="w-5 h-5" />, description: 'See a similar unit working in local soil.' },
  { title: 'Custom Order', icon: <ClipboardCheck className="w-5 h-5" />, description: '20% deposit to lock in your build slot.' },
  { title: 'Build & Ship', icon: <Truck className="w-5 h-5" />, description: '60-day window with weekly photo updates.' },
  { title: '1-Acre Guarantee', icon: <ShieldCheck className="w-5 h-5" />, description: 'Performance proof or 100% refund.' }
];

export const DEMO_LOCATIONS = [
  { id: '1', lat: 45.1, lng: -122.3, crop: 'Organic Strawberries', machine: '2-Row Self-Powered Transplanter', nextDemo: 'Oct 15, 2024' },
  { id: '2', lat: 44.8, lng: -123.1, crop: 'Cabbage & Kale', machine: 'Towed Bed-Maker Pro', nextDemo: 'Oct 22, 2024' },
  { id: '3', lat: 45.5, lng: -122.9, crop: 'Specialty Melons', machine: 'Plastic Mulching Master', nextDemo: 'Nov 02, 2024' }
];
