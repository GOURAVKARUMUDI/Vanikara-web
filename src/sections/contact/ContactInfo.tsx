"use client";

import React from "react";
import Card, { CardBody } from "@/components/ui/Card";
import { Mail, MapPin, Phone, Clock, Linkedin, Github } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      
      {/* Office Details Card */}
      <Card hover>
        <CardBody className="space-y-6">
          <h3 className="font-display font-black text-sm uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--glass-border)] pb-3">
            Registered Company Details
          </h3>

          <div className="space-y-4">
            {/* Legal Entity Name */}
            <div className="text-xs">
              <span className="block font-bold text-[var(--text-primary)] uppercase tracking-wider text-[10px] mb-1">Company Name</span>
              <span className="text-[var(--text-primary)] font-extrabold text-sm">VANIKARA Intelligence Private Limited</span>
            </div>

            {/* Headquarters / Office Address */}
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-lg bg-slate-500/5 text-[var(--accent-color)] flex items-center justify-center shrink-0">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div className="text-xs">
                <span className="block font-bold text-[var(--text-primary)]">Registered Office</span>
                <span className="text-[var(--text-secondary)]">Andhra Pradesh, India</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-lg bg-slate-500/5 text-[var(--accent-color)] flex items-center justify-center shrink-0">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div className="text-xs">
                <span className="block font-bold text-[var(--text-primary)]">Email Address</span>
                <a href="mailto:vanikara26@gmail.com" className="text-[var(--accent-color)] hover:underline">
                  vanikara26@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-lg bg-slate-500/5 text-[var(--accent-color)] flex items-center justify-center shrink-0">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div className="text-xs">
                <span className="block font-bold text-[var(--text-primary)]">Phone Contact</span>
                <a href="tel:+919494326826" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  +91 94943 26826
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-lg bg-slate-500/5 text-[var(--accent-color)] flex items-center justify-center shrink-0">
                <Clock className="w-4.5 h-4.5" />
              </div>
              <div className="text-xs">
                <span className="block font-bold text-[var(--text-primary)]">Business Hours</span>
                <span className="text-[var(--text-secondary)]">Mon – Fri: 9:00 AM – 6:00 PM (IST)</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Interactive Map Mock */}
      <Card hover>
        <CardBody className="p-3">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#070b16] border border-white/5 flex items-center justify-center">
            {/* Styled Map frame */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.968662991054!2d80.198305!3d13.067439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzAyLjgiTiA4MMKwMTEnNTMuOSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, opacity: 0.65, filter: "grayscale(1) invert(0.9) contrast(1.1)" }}
              allowFullScreen={false}
              loading="lazy"
              title="VANIKARA HQ Map"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070b16]/65 to-transparent"></div>
            
            {/* Floating pin overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 border border-white shadow-lg animate-ping absolute" />
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 border border-white shadow-lg relative z-10" />
              <span className="mt-1.5 px-2.5 py-0.5 rounded bg-slate-900 border border-white/10 text-[8px] font-black uppercase text-white tracking-widest shadow-md">
                VANIKARA HQ
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

    </div>
  );
}
