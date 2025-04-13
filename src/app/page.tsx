"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMobile,
  FaAppStore,
  FaGooglePlay,
  FaUnity,
  FaPython,
  FaJs,
  FaHtml5,
  FaCode,
  FaArrowUp,
  FaFileDownload,
  FaQuoteLeft,
  FaGamepad,
  FaPuzzlePiece,
  FaBolt,
  FaLayerGroup,
} from "react-icons/fa";
import {
  SiElectron,
  SiFlutter,
  SiFirebase,
  SiSupabase,
  SiOpenai,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { CheckIcon } from "@heroicons/react/24/outline";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5,
    },
  },
};

// Custom hook for tilt effect
const useTilt = (
  ref: React.RefObject<HTMLDivElement>,
  maxTilt: number = 15,
  isGridItem: boolean = false,
  isReference: boolean = false
) => {
  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = elem.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const centerX = width / 2;
      const centerY = height / 2;

      let tiltX, tiltY;

      if (isGridItem) {
        // Grid items: Reverse Y tilt only, less noticeable
        tiltX = -((y - centerY) / centerY) * maxTilt;
        tiltY = ((x - centerX) / centerX) * maxTilt; // Reversed Y tilt
      } else if (isReference) {
        // References: Reverse X tilt only
        tiltX = -((y - centerY) / centerY) * maxTilt; // Reversed X tilt
        tiltY = -((centerX - x) / centerX) * maxTilt;
      } else {
        // Normal behavior
        tiltX = -((y - centerY) / centerY) * maxTilt;
        tiltY = ((centerX - x) / centerX) * maxTilt;
      }

      elem.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      elem.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    };

    const handleMouseEnter = () => {
      elem.style.transition = "transform 0.1s ease-out";
    };

    elem.addEventListener("mousemove", handleMouseMove as EventListener);
    elem.addEventListener("mouseleave", handleMouseLeave);
    elem.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (elem) {
        elem.removeEventListener("mousemove", handleMouseMove as EventListener);
        elem.removeEventListener("mouseleave", handleMouseLeave);
        elem.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  }, [ref, maxTilt, isGridItem, isReference]);
};

// TiltCard component for feature items
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  gridItem?: boolean;
  isReference?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  gridItem = false,
  isReference = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Reduced tilt for grid items, pass type information to useTilt
  useTilt(ref, gridItem ? 20 : 15, gridItem, isReference);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: "url(/Background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          position: "relative",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          }}
        ></div>
        <div className="container text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-secondary-900">
              Devin Emmanuel Morgan
            </h1>
            <p className="text-xl md:text-2xl text-secondary-600 max-w-2xl mx-auto">
              Software Developer | Game Developer | Full Stack Engineer
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <a
                href="mailto:morgandevin1029@gmail.com"
                className="btn btn-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaEnvelope className="mr-2" /> Contact Me
              </a>
              <a
                href="/DevinMorganResume.pdf"
                className="btn btn-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFileDownload className="mr-2" /> Download Resume
              </a>
              <a
                href="tel:7573392700"
                className="btn btn-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaMobile className="mr-2" /> 757-339-2700
              </a>
            </motion.div>
            <div className="flex justify-center mt-4">
              <p className="flex items-center text-secondary-600">
                <FaMapMarkerAlt className="mr-2" /> Hampton, Virginia, United
                States
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex flex-col items-center text-secondary-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.4,
            }}
          >
            <p className="text-sm mb-2">Scroll Down</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16L19 9L17.59 7.59L12 13.17L6.41 7.59L5 9L12 16Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-secondary-600 mb-8">
              I'm a passionate software developer specializing in application
              and game development. Currently pursuing my Computer Science
              degree at Old Dominion University, I combine technical expertise
              with creativity to build intuitive, impactful digital experiences.
              With skills spanning mobile development, game design, and
              full-stack web applications, I enjoy solving complex problems
              through innovative solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section bg-secondary-50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10">
              Skills & Technologies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
              {/* Software Development */}
              <motion.div variants={fadeInUp} className="card">
                <h3 className="text-xl font-bold text-primary-600 mb-4">
                  Software Development
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <FaPython className="text-xl mr-2 text-primary-500" />
                    <span>Python</span>
                  </div>
                  <div className="flex items-center">
                    <FaJs className="text-xl mr-2 text-primary-500" />
                    <span>JavaScript</span>
                  </div>
                  <div className="flex items-center">
                    <FaHtml5 className="text-xl mr-2 text-primary-500" />
                    <span>HTML</span>
                  </div>
                  <div className="flex items-center">
                    <TbBrandCSharp className="text-xl mr-2 text-primary-500" />
                    <span>C#</span>
                  </div>
                </div>
              </motion.div>

              {/* Game Development */}
              <motion.div variants={fadeInUp} className="card">
                <h3 className="text-xl font-bold text-primary-600 mb-4">
                  Game Development
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center">
                    <FaUnity className="text-xl mr-2 text-primary-500" />
                    <span>Unity Game Engine</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>Performance Optimization</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>User Experience Design</span>
                  </div>
                </div>
              </motion.div>

              {/* App Development */}
              <motion.div variants={fadeInUp} className="card">
                <h3 className="text-xl font-bold text-primary-600 mb-4">
                  App Development
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center">
                    <SiFlutter className="text-xl mr-2 text-primary-500" />
                    <span>FlutterFlow</span>
                  </div>
                  <div className="flex items-center">
                    <SiElectron className="text-xl mr-2 text-primary-500" />
                    <span>Electron.js</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>Cross-Platform Development</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>UI/UX Design</span>
                  </div>
                </div>
              </motion.div>

              {/* Full-Stack Development */}
              <motion.div variants={fadeInUp} className="card">
                <h3 className="text-xl font-bold text-primary-600 mb-4">
                  Full-Stack Development
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <SiFirebase className="text-xl mr-2 text-primary-500" />
                    <span>Firebase</span>
                  </div>
                  <div className="flex items-center">
                    <SiSupabase className="text-xl mr-2 text-primary-500" />
                    <span>Supabase</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>Frontend</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>Backend</span>
                  </div>
                </div>
              </motion.div>

              {/* Specialized Skills */}
              <motion.div variants={fadeInUp} className="card md:col-span-2">
                <h3 className="text-xl font-bold text-primary-600 mb-4">
                  Specialized Skills
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center">
                    <SiOpenai className="text-xl mr-2 text-primary-500" />
                    <span>OpenAI API Integration</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>Drone Programming</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>API Integration</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>Problem Solving</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>Algorithmic Development</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>Educational Software</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Data Entry Specialist and Program Developer",
                  company: "Virginia Space Grant Consortium",
                  location: "Hampton, VA",
                  period: "June 2024 - Present",
                  description:
                    "Maintained and updated the internship database to ensure current information. Developed software applications for controlling small drones and providing high school students with foundational programming education.",
                },
                {
                  title: "Technology Analyst",
                  company: "ODU Procurement Services",
                  location: "Norfolk, VA",
                  period: "September 2023 - Present",
                  description:
                    "Evaluated surplus hardware to determine quality and potential for resale. Assessed diverse equipment including CPUs, laptops, projectors, and other technology. Explored options for refurbishing or recovering hardware to maximize value.",
                },
                {
                  title: "VICEROY Cybersecurity Research Program",
                  company:
                    "Department of Defense (DoD) Funded | Old Dominion University",
                  location: "Norfolk, VA",
                  period: "November 2024 - Present",
                  description:
                    "Selected for prestigious DoD-funded research on GPS spoofing detection using transformer-based AI models. Applied machine learning techniques to real-world cybersecurity challenges in a collaborative research setting. Designed and presented a research poster showcasing project outcomes to an academic audience.",
                },
              ].map((job, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="card text-left"
                >
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-primary-600">{job.company}</p>
                  <p className="text-secondary-500">{job.location}</p>
                  <p className="text-secondary-500 text-sm mb-4">
                    {job.period}
                  </p>
                  <p className="text-secondary-600">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section bg-secondary-50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Education</h2>
            <div className="space-y-8 max-w-3xl mx-auto">
              <motion.div variants={fadeInUp} className="card text-left">
                <h3 className="text-xl font-semibold">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-primary-600">Old Dominion University</p>
                <p className="text-secondary-500">Norfolk, VA</p>
                <p className="text-secondary-500 text-sm mb-4">
                  Expected Graduation: May 2025 | GPA: 3.33/4.0
                </p>
                <p className="text-secondary-600">
                  Credits Earned: 128 Semester Hours
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="card text-left">
                <h3 className="text-xl font-semibold">High School Diploma</h3>
                <p className="text-primary-600">Phoebus High School</p>
                <p className="text-secondary-500">Hampton, VA</p>
                <p className="text-secondary-500 text-sm mb-4">
                  Graduated: May 2019
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="card text-left">
                <h3 className="text-xl font-semibold">Certifications</h3>
                <p className="text-secondary-600 mt-2">
                  Drone Flying Certificate - Completed July 2024
                </p>
                <p className="text-secondary-600 mt-2">
                  AWS Certified Cloud Practitioner - April 2025
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Featured Projects
            </h2>

            {/* Genesis AI Project */}
            <motion.div variants={fadeInUp} className="mb-20">
              <div
                className="card overflow-hidden relative"
                style={{
                  backgroundImage: "url(/GenArt.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Genesis AI
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <p className="text-gray-200 text-left mb-6">
                        The ultimate AI chatbot app designed to unleash
                        imagination, boost productivity, and simplify your day.
                        Powered by multiple advanced AI models including GPT-4o,
                        Gemini 2.0, DeepSeek, and Claude, Genesis combines
                        cutting-edge tools with intuitive features for a
                        versatile and engaging experience.
                      </p>
                      <div className="text-left mb-6">
                        <h4 className="font-semibold text-gray-100 mb-2">
                          Key Features:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-200">
                          <li>
                            Image Generator: Create stunning visuals from text
                            prompts
                          </li>
                          <li>
                            Web Chat: Access real-time information from the
                            internet
                          </li>
                          <li>
                            Image & Link Insights: Analyze uploads for text
                            extraction and summaries
                          </li>
                          <li>Speech-to-Text: Voice-controlled interaction</li>
                          <li>Specialized AI Assistants for various tasks</li>
                          <li>Role-Playing & Creative Writing tools</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6 justify-start">
                        {[
                          "Flutter",
                          "Supabase",
                          "Firebase",
                          "Multiple AI APIs",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 justify-start">
                        <a
                          href="https://apps.apple.com/us/app/id6670447214"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                        >
                          <FaAppStore className="mr-2" /> App Store
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.gizastudios.genesisai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                        >
                          <FaGooglePlay className="mr-2" /> Google Play
                        </a>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
                      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <FaCode className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            GPT-4o & Claude
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <SiOpenai className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            Image Generation
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <SiFirebase className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            Web Search
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <SiSupabase className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            File Analysis
                          </p>
                        </TiltCard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Plasma Puck Unlimited */}
            <motion.div variants={fadeInUp} className="mb-20">
              <div
                className="card overflow-hidden relative"
                style={{
                  backgroundImage: "url(/PPUArt.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Plasma Puck Unlimited
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <p className="text-gray-200 text-left mb-6">
                        A fast-paced mobile air hockey game with over 20,000
                        downloads, recognized and featured twice by the iOS App
                        Store. Plasma Puck Unlimited offers an exciting arcade
                        experience with vibrant visuals and intuitive touch
                        controls.
                      </p>
                      <div className="text-left mb-6">
                        <h4 className="font-semibold text-gray-100 mb-2">
                          Game Features:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-200">
                          <li>Multiple game modes and difficulty levels</li>
                          <li>Unique power-ups and special abilities</li>
                          <li>Global leaderboards</li>
                          <li>Stunning neon visual effects</li>
                          <li>Optimized for both iOS and Android platforms</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6 justify-start">
                        {[
                          "Unity",
                          "C#",
                          "Mobile Development",
                          "Game Design",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 justify-start">
                        <a
                          href="https://apps.apple.com/us/app/id6479285186"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                        >
                          <FaAppStore className="mr-2" /> App Store
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.GizaStudios.PlasmaPuckUnlimited"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                        >
                          <FaGooglePlay className="mr-2" /> Google Play
                        </a>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
                      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <FaGamepad className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            7 Unique Game Modes
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <FaPuzzlePiece className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            Level Editor
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <FaBolt className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            12 Wild Power-ups
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <FaLayerGroup className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            400+ Premade Levels
                          </p>
                        </TiltCard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tello Drone Coding Lab */}
            <motion.div variants={fadeInUp}>
              <div className="card bg-white shadow-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    Tello Drone Coding Lab Applications
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <p className="text-secondary-600 text-left mb-6">
                        A series of labs designed to teach programming through
                        controlling Tello drones. This structured learning
                        environment enables students to write and execute Python
                        code to control drones, progressing from basic movements
                        to advanced swarm coordination across four comprehensive
                        labs.
                      </p>
                      <div className="text-left mb-6">
                        <h4 className="font-semibold text-primary-600 mb-2">
                          Lab Structure:
                        </h4>
                        <ul className="list-disc list-inside space-y-3 text-secondary-600">
                          <li>
                            <span className="font-semibold">
                              Lab 1: Intro to Coding Drones
                            </span>{" "}
                            - Teaches programming fundamentals through
                            block-based coding and basic Python, covering
                            takeoff, landing, and simple maneuvers.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Lab 2: Drone Control and Navigation
                            </span>{" "}
                            - Transitions students from block-based programming
                            to actual Python code, teaching the basics of Python
                            syntax while controlling drone movements and
                            navigation.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Lab 3: Mission Pad Detection
                            </span>{" "}
                            - Focuses on precise positioning using mission pads,
                            specialized navigation commands, and automated
                            mission planning.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Lab 4: Swarm Coding
                            </span>{" "}
                            - Teaches multi-drone programming, networking,
                            synchronization techniques, and choreographed flight
                            routines.
                          </li>
                        </ul>
                      </div>
                      <div className="text-left mb-6">
                        <h4 className="font-semibold text-primary-600 mb-2">
                          Educational Benefits:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-secondary-600">
                          <li>Hands-on approach to coding and robotics</li>
                          <li>Step-by-step progression of concepts</li>
                          <li>Real-time feedback and visualizations</li>
                          <li>Comprehensive development environment</li>
                          <li>
                            Engaging entry point to programming for students
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6 justify-start">
                        {[
                          "Python",
                          "Drone Programming",
                          "Educational Software",
                          "TelloSwarm API",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 justify-start">
                        <a
                          href="https://github.com/GizaStudios/DroneCodingLabs"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-primary-600 hover:bg-primary-700 text-white"
                        >
                          <FaGithub className="mr-2" /> View on GitHub
                        </a>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <img
                        src="/DroneCamp.jpg"
                        alt="Drone Coding Camp"
                        className="rounded-lg shadow-lg object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Drone Demo Video */}
            <motion.div variants={fadeInUp} className="mt-8 mb-20">
              <div className="card bg-primary-50 shadow-xl overflow-hidden border-2 border-primary-200">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary-600 mb-4">
                    Demo: Tello Drone Coding Lab in Action
                  </h3>
                  <div className="flex flex-col items-center justify-center space-y-4 py-6">
                    <p className="text-lg text-secondary-700 mb-4">
                      Watch the Coding Lab Demo video to see the application in
                      action
                    </p>
                    <div className="w-full max-w-4xl mx-auto">
                      <div
                        className="relative"
                        style={{ paddingTop: "56.25%" }}
                      >
                        <video
                          src="/CodingLabDemo.mp4"
                          controls
                          preload="metadata"
                          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-secondary-600 mt-4 text-center">
                    Demonstration of the Tello Drone Coding Lab application
                    being used to program and control drones
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10">
              Professional References
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Reference 1 */}
              <TiltCard className="card p-8 relative" isReference={true}>
                <FaQuoteLeft className="text-4xl text-primary-100 absolute top-6 left-6" />
                <div className="text-left relative z-10">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">
                    John Eagle
                  </h3>
                  <p className="text-secondary-500 mb-4">
                    Director of Information Technology
                  </p>
                  <p className="text-secondary-500 mb-1">
                    Hampton City Schools
                  </p>
                  <p className="text-secondary-600 mb-4">
                    <a
                      href="mailto:jeagle@hampton.k12.va.us"
                      className="text-primary-500 hover:underline"
                    >
                      jeagle@hampton.k12.va.us
                    </a>
                  </p>
                </div>
              </TiltCard>

              {/* Reference 2 */}
              <TiltCard className="card p-8 relative" isReference={true}>
                <FaQuoteLeft className="text-4xl text-primary-100 absolute top-6 left-6" />
                <div className="text-left relative z-10">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">
                    Alan Scott Bellows
                  </h3>
                  <p className="text-secondary-500 mb-4">
                    Technology Programs Coordinator
                  </p>
                  <p className="text-secondary-500 mb-1">
                    Virginia Space Grant Consortium
                  </p>
                  <p className="text-secondary-600 mb-2">
                    <span className="block">757-766-5210</span>
                    <a
                      href="mailto:abellows@odu.edu"
                      className="text-primary-500 hover:underline"
                    >
                      abellows@odu.edu
                    </a>
                  </p>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Activities Section */}
      <section className="section bg-secondary-50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Community Involvement
            </h2>
            <div className="card p-0 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-primary-600 mb-4">
                    Virginia Peninsula Foodbank
                  </h3>
                  <p className="text-lg text-secondary-600 mb-4">
                    Dedicated volunteer with{" "}
                    <span className="font-semibold">over 80 hours</span>{" "}
                    contributed to the Virginia Peninsula Foodbank, supporting
                    local initiatives to combat food insecurity and contributing
                    to community well-being.
                  </p>
                  <div className="flex justify-center mb-4">
                    <a
                      href="https://hrfoodbank.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Visit Foodbank Website
                    </a>
                  </div>
                </div>
                <div className="md:w-1/2 flex items-center justify-center p-4">
                  <img
                    src="/foodbank.webp"
                    alt="Virginia Peninsula Foodbank"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              I'm always interested in hearing about new projects and
              opportunities. Feel free to reach out!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="mailto:morgandevin1029@gmail.com"
                className="btn btn-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="mr-2" /> morgandevin1029@gmail.com
              </motion.a>
              <motion.a
                href="tel:7573392700"
                className="btn btn-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMobile className="mr-2" /> 757-339-2700
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-8">
        <div className="container text-center">
          <p>
            © {new Date().getFullYear()} Devin Emmanuel Morgan. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 p-3 rounded-full bg-primary-600 text-white shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
