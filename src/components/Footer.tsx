import React from "react";
import { motion } from "framer-motion";
import { Github, Mail, Linkedin,  } from "lucide-react";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com/tareq-khalil",
            icon: Github,
            color: "hover:text-white",
        },
        {
            name: "Mail",
            href: "mailto:tareqkhalil1415@gmail.com",
            icon: Mail,
            color: "hover:text-white",
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/tareq-abdellatif-9b34502b4/",
            icon: Linkedin,
            color: "hover:text-white",
        },
    ];

return (
  <motion.footer
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.8 }}
    className="
      bg-gray-100 dark:bg-gray-900/95 
      backdrop-blur-md 
      border-t border-gray-300 dark:border-gray-800 
      text-gray-600 dark:text-gray-400 
      px-6 py-8
    "
  >
    <div className="mx-auto lg:ml-20 2xl:mx-auto max-w-6xl">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
        {/* Brand Info */}
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Kaze AI
          </h2>
          <p className="text-sm">
            Kaze AI helps you work smarter with tools for summarization,
            translation, code explanation, and more.
          </p>
          <div className="flex space-x-4 mt-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 dark:text-gray-400 transition-colors duration-300 ${link.color}`}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-800 pt-6 text-sm text-center">
        <p>© {currentYear} Kaze AI Hub. All rights reserved.</p>
      </div>
    </div>
  </motion.footer>
);

};

export default Footer;
