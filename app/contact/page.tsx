"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Send, CheckCircle } from 'lucide-react'
import { FloatingNav } from "@/components/ui/floating-nav"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function ContactPage() {
const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
})
const [isSubmitting, setIsSubmitting] = useState(false)
const [isSubmitted, setIsSubmitted] = useState(false)

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  try {
    const target = event?.target
    if (target?.name && target?.value !== undefined) {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }))
    }
  } catch (error) {
    console.warn("Input change error:", error)
  }
}

const handleSubmit = async (event: React.FormEvent) => {
  try {
    event?.preventDefault?.()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  } catch (error) {
    console.warn("Form submission error:", error)
  } finally {
    setIsSubmitting(false)
  }
}

const handleReset = () => {
  try {
    setIsSubmitted(false)
  } catch (error) {
    console.warn("Reset error:", error)
  }
}

return (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
    <FloatingNav />

    {/* Hero Section */}
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to experience guilt-free indulgence? We'd love to hear from you and answer any questions about our
              wellness foods and menu.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>

    {/* Contact Content */}
    <section className="pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 rounded-full mr-6">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">Phone</h3>
                    <p className="text-gray-600">+254 700 123 456</p>
                    <p className="text-sm text-gray-500">Mon-Fri 8AM-6PM EAT</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-full mr-6">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">Email</h3>
                    <p className="text-gray-600">info@italea.africa</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-full mr-6">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">Location</h3>
                    <p className="text-gray-600">
                      <a
                        href="https://www.google.com/maps/search/Highway+Mall"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:underline"
                      >
                        Highway Mall. Ground Floor Shop 11.
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">
                      <a
                        href="https://www.google.com/maps/search/Highway+Mall"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:underline"
                      >
                        Along Uhuru Highway.
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Our Journey</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/italea_bakery?igsh=aW82NGs0amswMjFz&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-amber-500 to-orange-600 p-3 rounded-full text-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="#"
                    className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-full text-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="#"
                    className="bg-gradient-to-r from-red-500 to-pink-600 p-3 rounded-full text-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <Twitter size={24} />
                  </a>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">Visit Our Kitchen</h4>
                <p className="text-gray-600 text-sm">
                  Want to see where the magic happens? Schedule a visit to our kitchen and experience the authentic
                  preparation of our wellness foods from various culinary traditions.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={0.3}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {!isSubmitted ? (
                <>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your interest in our wellness foods, dietary requirements, or any questions you have..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Message Sent!</h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for reaching out! We'll get back to you within 24 hours with information about our
                    wellness foods and menu offerings.
                  </p>
                  <button
                    onClick={handleReset}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about our wellness foods and culinary approach</p>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {[
            {
              question: "What makes your food special?",
              answer:
                "Our recipes draw from various culinary traditions, focusing on wholesome ingredients and traditional preparation methods. We combine global flavors with modern nutritional understanding to create truly nourishing meals.",
            },
            {
              question: "Do you accommodate dietary restrictions?",
              answer:
                "Yes! We offer vegan, gluten-free, and other dietary options. Many of our recipes are naturally plant-based and can be adapted to meet various dietary requirements and preferences.",
            },
            {
              question: "How do you ensure freshness and quality?",
              answer:
                "We prepare all our foods fresh daily using traditional methods and high-quality ingredients. We source directly from trusted suppliers and never use artificial preservatives or shortcuts.",
            },
            {
              question: "Can I visit your kitchen?",
              answer:
                "We welcome visitors to see our preparation methods and learn about our culinary philosophy. Contact us to schedule a visit and discover the care that goes into every dish.",
            },
          ].map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </div>
)
}
