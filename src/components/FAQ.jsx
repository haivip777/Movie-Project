import React, { useState } from 'react';

const faqs = [
  {
    question: "What is MovieHub?",
    answer: "MovieHub is a comprehensive movie discovery platform that allows you to find trending movies, search for your favorites, and create a personalized watchlist."
  },
  {
    question: "Is MovieHub free to use?",
    answer: "Yes, MovieHub is completely free. We utilize the TMDB API to fetch movie data, ensuring you get the most up-to-date information without any cost."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is required! Your watchlist is saved securely in your browser's local storage, so you can start saving your favorite movies immediately."
  },
  {
    question: "How often is the trending list updated?",
    answer: "The trending movies list is automatically updated daily directly from TMDB's global popular API, so you'll never miss out on what's hot."
  },
  {
    question: "Where do you get your movie data from?",
    answer: "All movie metadata, including posters, ratings, overviews, and cast information, are reliably provided by The Movie Database (TMDB) API."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-32 mb-10 w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
        Frequently Asked <span className="text-gradient">Questions</span>
      </h2>
      
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-white/10 rounded-2xl bg-dark-100/40 backdrop-blur-sm overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-white/5 transition-colors"
            >
              <span className="text-lg font-medium text-white">{faq.question}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 text-[#AB8BFF] transition-transform duration-300 shrink-0 ml-4 ${openIndex === index ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
