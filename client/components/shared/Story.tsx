"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, Brain, Lightbulb, Puzzle, Target } from "lucide-react";
import Image from "next/image";
import Img1 from "/public/Images/img1.png";

export default function Story() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const sections = [
    {
      title: "The Problem",
      content:
        "In today's fast-paced world, people struggle to make informed decisions about their food choices, leading to poor nutrition and health issues.",
      icon: Puzzle,
      image: "/Images/img1.png",
      stats: [
        { value: "68%", label: "of adults are overweight or obese" },
        { value: "88%", label: "of Americans are metabolically unhealthy" },
      ],
    },
    {
      title: "Why We Need a Solution",
      content:
        "With the rise of chronic diseases and dietary restrictions, there's an urgent need for a tool that helps people navigate the complex world of food and nutrition.",
      icon: Lightbulb,
      image: "/Images/img6.png",
      stats: [
        { value: "415M", label: "people with diabetes worldwide" },
        {
          value: "1 in 10",
          label: "Americans have a nutrition-related disease",
        },
      ],
    },
    {
      title: "Our Solution",
      content:
        "We've developed an AI-powered app that scans food products, analyzes ingredients, and provides personalized recommendations based on your health profile and dietary needs.",
      icon: Brain,
      image: "/Images/img3.png",
      stats: [
        { value: "10M+", label: "products in our database" },
        { value: "99.9%", label: "accuracy in ingredient analysis" },
      ],
    },
    {
      title: "How It Helps You",
      content:
        "Our app empowers you to make healthier food choices, avoid allergens, and manage your diet effortlessly, leading to improved overall health and well-being.",
      icon: Target,
      image: "/Images/img4.png",
      stats: [
        { value: "87%", label: "of users report improved dietary habits" },
        { value: "4.8/5", label: "average user rating" },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = containerRef.current?.scrollHeight || 0;
      const sectionHeight = fullHeight / sections.length;
      const currentSection = Math.floor(
        (scrollPosition + windowHeight / 2) / sectionHeight
      );
      setActiveSection(Math.min(currentSection, sections.length - 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.5]);
  const backgroundScaleY = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-900">
      <motion.div
        className="absolute inset-0 "
        style={{
          opacity: backgroundOpacity,
          scaleY: backgroundScaleY,
          originY: 0,
        }}
      />
      <div
        ref={containerRef}
        className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="mb-40 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: activeSection >= index ? 1 : 0,
              y: activeSection >= index ? 0 : 50,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="w-full max-w-4xl bg-blue-200 backdrop-blur-lg shadow-xl overflow-hidden rounded-3xl">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center text-3xl font-bold mb-4">
                      <section.icon className="mr-2 h-8 w-8 text-primary" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                      {section.content}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {section.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="text-center">
                          <div className="text-3xl font-bold text-primary">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 transform">
        <Button
          variant="outline"
          size="icon"
          className="animate-bounce rounded-full bg-blue-100 backdrop-blur-sm dark:bg-blue-900/50"
          onClick={() =>
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <ArrowDown className="h-4 w-4" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div> */}
    </div>
  );
}
