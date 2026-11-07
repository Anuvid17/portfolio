/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Check,
  Sparkles,
  BookOpen,
  Briefcase,
  Code,
  Layers,
  ArrowUp,
  Cpu,
  GraduationCap,
  Copy,
  Terminal,
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [emailInput, setEmailInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for nav styling and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll only when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      showToast(`Thank you! Reach out directly at anuvidmishra200417@gmail.com`);
      window.location.href = `mailto:anuvidmishra200417@gmail.com?subject=Connecting%20via%20Nexum%20Portfolio&body=Hi%20Anuvid,%0A%0AMy%20email%20is%20${encodeURIComponent(emailInput.trim())}.%20Let's%20connect!`;
      setEmailInput('');
    } else {
      window.location.href = `mailto:anuvidmishra200417@gmail.com?subject=Let's%20Connect&body=Hi%20Anuvid,`;
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('anuvidmishra200417@gmail.com');
    setCopied(true);
    showToast('Copied anuvidmishra200417@gmail.com to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects', hasChevron: true },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black select-none overflow-x-hidden font-sans">
      {/* Background Video (Fixed across all sections for continuous cinematic feel) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 h-full w-full object-cover -z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
      />

      {/* Persistent Sticky / Fixed Glass Top Bar Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-black/50 backdrop-blur-xl border-b border-white/10 py-3.5 px-5 sm:px-8 lg:px-12 shadow-xl'
            : 'bg-transparent py-5 sm:py-6 px-5 sm:px-8 lg:px-12'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo icon + name: #F5F0E6 */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer group transition-opacity hover:opacity-85 text-left"
          >
            {/* Nexum Geometric Logo SVG in #F5F0E6 */}
            <svg
              className="w-6 h-6 text-[#F5F0E6] fill-[#F5F0E6] drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 256 256"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-[#F5F0E6] drop-shadow-sm">
              Anuvid Mishra.
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {/* Light nav pill container with #171717 navigation links & White on Black active */}
            <nav className="flex items-center gap-1 rounded-full px-1.5 py-1.5 backdrop-blur-xl bg-white/80 border border-white/60 shadow-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all cursor-pointer ${isActive
                        ? 'bg-[#171717] text-[#FFFFFF] font-bold shadow-sm'
                        : 'text-[#171717] hover:bg-black/10'
                      }`}
                  >
                    <span>{item.label}</span>
                    {item.hasChevron && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFFFFF]' : 'text-[#171717]'}`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Separate Primary CTA Pill with CTA text: #FFFFFF */}
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold bg-[#171717] text-[#FFFFFF] hover:bg-black transition-all cursor-pointer border border-white/20 shadow-md"
            >
              Let's Connect
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden relative h-10 w-10 rounded-full backdrop-blur-xl bg-white/80 border border-white/60 flex items-center justify-center z-50 cursor-pointer overflow-hidden text-[#171717] shadow-sm"
          >
            <Menu
              className={`w-5 h-5 absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Glass Overlay + Slide-in Drawer */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      <aside
        className={`fixed right-0 top-0 z-40 h-full w-72 bg-white/95 backdrop-blur-2xl border-l border-white/60 flex flex-col md:hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="px-6 pt-24 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                transitionDelay: mobileMenuOpen ? `${(index + 1) * 50}ms` : '0ms',
              }}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-all duration-300 ${activeSection === item.id
                  ? 'bg-[#171717] text-[#FFFFFF] font-bold shadow-sm'
                  : 'text-[#171717] hover:bg-black/10'
                } ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
            >
              <span>{item.label}</span>
              {item.hasChevron && (
                <ChevronDown className={`w-4 h-4 ${activeSection === item.id ? 'text-[#FFFFFF]' : 'text-[#171717]'}`} />
              )}
            </button>
          ))}
        </div>

        <div className="mt-auto px-6 pb-10">
          <button
            onClick={() => scrollToSection('contact')}
            className={`w-full rounded-full py-3.5 text-sm font-semibold bg-[#171717] text-[#FFFFFF] hover:bg-black transition-all duration-400 shadow-lg ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Let's Connect
          </button>
        </div>
      </aside>

      {/* Main Sections Container */}
      <main className="relative z-10 flex flex-col w-full">
        {/* ========================================================= */}
        {/* SECTION 1: HERO LANDING */}
        {/* ========================================================= */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-between pt-28 pb-14 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full"
        >
          <div className="hidden lg:block h-6" />

          {/* Bottom-Anchored Hero Content */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 w-full mt-auto">
            {/* Left Column: Aspire Badge + Main Headline (#F5F0E6) + Supporting Description (#E5D8C5) + Email CTA */}
            <div className="max-w-xl">
              {/* Aspire to be AI/ML Developer badge with Small label color: #6B5D4B */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-white/80 backdrop-blur-md border border-white/60 text-[#6B5D4B] mb-3 sm:mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#6B5D4B]" />
                <span>Aspire to be AI/ML Developer</span>
              </div>

              {/* Main Headline: #F5F0E6 */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-[#F5F0E6] drop-shadow-md">
                Building Intelligent AI Systems That Solve Real-World Problems.
              </h1>

              {/* Supporting Description: #E5D8C5 */}
              <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-[#E5D8C5] drop-shadow-sm">
                Aspire to be AI/ML Developer specializing in Generative AI, NLP, LLMs, and Reinforcement Learning.
              </p>

              {/* Email CTA */}
              <div className="mt-6 sm:mt-8">
                <form
                  onSubmit={handleConnect}
                  className="flex items-center rounded-full p-1.5 shadow-lg bg-white/85 backdrop-blur-xl border border-white/60 w-full sm:w-auto max-w-md sm:inline-flex"
                >
                  {/* Email Placeholder: #777777 */}
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 min-w-0 bg-transparent px-3.5 sm:px-5 py-2 sm:py-2 text-xs sm:text-sm text-[#171717] placeholder-[#777777] font-medium outline-none sm:w-64"
                  />
                  {/* CTA text: #FFFFFF on dark cylindrical pill */}
                  <button
                    type="submit"
                    className="shrink-0 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-[#171717] text-[#FFFFFF] hover:bg-black transition-all cursor-pointer shadow-sm whitespace-nowrap"
                  >
                    Let's Connect
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Two Glass Cards */}
            <div className="flex flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5 w-full sm:w-auto">
              {/* Card 1 – Technical Expertise (Skills card text: #24211C, Small labels: #6B5D4B) */}
              <div
                onClick={() => scrollToSection('skills')}
                className="rounded-2xl bg-white/45 backdrop-blur-xl p-5 sm:p-6 sm:w-64 flex flex-col justify-between border border-white/60 shadow-xl cursor-pointer hover:bg-white/55 active:scale-[0.99] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#171717] text-[#FFFFFF] shadow-sm">
                      AI / ML
                    </span>
                    <span className="text-xs text-[#24211C] font-bold hover:underline transition-colors flex items-center gap-1">
                      View Matrix ↓
                    </span>
                  </div>

                  <div className="mt-4">
                    {/* Small labels: #6B5D4B */}
                    <div className="text-xs uppercase tracking-wider font-bold text-[#6B5D4B]">
                      Areas of Focus
                    </div>
                  </div>

                  {/* Skills card text: #24211C */}
                  <p className="text-xs sm:text-sm leading-relaxed mt-2.5 text-[#24211C] font-medium">
                    NLP · Generative AI · Transformers · LLMs · Reinforcement Learning · RAG
                  </p>
                </div>

                {/* Small labels / tech stack: #6B5D4B */}
                <div className="pt-3 border-t border-black/15 mt-4 text-xs text-[#6B5D4B] font-mono font-semibold">
                  Python · PyTorch · FastAPI · Hugging Face
                </div>
              </div>

              {/* Card 2 – Featured Project (ProductIQ card text: #24211C, Small labels: #6B5D4B) */}
              <div
                onClick={() => scrollToSection('projects')}
                className="rounded-2xl bg-white/45 backdrop-blur-xl p-5 sm:p-6 sm:w-64 flex flex-col justify-between border border-white/60 shadow-xl cursor-pointer hover:bg-white/55 active:scale-[0.99] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#171717] flex items-center justify-center text-[#FFFFFF] font-bold text-xs shadow-inner">
                        P
                      </div>
                      {/* ProductIQ card text: #24211C */}
                      <span className="text-sm font-bold text-[#24211C]">
                        ProductIQ
                      </span>
                    </div>
                    {/* Small labels: #6B5D4B */}
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/80 border border-black/10 text-[#6B5D4B] shadow-sm">
                      Featured
                    </span>
                  </div>

                  {/* Small labels: #6B5D4B */}
                  <div className="text-xs text-[#6B5D4B] mb-2 font-bold">
                    AI-Driven Product Feedback Intelligence Platform
                  </div>

                  {/* ProductIQ card text: #24211C */}
                  <p className="text-xs sm:text-sm leading-relaxed text-[#24211C] font-medium">
                    Built an LLM-powered system using Llama 3.1 to classify customer feedback, prioritize issues, and automate roadmap generation.
                  </p>

                  {/* Small labels: #6B5D4B */}
                  <div className="mt-2 text-[11px] text-[#6B5D4B] font-mono font-semibold">
                    Python · FastAPI · Llama 3.1 · PostgreSQL · React
                  </div>
                </div>

                <div className="mt-4 sm:mt-5 pt-3 border-t border-black/15 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://github.com/Anuvid17.png"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/72?img=12';
                      }}
                      alt="Anuvid Mishra"
                      className="w-8 h-8 rounded-full object-cover bg-white/20 border border-black/20 shadow-sm"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#24211C] leading-tight">
                        Anuvid Mishra
                      </div>
                      <div className="text-[10px] text-[#6B5D4B] leading-tight font-medium">
                        Aspire to be AI/ML Dev
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* CTA text: #FFFFFF */}
                    <a
                      href="https://productiq-frontend-2x15.onrender.com/dashboard"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-bold flex items-center gap-1 transition-colors px-2 py-1 rounded bg-[#171717] text-[#FFFFFF] hover:bg-black shadow-sm"
                    >
                      Live <ExternalLink className="w-2.5 h-2.5 text-[#FFFFFF]" />
                    </a>
                    <a
                      href="https://github.com/Anuvid17"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-bold text-[#24211C] hover:underline flex items-center gap-1 transition-colors px-1.5 py-1 rounded hover:bg-black/10"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle scroll down indicator */}
          <div className="flex justify-center pt-8">
            <button
              onClick={() => scrollToSection('about')}
              className="flex items-center gap-2 text-xs font-bold transition-all cursor-pointer px-4 py-1.5 rounded-full border border-white/60 bg-white/80 backdrop-blur-xl text-[#171717] hover:bg-white shadow-md"
            >
              <span>Explore Portfolio Details</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#171717] animate-bounce" />
            </button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: ABOUT ME */}
        {/* ========================================================= */}
        <section id="about" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]">
            <div className="flex items-center gap-2 mb-4">
              {/* Small labels: #6B5D4B */}
              <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                About Me
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#24211C]">
                  Passionate About Transforming Complex AI Research into Scalable Real-World Applications.
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-[#24211C]/90 font-medium">
                  I'm Anuvid Mishra, an AI/ML developer currently pursuing a Master of Computer Applications in Generative AI at Alliance University, Bangalore.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-[#24211C]/90 font-medium">
                  I enjoy building intelligent applications using Machine Learning, NLP, Large Language Models, and Reinforcement Learning. My work focuses on transforming complex problems into practical AI-powered solutions, from fine-tuning transformer models to developing intelligent feedback prioritization systems.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white/60 border border-white/70 rounded-2xl p-4 sm:p-5 w-full lg:w-auto shadow-sm">
                <img
                  src="https://github.com/Anuvid17.png"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/72?img=12';
                  }}
                  alt="Anuvid Mishra"
                  className="w-16 h-16 rounded-2xl object-cover border border-black/15 shadow-md"
                />
                <div>
                  <div className="text-lg font-bold text-[#24211C]">Anuvid Mishra</div>
                  <div className="text-xs text-[#6B5D4B] font-semibold">Aspire to be AI/ML Developer</div>
                  <div className="text-xs text-[#24211C] font-mono font-bold mt-1">Alliance University, Bangalore</div>
                </div>
              </div>
            </div>

            {/* Quick Core Focus Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-black/15">
              <div className="bg-white/60 rounded-2xl p-4 border border-white/70 shadow-sm">
                <div className="text-xs text-[#6B5D4B] uppercase tracking-wider font-bold">Specialization</div>
                <div className="text-base font-bold text-[#24211C] mt-1">Generative AI & LLMs</div>
                <div className="text-xs text-[#24211C]/80 font-medium mt-1">Llama 3.1, FLAN-T5 fine-tuning, Prompt Engineering & RAG</div>
              </div>
              <div className="bg-white/60 rounded-2xl p-4 border border-white/70 shadow-sm">
                <div className="text-xs text-[#6B5D4B] uppercase tracking-wider font-bold">Decision Intelligence</div>
                <div className="text-base font-bold text-[#24211C] mt-1">RL & Deep Q-Networks</div>
                <div className="text-xs text-[#24211C]/80 font-medium mt-1">Transformer embeddings combined with DQN for smart prioritization</div>
              </div>
              <div className="bg-white/60 rounded-2xl p-4 border border-white/70 shadow-sm">
                <div className="text-xs text-[#6B5D4B] uppercase tracking-wider font-bold">Full Stack ML</div>
                <div className="text-base font-bold text-[#24211C] mt-1">FastAPI & Modern React</div>
                <div className="text-xs text-[#24211C]/80 font-medium mt-1">Production-ready API servers and high-response user interfaces</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: FEATURED PROJECTS */}
        {/* ========================================================= */}
        <section id="projects" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                Portfolio Projects
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F0E6] mt-2 drop-shadow-sm">
                Featured AI & Machine Learning Systems
              </h2>
            </div>
            {/* CTA text: #FFFFFF */}
            <a
              href="https://github.com/Anuvid17"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all w-fit shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
            >
              <span>Explore All on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FFFFFF]" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project 1: Adaptive Product Feedback Prioritization */}
            <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] shadow-sm">
                    50.93% Acc · 0.4735 F1
                  </span>
                  <span className="text-xs text-[#6B5D4B] font-mono font-bold">RL & DQN</span>
                </div>

                <h3 className="text-lg font-bold text-[#24211C] mb-2">
                  Adaptive Product Feedback Prioritization
                </h3>

                <ul className="text-xs sm:text-sm text-[#24211C]/90 font-medium space-y-2 list-disc list-inside leading-relaxed">
                  <li>Transformer embeddings combined with Deep Q-Network reinforcement learning.</li>
                  <li>Evaluated on 1,500 software issues.</li>
                  <li>Achieved 50.93% accuracy and 0.4735 weighted F1 score.</li>
                </ul>
              </div>

              <div className="pt-5 border-t border-black/15 mt-6 space-y-3">
                <div className="text-[11px] text-[#6B5D4B] font-mono font-bold">
                  Python · PyTorch · Transformers · DQN
                </div>

                <div className="flex items-center gap-2.5">
                  {/* CTA text: #FFFFFF */}
                  <a
                    href="https://rl-prioritization-frontend.onrender.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
                  </a>
                  <a
                    href="https://github.com/Anuvid17"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 bg-white/80 text-[#171717] hover:bg-white border border-black/15 shadow-sm"
                  >
                    <Github className="w-3 h-3 text-[#171717]" />
                    <span>Repo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2: ProductIQ (ProductIQ card text: #24211C, Small labels: #6B5D4B) */}
            <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] shadow-sm">
                    Llama 3.1 Powered
                  </span>
                  <span className="text-xs text-[#6B5D4B] font-mono font-bold">Production</span>
                </div>

                <h3 className="text-lg font-bold text-[#24211C] mb-2">
                  ProductIQ – AI Product Feedback Intelligence
                </h3>

                <ul className="text-xs sm:text-sm text-[#24211C]/90 font-medium space-y-2 list-disc list-inside leading-relaxed">
                  <li>LLM-based customer feedback classification and prioritization.</li>
                  <li>Automated roadmap generation and developer task creation.</li>
                  <li>Implemented structured output validation and semantic duplicate detection.</li>
                </ul>
              </div>

              <div className="pt-5 border-t border-black/15 mt-6 space-y-3">
                <div className="text-[11px] text-[#6B5D4B] font-mono font-bold">
                  Python · FastAPI · Llama 3.1 · PostgreSQL · React
                </div>

                <div className="flex items-center gap-2.5">
                  {/* CTA text: #FFFFFF */}
                  <a
                    href="https://productiq-frontend-2x15.onrender.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                  >
                    <span>Live Dashboard</span>
                    <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
                  </a>
                  <a
                    href="https://github.com/Anuvid17"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 bg-white/80 text-[#171717] hover:bg-white border border-black/15 shadow-sm"
                  >
                    <Github className="w-3 h-3 text-[#171717]" />
                    <span>Repo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3: AI Grammar Correction */}
            <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] shadow-sm">
                    0.6869 BLEU · 0.8748 ROUGE
                  </span>
                  <span className="text-xs text-[#6B5D4B] font-mono font-bold">Fine-Tuned</span>
                </div>

                <h3 className="text-lg font-bold text-[#24211C] mb-2">
                  AI Grammar Correction – Fine-Tuned FLAN-T5
                </h3>

                <ul className="text-xs sm:text-sm text-[#24211C]/90 font-medium space-y-2 list-disc list-inside leading-relaxed">
                  <li>Fine-tuned FLAN-T5-base on 100,000 sentence pairs.</li>
                  <li>Achieved 0.6869 BLEU and 0.8748 ROUGE-L generation quality.</li>
                  <li>Developed a full FastAPI and React web application.</li>
                </ul>
              </div>

              <div className="pt-5 border-t border-black/15 mt-6 space-y-3">
                <div className="text-[11px] text-[#6B5D4B] font-mono font-bold">
                  FLAN-T5 · Hugging Face · FastAPI · React
                </div>

                <div className="flex items-center gap-2.5">
                  {/* CTA text: #FFFFFF */}
                  <a
                    href="https://huggingface.co/spaces/anuvid/ai-grammar-correction"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                  >
                    <span>Hugging Face Space</span>
                    <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
                  </a>
                  <a
                    href="https://github.com/Anuvid17"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 bg-white/80 text-[#171717] hover:bg-white border border-black/15 shadow-sm"
                  >
                    <Github className="w-3 h-3 text-[#171717]" />
                    <span>Repo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: TECHNICAL SKILLS MATRIX (Skills card text: #24211C, Small labels: #6B5D4B) */}
        {/* ========================================================= */}
        <section id="skills" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
              Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F0E6] mt-2 drop-shadow-sm">
              Technical Skills & AI Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                category: 'AI & Machine Learning',
                icon: Cpu,
                items: ['NLP', 'Transformers', 'LLMs', 'DQN', 'BERT', 'RAG'],
              },
              {
                category: 'Programming Languages',
                icon: Terminal,
                items: ['Python', 'C', 'C++', 'SQL'],
              },
              {
                category: 'Frameworks',
                icon: Layers,
                items: ['FastAPI', 'Django', 'Flask', 'React', 'Angular'],
              },
              {
                category: 'Libraries & Toolkits',
                icon: Code,
                items: ['PyTorch', 'Scikit-learn', 'Hugging Face'],
              },
              {
                category: 'Databases & Storage',
                icon: BookOpen,
                items: ['PostgreSQL', 'MySQL', 'SQLite'],
              },
              {
                category: 'DevOps & AI Tools',
                icon: Briefcase,
                items: ['Docker', 'Git', 'GitHub', 'Ollama'],
              },
              {
                category: 'Cloud & Infrastructure',
                icon: Sparkles,
                items: ['AWS', 'Microsoft Azure', 'Vercel'],
              },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.category}
                  className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-5 sm:p-6 shadow-lg hover:bg-white/55 transition-all"
                >
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <Icon className="w-4 h-4 text-[#24211C]" />
                    {/* Skills card text: #24211C */}
                    <h3 className="text-sm font-bold text-[#24211C]">{cat.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {cat.items.map((skill) => {
                      const isFlagship = [
                        'Python',
                        'PyTorch',
                        'Transformers',
                        'LLMs',
                        'FastAPI',
                        'Docker',
                        'PostgreSQL',
                        'AWS',
                      ].includes(skill);

                      return (
                        <span
                          key={skill}
                          className={`text-xs px-3 py-1 rounded-lg font-bold transition-all ${isFlagship
                              ? 'bg-[#171717] text-[#FFFFFF] shadow-sm'
                              : 'bg-white/80 text-[#24211C] border border-black/10 hover:bg-white'
                            }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: EXPERIENCE & EDUCATION */}
        {/* ========================================================= */}
        <section id="experience" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Experience Card */}
            <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                  Experience
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#24211C] mt-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#24211C]" /> Professional Experience
                </h2>
              </div>

              <div className="bg-white/60 rounded-2xl p-5 border border-white/70 space-y-3 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-bold text-[#24211C] text-base">
                    Software Development Intern – Wholiex Enterprise
                  </div>
                  {/* Small labels: #6B5D4B */}
                  <div className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] w-fit shadow-sm">
                    Sept 2024 – Dec 2024
                  </div>
                </div>

                <ul className="text-xs sm:text-sm text-[#24211C]/90 font-medium space-y-2 list-disc list-inside leading-relaxed pt-1">
                  <li>Developed backend APIs supporting ML model integration and recommendation-system workflows.</li>
                  <li>Built responsive frontend components using Angular and Ionic.</li>
                  <li>Integrated PostgreSQL-based application analytics.</li>
                  <li>Performed API integration, testing, debugging, and performance improvements.</li>
                </ul>
              </div>
            </div>

            {/* Education Card */}
            <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                  Education
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#24211C] mt-2 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#24211C]" /> Academic Background
                </h2>
              </div>

              <div className="space-y-4">
                {/* Alliance University */}
                <div className="bg-white/60 rounded-2xl p-5 border border-white/70 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-bold text-[#24211C]">
                      Master of Computer Applications – Generative AI
                    </div>
                    {/* Small labels: #6B5D4B */}
                    <div className="text-xs font-mono font-bold text-[#6B5D4B]">Aug 2025 – Present</div>
                  </div>
                  <div className="text-sm text-[#24211C]/90 font-medium mt-1">Alliance University, Bangalore</div>
                </div>

                {/* ITM University */}
                <div className="bg-white/60 rounded-2xl p-5 border border-white/70 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-bold text-[#24211C]">
                      Bachelor of Computer Applications – Cloud Tech & InfoSec
                    </div>
                    {/* Small labels: #6B5D4B */}
                    <div className="text-xs font-mono font-bold text-[#6B5D4B]">2022 – 2025</div>
                  </div>
                  <div className="text-sm text-[#24211C]/90 font-medium mt-1">ITM University, Raipur</div>
                  <div className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] mt-2 inline-block shadow-sm">
                    CGPA: 8.7 / 10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: CONTACT & LET'S CONNECT */}
        {/* ========================================================= */}
        <section id="contact" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] space-y-8">
            <div className="max-w-xl">
              {/* Small labels: #6B5D4B */}
              <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                Contact
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#24211C] mt-2">
                Let's Build Intelligent Systems Together
              </h2>
              <p className="text-sm text-[#24211C]/85 font-medium mt-2">
                Open for AI/ML engineering roles, research collaborations, and production LLM projects. Reach out directly or connect through social profiles.
              </p>
            </div>

            {/* Email Card with Copy button */}
            <div className="bg-white/60 rounded-2xl p-5 border border-white/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div>
                {/* Small labels: #6B5D4B */}
                <div className="text-xs text-[#6B5D4B] uppercase tracking-wider font-mono font-bold">Direct Email</div>
                <a
                  href="mailto:anuvidmishra200417@gmail.com"
                  className="text-base sm:text-lg font-bold text-[#24211C] hover:underline transition-colors mt-0.5 block"
                >
                  anuvidmishra200417@gmail.com
                </a>
              </div>
              {/* CTA text: #FFFFFF */}
              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#FFFFFF]" /> : <Copy className="w-3.5 h-3.5 text-[#FFFFFF]" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
              </button>
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="https://github.com/Anuvid17"
                target="_blank"
                rel="noreferrer"
                className="bg-white/60 hover:bg-white/80 transition-all rounded-2xl p-5 border border-white/70 flex flex-col justify-between group shadow-sm"
              >
                <div className="flex items-center justify-between text-[#24211C] transition-colors">
                  <Github className="w-6 h-6 text-[#24211C]" />
                  <ExternalLink className="w-4 h-4 text-[#6B5D4B] group-hover:text-[#24211C]" />
                </div>
                <div className="mt-4">
                  <div className="text-base font-bold text-[#24211C] transition-colors">GitHub</div>
                  {/* Small labels: #6B5D4B */}
                  <div className="text-xs text-[#6B5D4B] font-mono font-bold">github.com/Anuvid17</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/anuvid-mishra"
                target="_blank"
                rel="noreferrer"
                className="bg-white/60 hover:bg-white/80 transition-all rounded-2xl p-5 border border-white/70 flex flex-col justify-between group shadow-sm"
              >
                <div className="flex items-center justify-between text-[#24211C] transition-colors">
                  <Linkedin className="w-6 h-6 text-[#24211C]" />
                  <ExternalLink className="w-4 h-4 text-[#6B5D4B] group-hover:text-[#24211C]" />
                </div>
                <div className="mt-4">
                  <div className="text-base font-bold text-[#24211C] transition-colors">LinkedIn</div>
                  {/* Small labels: #6B5D4B */}
                  <div className="text-xs text-[#6B5D4B] font-mono font-bold">in/anuvid-mishra</div>
                </div>
              </a>

              <a
                href="https://leetcode.com/u/anuvid17/"
                target="_blank"
                rel="noreferrer"
                className="bg-white/60 hover:bg-white/80 transition-all rounded-2xl p-5 border border-white/70 flex flex-col justify-between group shadow-sm"
              >
                <div className="flex items-center justify-between text-[#24211C] transition-colors">
                  <Code className="w-6 h-6 text-[#24211C]" />
                  <ExternalLink className="w-4 h-4 text-[#6B5D4B] group-hover:text-[#24211C]" />
                </div>
                <div className="mt-4">
                  <div className="text-base font-bold text-[#24211C] transition-colors">LeetCode</div>
                  {/* Small labels: #6B5D4B */}
                  <div className="text-xs text-[#6B5D4B] font-mono font-bold">leetcode.com/u/anuvid17</div>
                </div>
              </a>
            </div>

            {/* Direct Mail Form (CTA text: #FFFFFF) */}
            <div className="pt-2">
              <a
                href="mailto:anuvidmishra200417@gmail.com?subject=Let's%20Connect%20-%20AI/ML%20Opportunities"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-bold transition-all shadow-xl cursor-pointer bg-[#171717] text-[#FFFFFF] hover:bg-black"
              >
                <Mail className="w-4 h-4 text-[#FFFFFF]" />
                <span>Send Direct Email Message</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-5 sm:px-8 lg:px-12 border-t border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
            <div className="flex items-center gap-2 text-[#E5D8C5]">
              {/* Logo icon + name: #F5F0E6 */}
              <svg
                className="w-4 h-4 text-[#F5F0E6] fill-[#F5F0E6]"
                viewBox="0 0 256 256"
                fill="currentColor"
              >
                <path d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z" />
              </svg>
              <span><span className="text-[#F5F0E6] font-semibold">Anuvid Mishra</span> · <span className="text-[#6B5D4B]">Aspire to be AI/ML Developer</span></span>
            </div>

            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-1 text-[#F5F0E6] font-semibold hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#F5F0E6]" />
            </button>
          </div>
        </footer>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 bg-[#171717] text-[#FFFFFF] border border-white/20">
          <Sparkles className="w-4 h-4 text-[#FFFFFF]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
