import React, { useState } from "react";

type Tab = {
  id: string;
  label: string;
};

const tabData: Tab[] = [
  { id: "general", label: "General" },
  { id: "tech", label: "Tech" },
  { id: "random", label: "Random" },
];

type FAQItemData = {
  question: string;
  answer: string;
};

const faqData: { [key: string]: FAQItemData[] } = {
  general: [
    {
      question: "What is this application about?",
      answer:
        "This web application helps users make informed decisions about food products by scanning barcodes, analyzing nutrition tables and ingredients, and considering the user's existing health conditions.",
    },
    {
      question: "How does the barcode scanner work?",
      answer:
        "The barcode scanner uses your device's camera to scan product barcodes. Once scanned, it retrieves detailed information about the product from our database.",
    },
    {
      question:
        "Can I manually input product information if I can't scan the barcode?",
      answer:
        "Yes, you can manually enter the product name or barcode number if you're unable to scan the barcode.",
    },
    {
      question: "How accurate is the health recommendation?",
      answer:
        "Our recommendations are based on current nutritional guidelines and known health interactions. However, always consult with a healthcare professional for personalized advice.",
    },
  ],
  tech: [
    {
      question: "What technologies are used in this application?",
      answer:
        "This application is built using React for the frontend, with a Node.js backend. We use machine learning algorithms to analyze product information and provide recommendations.",
    },
    {
      question: "Is my health information secure?",
      answer:
        "Yes, we take data security seriously. All personal health information is encrypted and stored securely. We comply with relevant data protection regulations.",
    },
    {
      question: "Can I use this application offline?",
      answer:
        "Some features are available offline, but for the most up-to-date product information and personalized recommendations, an internet connection is required.",
    },
    {
      question: "How often is the product database updated?",
      answer:
        "Our product database is updated daily to ensure you have access to the most current information about food products.",
    },
  ],
  random: [
    {
      question: "Can this app help with specific diets like keto or vegan?",
      answer:
        "Yes, you can set your dietary preferences in the app, and it will consider these when providing recommendations.",
    },
    {
      question: "What if I have multiple health conditions?",
      answer:
        "The app can account for multiple health conditions. You can input all relevant health information in your profile for more accurate recommendations.",
    },
    {
      question:
        "Does the app provide alternatives if a product is not recommended?",
      answer:
        "Yes, when a product is not recommended based on your health profile, the app suggests healthier alternatives when available.",
    },
    {
      question: "Can I share product information with friends or family?",
      answer:
        "Yes, the app allows you to share product information and your personalized recommendation with others through various messaging platforms.",
    },
  ],
};

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className="mb-4 border-b border-[#e4e4e7] pb-4 dark:border-[#27272a]">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={onClick}
      >
        <span className="text-lg font-medium">{question}</span>
        <div>
          <svg
            className={`size-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
              isOpen ? "rotate-45" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 dark:text-gray-400">{answer}</div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl text-gray-800 dark:text-gray-200 sm:p-6">
      <h1 className="mb-4 text-center text-3xl font-bold">
        <span className="bg-gradient-to-r from-green-500 via-blue-600 to-purple-500 bg-clip-text text-transparent">
          Food Scanner{" "}
        </span>{" "}
        FAQ
      </h1>
      <p className="mb-12 text-center text-gray-600 dark:text-gray-400">
        Get answers about our food product analysis and health recommendation
        app.
      </p>

      <div className="mx-auto mb-10 flex max-w-lg space-x-1 rounded-lg border border-gray-300 p-1 dark:border-[#27272a]">
        {tabData.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? "border border-[#e4e4e7] bg-gray-300/40 font-semibold dark:border-[#27272a] dark:bg-gray-700/10"
                : "border border-transparent text-gray-500 hover:bg-gray-300/40 hover:dark:border-[#27272a] hover:dark:bg-gray-700/10 hover:dark:text-gray-300"
            }`}
            onClick={() => {
              setActiveTab(tab.id);
              setOpenItem(null);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="transition-opacity duration-200">
        {faqData[activeTab].map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openItem === index}
            onClick={() => setOpenItem(openItem === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
