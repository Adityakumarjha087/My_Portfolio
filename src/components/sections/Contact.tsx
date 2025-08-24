import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:9aadityakumar12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Adityakumarjha087', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/adityajha12/', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:9aadityakumar12@gmail.com', label: 'Email' }
  ];

  return (
    <section id="contact" className="relative min-h-screen py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let&apos;s collaborate and create something extraordinary together.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 mt-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Let&apos;s Start a Conversation
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I&apos;m always excited to discuss new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <div className="ml-6">
                    <h4 className="font-semibold text-white text-lg mb-1">Email</h4>
                    <a 
                      href="mailto:9aadityakumar12@gmail.com" 
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-lg"
                    >
                      9aadityakumar12@gmail.com
                    </a>
                    <p className="text-gray-400 text-sm mt-1">Best way to reach me</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FiLinkedin className="w-6 h-6" />
                  </div>
                  <div className="ml-6">
                    <h4 className="font-semibold text-white text-lg mb-1">LinkedIn</h4>
                    <a 
                      href="https://www.linkedin.com/in/adityajha12/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-lg"
                    >
                      linkedin.com/in/adityajha12
                    </a>
                    <p className="text-gray-400 text-sm mt-1">Professional network</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FiGithub className="w-6 h-6" />
                  </div>
                  <div className="ml-6">
                    <h4 className="font-semibold text-white text-lg mb-1">GitHub</h4>
                    <a 
                      href="https://github.com/Adityakumarjha087" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300 transition-colors duration-300 text-lg"
                    >
                      github.com/Adityakumarjha087
                    </a>
                    <p className="text-gray-400 text-sm mt-1">Code repositories</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <div className="ml-6">
                    <h4 className="font-semibold text-white text-lg mb-1">Location</h4>
                    <p className="text-red-400 text-lg">New Delhi, India</p>
                    <p className="text-gray-400 text-sm mt-1">Open to remote work globally</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-white font-semibold text-lg mb-6">Connect with me</h4>
                <div className="flex space-x-6">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {social.label}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="relative">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <FiSend className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="relative z-10 mt-20 text-center">
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400">
            © 2025 Aditya. All rights reserved. Built with passion and creativity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
