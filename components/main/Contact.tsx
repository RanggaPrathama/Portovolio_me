"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import TrackVisibility from "react-on-screen";
import dynamic from "next/dynamic";
import { globeConfig, sampleArcs } from "@/constants";
import { useForm, ValidationError } from "@formspree/react";

const World = dynamic(() => import("../sub/Globe").then((m) => m.World), {
  ssr: false,
});

const Contact = () => {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [state, handleSubmit] = useForm("mrbzkjnp");

  const onFormUpdate = (category: keyof typeof formInitialDetails, value: string) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setButtonText("Sending...");
    const response = await fetch("https://formspree.io/f/mrbzkjnp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formDetails),
    });

    if (response.ok) {
      setButtonText("Sent!");
      setFormDetails(formInitialDetails); // Clear the form after submission
    } else {
      setButtonText("Send");
      console.error("Form submission failed.");
    }
  };

  return (
    <section className="py-2 text-white" id="contact">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10">
          Get In Touch
        </h2>
        <div className="flex flex-row items-center justify-center px-20 w-full z-[20]">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="md:top-40 w-full h-full">
              <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-96 px-4">
                <div className="absolute w-full bottom-0 inset-x-0 h-40 pointer-events-none select-none z-40" />
                <div className="absolute w-full h-72 md:h-full z-10">
                  <World data={sampleArcs} globeConfig={globeConfig} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <form onSubmit={handleFormSubmit} className="space-y-6 w-full max-w-md">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="text"
                        value={formDetails.firstName}
                        placeholder="First Name"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          onFormUpdate("firstName", e.target.value)
                        }
                        className="w-full px-4 py-2 text-white placeholder-gray-400 border border-transparent rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        style={{
                          background: "transparent",
                          borderImage: "linear-gradient(to right, #8b5cf6, #06b6d4) 1",
                        }}
                      />
                      <input
                        type="text"
                        value={formDetails.lastName}
                        placeholder="Last Name"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          onFormUpdate("lastName", e.target.value)
                        }
                        className="w-full px-4 py-2 text-white placeholder-gray-400 border border-transparent rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        style={{
                          background: "transparent",
                          borderImage: "linear-gradient(to right, #8b5cf6, #06b6d4) 1",
                        }}
                      />
                    </div>
                    <input
                      type="email"
                      value={formDetails.email}
                      placeholder="Email Address"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onFormUpdate("email", e.target.value)
                      }
                      className="w-full px-4 py-2 text-white placeholder-gray-400 border border-transparent rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      style={{
                        background: "transparent",
                        borderImage: "linear-gradient(to right, #8b5cf6, #06b6d4) 1",
                      }}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                    <input
                      type="tel"
                      value={formDetails.phone}
                      placeholder="Phone No."
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onFormUpdate("phone", e.target.value)
                      }
                      className="w-full px-4 py-2 text-white placeholder-gray-400 border border-transparent rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      style={{
                        background: "transparent",
                        borderImage: "linear-gradient(to right, #8b5cf6, #06b6d4) 1",
                      }}
                    />
                    <textarea
                      rows={6}
                      value={formDetails.message}
                      placeholder="Message"
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        onFormUpdate("message", e.target.value)
                      }
                      className="w-full px-4 py-2 text-white placeholder-gray-400 border border-transparent rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      style={{
                        background: "transparent",
                        borderImage: "linear-gradient(to right, #8b5cf6, #06b6d4) 1",
                      }}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] bg-transparent border-3 border-transparent transition-all duration-300"
                    >
                      <span
                        className="absolute inset-0 rounded-lg border-2 border-transparent"
                        style={{
                          borderImage:
                            "conic-gradient(from 90deg at 50% 50%, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)",
                          borderImageSlice: 1,
                          borderWidth: "2px",
                          borderStyle: "solid",
                          borderRadius: "inherit",
                        }}
                      />
                      <span
                        className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg text-lg font-medium text-white"
                        style={{
                          background: "transparent",
                        }}
                      >
                        {buttonText}
                      </span>
                    </button>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
