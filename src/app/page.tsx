"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Smartphone,
  Globe,
  Mail,
  Linkedin,
  Cpu,
  Layers,
  Layout,
  Rocket,
  ChevronRight,
  Download
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const CardGlow = ({ children }: { children: React.ReactNode }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group p-[1px] rounded-[2.5rem] overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

const CharacterReveal = ({ text }: { text: string }) => {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1]
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const Reveal = ({ children, width = "fit-content" }: { children: React.ReactNode, width?: "fit-content" | "100%" }) => {
  return (
    <div className="relative" style={{ width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px", amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-navy-900 text-slate-200 selection:bg-accent/30 relative">


      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] rounded-full bg-blue-500/5 blur-[120px]"
        />
      </div>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-navy-900/80 backdrop-blur-md border-b border-navy-800"
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter text-white">KKPS</span>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="about" className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="flex-1 text-center md:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                Mobile Developer
              </motion.div>
              <motion.h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                <CharacterReveal text="Ko Ko Pyae Sone" />
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-400 mb-8 leading-relaxed max-w-2xl">
                Senior Android Developer with <span className="text-accent underline decoration-accent/30 font-semibold">8+ years</span> of experience
                building mission-critical mobile solutions for Government, Banking, HR, and NGOs.
                Currently based in <span className="text-white font-medium">Dubai</span>.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Magnetic>
                  <a href="#contact" className="bg-white text-navy-900 px-8 py-4 rounded-full font-bold hover:bg-accent transition-all text-center block">
                    Get in Touch
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#projects" className="border border-navy-700 px-8 py-4 rounded-full font-bold hover:bg-navy-800 transition-all text-white text-center block">
                    View Case Studies
                  </a>
                </Magnetic>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-64 h-64 md:w-96 md:h-96"
            >
              <div className="absolute inset-0 bg-accent blur-[60px] opacity-20 animate-pulse" />
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-navy-700/50 shadow-2xl transition-transform duration-700 skew-y-3 md:skew-y-6">
                <Image
                  src="/profile.jpg"
                  alt="Ko Ko Pyae Sone"
                  fill
                  className="object-cover -skew-y-3 md:-skew-y-6 scale-110"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6 border-t border-navy-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <h2 className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-12">
              Technical Arsenal
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Modern Android',
                icon: Smartphone,
                desc: 'Expertise in Kotlin, Coroutines, and Jetpack Compose for reactive UIs.' // [cite: 16, 19, 46]
              },
              {
                name: 'Architecture',
                icon: Layers,
                desc: 'Scalable systems using MVVM, MVI, and Hilt for dependency injection.' // 
              },
              {
                name: 'Multiplatform',
                icon: Globe,
                desc: 'Shared business logic and UI using KMM (Kotlin Multiplatform) and CMP and Flutter.' // [cite: 17]
              },
              {
                name: 'Infrastructure',
                icon: Cpu,
                desc: 'CI/CD with Jenkins, Git, and cloud synchronization via AWS AppSync.' // 
              }
            ].map((tech) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <CardGlow>
                  <div className="p-8 h-full rounded-[2.5rem] bg-navy-800/30 border border-navy-700/50 hover:border-accent/30 transition-all group backdrop-blur-sm relative z-10">
                    <tech.icon className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-3">{tech.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{tech.desc}</p>
                  </div>
                </CardGlow>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 px-6 border-t border-navy-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >
            <Reveal>
              <h2 className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-4">Case Studies</h2>
            </Reveal>
            <Reveal width="100%">
              <h3 className="text-4xl md:text-5xl font-bold text-white">Featured Projects</h3>
            </Reveal>
          </motion.div>

          <div className="grid grid-cols-1 gap-12">
            {/* SmartHR */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <CardGlow>
                <div className="group relative overflow-hidden rounded-[2.5rem] bg-navy-800/20 border border-navy-700/50 pointer-events-none p-6 md:p-16 hover:bg-navy-800/30 transition-all z-10">
                  <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="md:order-2">
                      <div className="flex items-center gap-2 text-accent mb-6 font-bold uppercase tracking-widest text-xs">
                        <Layers size={16} />
                        Enterprise HR
                      </div>
                      <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">SmartHR System</h4>
                      <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Revolutionized internal operations for <span className="text-white">KBZ Bank</span> by streamlining onboarding,
                        time tracking, and payroll processes. Built a highly intuitive interface following
                        <span className="text-white"> Material Design principles</span> to ensure seamless interaction for thousands of employees.
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {['Kotlin','Material Design', 'Onboarding', 'Payroll Systems', 'Workflow Optimization'].map(tag => (
                          <span key={tag} className="text-xs font-semibold px-4 py-2 rounded-full bg-navy-900 border border-navy-700/50 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="md:order-1 relative aspect-video rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform flex items-center justify-center p-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                      <div className="relative aspect-video w-full h-full rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform flex items-center justify-center p-4">
                        <Image
                          src="/smarthr_icon.png"
                          alt="KBZ Bank Logo"
                          width={400}
                          height={200}
                          className="object-contain max-w-full max-h-full"
                          priority
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </CardGlow>
            </motion.div>

            {/* KBZ Bank */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <CardGlow>
                <div className="group relative overflow-hidden rounded-[2.5rem] bg-navy-800/20 border border-navy-700/50 p-8 md:p-16 hover:bg-navy-800/30 transition-all z-10">
                  <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="flex items-center gap-2 text-accent mb-6 font-bold uppercase tracking-widest text-xs">
                        <Smartphone size={16} />
                        Mobile Banking
                      </div>
                      <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">KBZ Bank Digital Onboarding</h4>
                      <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Spearheaded the integration of <span className="text-white">OCR</span> and <span className="text-white">Facial Recognition</span> modules,
                        reducing customer acquisition time by 70% while ensuring top-tier security compliance.
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {['Kotlin', 'OCR', 'Biometrics', 'Security'].map(tag => (
                          <span key={tag} className="text-xs font-semibold px-4 py-2 rounded-full bg-navy-900 border border-navy-700/50 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative aspect-video rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
                      <div className="relative aspect-video w-full h-full rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform flex items-center justify-center p-4">
                        <Image
                          src="/kbz.png"
                          alt="KBZ Bank Logo"
                          width={400}
                          height={200}
                          className="object-contain max-w-full max-h-full"
                          priority
                        />
                      </div>
                      <div className="flex items-center justify-center h-full text-slate-700">
                        <span className="text-xs font-mono uppercase tracking-widest relative z-10">Confidential Banking App Visual</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardGlow>
            </motion.div>

            {/* QMS */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <CardGlow>
                <div className="group relative overflow-hidden rounded-[2.5rem] bg-navy-800/20 border border-navy-700/50 p-8 md:p-16 hover:bg-navy-800/30 transition-all z-10">
                  <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className=" relative aspect-video rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                      <div className="relative aspect-video w-full h-full rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform flex items-center justify-center p-4">
                        <Image
                          src="/qms_logo.png"
                          alt="DCS Mockup"
                          width={400}
                          height={200}
                          className="object-contain max-w-full max-h-full"
                          priority
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-accent mb-6 font-bold uppercase tracking-widest text-xs">
                        <Cpu size={16} />
                        Cloud Systems
                      </div>
                      <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">Queue Management System</h4>
                      <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Built from scratch using <span className="text-white">Jetpack Compose</span> and <span className="text-white">AWS AppSync</span>.
                        Designed for real-time synchronization across hundreds of devices in enterprise environments.
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {['Kotlin','Compose', 'AWS AppSync', 'GraphQL', 'Real-time'].map(tag => (
                          <span key={tag} className="text-xs font-semibold px-4 py-2 rounded-full bg-navy-900 border border-navy-700/50 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </CardGlow>
            </motion.div>

            {/* MBDR */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <CardGlow>
                <div className="group relative overflow-hidden rounded-[2.5rem] bg-navy-800/20 border border-navy-700/50 p-8 md:p-16 hover:bg-navy-800/30 transition-all z-10">
                  <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="md:order-1">
                      <div className="flex items-center gap-2 text-accent mb-6 font-bold uppercase tracking-widest text-xs">
                        <Globe size={16} />
                        Social Impact
                      </div>
                      <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">MBDR System</h4>
                      <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Partnered with <span className="text-white">UNICEF</span> to digitize Myanmar's birth and death registration.
                        Built an <span className="text-white">offline-first</span> architecture to handle intermittent connectivity in remote areas.
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {['Java', 'Synchronization', 'Offline-First', 'UNICEF'].map(tag => (
                          <span key={tag} className="text-xs font-semibold px-4 py-2 rounded-full bg-navy-900 border border-navy-700/50 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="md:order-2 relative aspect-video rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
                      <div className="relative aspect-video w-full h-full rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform flex items-center justify-center p-4">
                        <Image
                          src="/mbdr_logo.png"
                          alt="KBZ Bank Logo"
                          width={400}
                          height={200}
                          className="object-contain max-w-full max-h-full"
                          priority
                        />
                      </div>
                      <div className="flex items-center justify-center h-full text-slate-700">
                        <span className="text-xs font-mono uppercase tracking-widest relative z-10">Confidential Banking App Visual</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardGlow>
            </motion.div>

            {/* DCS */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <CardGlow>
                <div className="group relative overflow-hidden rounded-[2.5rem] bg-navy-800/20 border border-navy-700/50 p-8 md:p-16 hover:bg-navy-800/30 transition-all z-10">
                  <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="md:order-2">
                      <div className="flex items-center gap-2 text-accent mb-6 font-bold uppercase tracking-widest text-xs">
                        <Globe size={16} />
                        Legal & NGO Systems
                      </div>
                      <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">DCS (Data Collecting System)</h4>
                      <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Digitized court records for Myanmar's legal system in collaboration with NGOs. Handled complex data loads for Township, District, and Special Courts, streamlining case management for overworked personnel.
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {['Java', 'Realm', 'MVP', 'NGO Collaboration', 'Legal Systems'].map(tag => (
                          <span key={tag} className="text-xs font-semibold px-4 py-2 rounded-full bg-navy-900 border border-navy-700/50 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="md:order-1 relative aspect-video rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                      <div className="relative aspect-video w-full h-full rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform flex items-center justify-center p-4">
                        <Image
                          src="/dcs_logo.png"
                          alt="DCS Mockup"
                          width={400}
                          height={200}
                          className="object-contain max-w-full max-h-full"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardGlow>
            </motion.div>

            {/* Doctor Note */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <CardGlow>
                <div className="group relative overflow-hidden rounded-[2.5rem] bg-navy-800/20 border border-navy-700/50 p-8 md:p-16 hover:bg-navy-800/30 transition-all z-10">
                  <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="flex items-center gap-2 text-accent mb-6 font-bold uppercase tracking-widest text-xs">
                        <Smartphone size={16} />
                        Healthcare Management
                      </div>
                      <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">Doctor Note</h4>
                      <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Developed in partnership with PSI Myanmar to transform clinic workflows from paper to digital. Empowered clinicians with secure patient registration, health records, and appointment management tools.
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {['Java', 'Healthcare IT', 'MVP', 'Patient Management', 'Security'].map(tag => (
                          <span key={tag} className="text-xs font-semibold px-4 py-2 rounded-full bg-navy-900 border border-navy-700/50 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative aspect-video rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform">
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
                      <div className="relative aspect-video w-full h-full rounded-2xl bg-navy-900/50 overflow-hidden border border-navy-700/50 group-hover:scale-[1.02] transition-transform flex items-center justify-center p-4">
                        <Image
                          src="/ic_launcher.png"
                          alt="Doctor Note Mockup"
                          width={400}
                          height={200}
                          className="object-contain max-w-full max-h-full"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardGlow>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 px-6 border-t border-navy-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >
            <Reveal>
              <h2 className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-4">Academic Background</h2>
            </Reveal>
            <Reveal width="100%">
              <h3 className="text-4xl md:text-5xl font-bold text-white">Education</h3>
            </Reveal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-navy-800/20 border border-navy-700/50 hover:bg-navy-800/30 transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">Bachelor of Computer Science</h4>
                <p className="text-accent font-semibold text-lg">Computer University (Meikhtila)</p>
              </div>
              <div className="px-6 py-2 rounded-full bg-navy-900 border border-navy-700/50 text-slate-300 font-mono text-sm">
                2011 — 2015
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-navy-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              className="mb-16"
            >
              <Reveal width="100%">
                <h2 className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-4">Let's Collaborate</h2>
              </Reveal>
              <Reveal width="100%">
                <h3 className="text-5xl md:text-8xl font-bold text-white mb-12 tracking-tight">Available for <br /> new challenges.</h3>
              </Reveal>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:kokopyaesone.developer@gmail.com"
                className="group flex items-center justify-center gap-3 bg-white text-navy-900 px-12 py-6 rounded-full font-bold hover:bg-accent transition-all text-xl w-full md:w-auto"
              >
                <Mail size={24} />
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/ko-ko-pyae-sone-6a4286143/"
                className="group flex items-center justify-center gap-3 border border-navy-700 px-12 py-6 rounded-full font-bold hover:bg-navy-800 transition-all text-xl text-white w-full md:w-auto"
              >
                <Linkedin size={24} />
                LinkedIn
              </a>
              <a
                href="/koko.pdf"
                download
                className="group flex items-center justify-center gap-3 border border-accent/30 text-accent px-12 py-6 rounded-full font-bold hover:bg-accent/10 transition-all text-xl w-full md:w-auto"
              >
                <Download size={24} />
                Download CV
              </a>
            </div>
          </motion.div>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-navy-800/50 text-center">
        <p className="text-slate-500 text-sm">
          &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Ko Ko Pyae Sone. Built with Next.js & Tailwind CSS.
        </p>
      </footer>
    </main>
  );
}
