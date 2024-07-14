import React, { ChangeEvent, FormEvent, useState } from "react"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"

interface Data {
  name: string
  email: string
  message: string
}

export function Contact() {
  const [formData, setFormData] = useState<Data>({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <>
      <Helmet>
        <title>christophel.io - Get in touch with us!</title>
        <meta
          name="description"
          content="Get in touch with christophel.io - for your web development and consulting needs. We're here to help bring your digital vision to life."
        />
      </Helmet>
      <div
        id="top"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900 to-blue-900 opacity-90"
      >
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 text-white mb-4 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h1>
            <p className="text-xl mb-8">
              Ready to bring your digital vision to life? We're here to help turn your ideas into reality. Reach out and
              let's start building something amazing together.
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <motion.span className="mr-2 text-blue-400" whileHover={{ scale: 1.2 }}>
                  📧
                </motion.span>
                info@christophel.io
              </p>
              <p className="flex items-center">
                <motion.span className="mr-2 text-blue-400" whileHover={{ scale: 1.2 }}>
                  📞
                </motion.span>
                +49 (XXX) XXX XXXX
              </p>
              <p className="flex items-center">
                <motion.span className="mr-2 text-blue-400" whileHover={{ scale: 1.2 }}>
                  📍
                </motion.span>
                Address: tbd
              </p>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl p-8 "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                  required
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                  required
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  )
}
