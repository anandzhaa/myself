import { useState, useEffect } from 'react';
import { Phone, Mail, Send, CheckCircle, XCircle, Menu, X, Github, Linkedin, Code, GraduationCap, Briefcase, Award, Globe, FileText, User, ArrowDown } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'resume', 'education', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please make sure the server is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const RatingCircles = ({ filled }: { filled: number }) => {
    return (
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              num <= filled 
                ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-sm' 
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const stats = [
    { number: '1+', label: 'Years Experience', icon: Briefcase },
    { number: '2+', label: 'Projects Completed', icon: Code },
    { number: '5+', label: 'Technologies', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md shadow-lg z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
                <img 
                  src="/profile.jpg.jpg" 
                  alt="Anand Jha" 
                  className="w-full h-full object-cover relative z-10"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm z-0">
                  AM
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Anand Jha
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['home', 'about', 'resume', 'education', 'skills', 'portfolio', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 relative ${
                    activeSection === section
                      ? 'text-blue-400 font-semibold'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  {section}
                  {activeSection === section && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors text-gray-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

            {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900">
            <div className="px-4 py-4 space-y-3">
              {['home', 'about', 'resume', 'education', 'skills', 'portfolio', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left capitalize py-2 px-4 rounded-lg transition-colors ${
                    activeSection === section
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-300 hover:bg-slate-800'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-12 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 animate-fade-in text-center md:text-left">
              <div className="inline-block">
                <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  Welcome to my Development World!
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Anand Mohan Jha</span>
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium">
                a <span className="font-bold text-blue-600">Full-Stack Learner</span> with expertise in Frontend & Backend development, 
                modern web technologies, and creating scalable applications.
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                IT Student | Frontend Developer | Backend Developer | Tech Enthusiast
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base touch-manipulation"
                >
                  Contact Me
                </button>
              </div>
              <div className="flex gap-3 sm:gap-4 pt-4 justify-center md:justify-start">
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white active:scale-95 transition-all duration-300 touch-manipulation">
                  <Github size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white active:scale-95 transition-all duration-300 touch-manipulation">
                  <Linkedin size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white active:scale-95 transition-all duration-300 touch-manipulation">
                  <Mail size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
            <div className="flex justify-center order-first md:order-last">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-2 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl font-bold z-0">
                      AM
                    </div>
                    <img 
                      src="/profile.jpg.jpg" 
                      alt="Anand Mohan Jha" 
                      className="w-full h-full object-cover relative z-10"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white rounded-xl shadow-xl p-2 sm:p-4 border-2 border-blue-100">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">Available for work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 animate-bounce">
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-blue-400 transition-colors"
            >
              <ArrowDown size={32} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 mb-4">
                    <Icon className="text-white" size={32} />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">About Me</h2>
            <p className="text-lg sm:text-xl text-gray-600">Who am I professionally?</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 border border-gray-100">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                I'm <span className="font-bold text-blue-600">Anand Mohan Jha</span>, an enthusiastic BIM student and Full-Stack Learner with expertise in both Frontend and Backend development.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Over the years, I've been working on building modern web applications, creating scalable backend systems, and ensuring smooth user experiences. I have experience in content writing, where I wrote blogs and digital articles on business, marketing, and lifestyle topics, which improved my research and communication skills.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Currently pursuing my Bachelor in Information Management at Shanker Dev Campus, I'm actively seeking IT opportunities where I can contribute to real projects, improve my technical abilities, learn from industry professionals, and gain hands-on experience in modern development workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resume/Work Experience Section */}
      <section id="resume" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Resume</h2>
            <p className="text-lg sm:text-xl text-gray-600">Chronicles of My Professional Path</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-l-4 border-blue-600 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
              <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Content Writer</h3>
                  <p className="text-blue-600 font-semibold">Freelance</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  Jan 2023 - Nov 2025
                </span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Wrote blogs and digital articles on business, marketing and lifestyle topics</li>
                <li>Improved research and communication skills</li>
                <li>Created engaging content for various platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Education</h2>
            <p className="text-lg sm:text-xl text-gray-600">My Educational Achievements</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-l-4 border-purple-600 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-purple-600 sm:w-8 sm:h-8" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Bachelor in Information Management</h3>
                  <p className="text-gray-600 mb-1">Shanker Dev Campus, Kathmandu</p>
                  <p className="text-sm text-gray-500">January 2022 - Present</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-l-4 border-blue-600 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-blue-600 sm:w-8 sm:h-8" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">+2 (Management)</h3>
                  <p className="text-gray-600 mb-1">Rajarshi Janak Secondary School, Janakpur</p>
                  <p className="text-sm text-gray-500 mb-2">June 2019 - December 2021</p>
                  <p className="text-sm font-semibold text-blue-600">GPA: 3.09</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-l-4 border-green-600 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-green-600 sm:w-8 sm:h-8" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">SEE</h3>
                  <p className="text-gray-600 mb-1">NEB, Bhangaha, Mahottari</p>
                  <p className="text-sm text-gray-500 mb-2">June 2019</p>
                  <p className="text-sm font-semibold text-green-600">GPA: 2.55</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Skills</h2>
            <p className="text-lg sm:text-xl text-gray-600">Technologies I Work With</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Code className="text-blue-600" size={24} />
                Frontend Development
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'HTML, CSS, Javascript', level: 4 },
                  { name: 'UI/UX (Figma) - Basic', level: 3 },
                  { name: 'Graphics Design', level: 4 },
                ].map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors">
                    <span className="text-gray-800 font-medium">{skill.name}</span>
                    <RatingCircles filled={skill.level} />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Code className="text-purple-600" size={24} />
                Backend & Tools
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Backend Development (Node.js, Express)', level: 4 },
                  { name: 'Database (MongoDB)', level: 4 },
                  { name: 'Version Control (Git & GitHub)', level: 4 },
                  { name: 'Tools: VS Code', level: 4 },
                  { name: 'Technical Skills: MS Excel, MS PowerPoint, Web Development', level: 3 },
                ].map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors">
                    <span className="text-gray-800 font-medium text-sm">{skill.name}</span>
                    <RatingCircles filled={skill.level} />
                  </div>
                ))}
              </div>
                    </div>
                    </div>
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="text-green-600" size={24} />
                Languages
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'Nepali', level: 4 },
                  { name: 'English', level: 4 },
                ].map((lang, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50 transition-colors">
                    <span className="text-gray-800 font-medium">{lang.name}</span>
                    <RatingCircles filled={lang.level} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Portfolio</h2>
            <p className="text-lg sm:text-xl text-gray-600">My Recent Projects</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                  <Code className="text-blue-600 sm:w-8 sm:h-8" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">E-commerce Platform for Skincare and Makeup Products</h3>
                  <p className="text-gray-600 mb-4">
                    A full-featured e-commerce platform built with modern web technologies, featuring product catalog, shopping cart, secure checkout, and admin dashboard.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'].map((tech) => (
                      <span key={tech} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Achievements</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 sm:p-8 border-2 border-yellow-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                  <Award className="text-yellow-600 sm:w-8 sm:h-8" size={24} />
                  </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Journal Published on Nepal Journal Online</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Published research journal on social media for customer relationship management, contributing to the field of digital marketing and customer engagement strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Get in Touch</h2>
            <p className="text-lg sm:text-xl text-gray-600">Let's Connect</p>
            <p className="text-sm sm:text-base text-gray-600 mt-3 sm:mt-4 px-4">
              I'm currently available to take on new projects, so feel free to send me a message about anything that you want to run past me. You can contact anytime at 24/7.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 border border-gray-100">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                    <p className="text-sm sm:text-base text-gray-900 font-semibold">9816810289</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 border border-gray-100">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Email</p>
                    <p className="text-xs sm:text-sm text-gray-900 font-semibold break-all">anandjha9816@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-12 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>
                {submitStatus.type && (
                  <div className={`flex items-center gap-2 p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus.type === 'success' ? (
                      <CheckCircle size={20} className="flex-shrink-0" />
                    ) : (
                      <XCircle size={20} className="flex-shrink-0" />
                    )}
                    <p className="text-sm font-medium">{submitStatus.message}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                  Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Anand Mohan Jha. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
