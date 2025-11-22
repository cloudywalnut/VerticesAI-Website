"use client";

import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern full-stack e-commerce solution with real-time inventory management and seamless checkout experience.",
      image: "/bot.jpg",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "AI Chat Bot",
      description: "Intelligent chatbot powered by machine learning, providing 24/7 customer support and automation.",
      image: "/bot.jpg",
      tags: ["Python", "TensorFlow", "FastAPI"]
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates, notifications, and team workspace features.",
      image: "/bot.jpg",
      tags: ["Next.js", "Firebase", "Tailwind"]
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "Comprehensive analytics dashboard for tracking social media metrics and generating actionable insights.",
      image: "/bot.jpg",
      tags: ["React", "D3.js", "Express"]
    },
    {
      id: 5,
      title: "Mobile Fitness App",
      description: "Cross-platform fitness application with workout tracking, progress monitoring, and personalized recommendations.",
      image: "/bot.jpg",
      tags: ["React Native", "Firebase", "Redux"]
    },
    {
      id: 6,
      title: "Automation Tool",
      description: "Powerful automation tool for streamlining repetitive tasks and improving team productivity.",
      image: "/bot.jpg",
      tags: ["Python", "Selenium", "Docker"]
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-linear-to-b from-white via-gray-50 to-white" id="Projects">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Projects
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-orange-400 to-orange-600"></div>
          <p className="text-gray-600 text-lg md:text-xl mt-6 max-w-2xl font-light">
            Explore a selection of my recent work showcasing modern design, innovative solutions, and cutting-edge technology.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* Project Image Container */}
              <div className="relative h-56 md:h-64 overflow-hidden bg-gray-200">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-6 md:p-7">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-orange-100 text-orange-600 text-xs md:text-sm font-medium rounded-full hover:bg-orange-200 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View More Link */}
                <button className="mt-5 text-orange-500 font-semibold text-sm md:text-base hover:text-orange-600 transition-colors duration-300 flex items-center gap-2 group/btn">
                  View Project
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}