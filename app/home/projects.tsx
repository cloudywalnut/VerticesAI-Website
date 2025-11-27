"use client";

export default function Projects() {

  const projects = [
      {
          id: 1,
          title: "AI Agentic Pipeline with LangChain",
          description: "Built an AI agentic pipeline using LangChain with Supabase for contextual memory, retrieval, and function calling capabilities to answer student queries.",
          tags: ["Python", "LangChain", "Supabase", "Flask", "AI Agents"]
      },
      {
          id: 2,
          title: "Neural Network For MNIST Digit Classifier from Scratch",
          description: "Built a neural network from scratch in Python to classify handwritten digits. Implemented full training logic manually without ML libraries.",
          tags: ["Python", "NumPy", "Neural Networks", "Machine Learning"]
      },
      {
          id: 3,
          title: "Facial Emotion Recognizer using Transfer Learning",
          description: "Used transfer learning with TensorFlow to detect facial emotions. Fine-tuned a pre-trained CNN for accurate image-based emotion classification.",
          tags: ["Python", "TensorFlow", "CNN", "Transfer Learning", "Computer Vision"]
      },
      {
          id: 4,
          title: "Neural Network Based Fraud Booking Detector",
          description: "Developed a fraud detection system using booking stats from APIs. Trained a TensorFlow model and deployed with Flask for real-time results.",
          tags: ["Python", "TensorFlow", "Flask", "Neural Networks", "Fraud Detection"]
      },
      {
          id: 5,
          title: "Angular Based AI Chat App",
          description: "Developed an Angular-based AI chat app that generates auto-responses. Uses personas set by users for dynamic, personalized interactions.",
          tags: ["TypeScript", "Angular", "Ionic", "LLMs", "Web Development"]
      }
  ];

  return (
    <section className="w-full py-10 md:py-15 bg-linear-to-b from-white via-gray-200 to-white" id="Projects">
      <div className="max-w-10xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
        
        {/* Section Heading */}
        <div className="mb-10 md:mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Projects
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-orange-400 to-orange-600"></div>
          <p className="text-gray-600 text-lg md:text-xl mt-6 max-w-2xl font-light">
            Explore a selection of my recent work showcasing modern design, innovative solutions, and cutting-edge technology.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >

              {/* Project Content */}
              <div className="p-6 md:p-7">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-4">
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