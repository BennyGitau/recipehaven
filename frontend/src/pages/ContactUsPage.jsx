import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Layout from "../components/Layout/Layout";
import clsx from "clsx";

function Contact() {
  const [selectedInquiry, setSelectedInquiry] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    generalInquiry: false,
    recipeAssistance: false,
    technicalInquiry: false,
    feedback: false,
    message: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const emailParams = {
      from_name: formData.firstName + " " + formData.lastName,
      from_email: formData.email,
      phone_number: formData.phoneNumber,
      message: formData.message,
      subject: selectedInquiry,
    };

    emailjs
      .send("service_wm5ej6r", "template_6u16bp6", emailParams, {
        publicKey: "barod1VE6oGwO1rac",
      })
      .then((response) => {
        console.log("Email sent successfully:", response);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          generalInquiry: false,
          recipeAssistance: false,
          technicalInquiry: false,
          feedback: false,
          message: "",
        });

        setSelectedInquiry("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  }

  function handleChange(event) {
    const key = event.target.id;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    if (event.target.type === "checkbox" && value) {
      setFormData({
        ...formData,
        generalInquiry: false,
        recipeAssistance: false,
        technicalInquiry: false,
        feedback: false,
        [key]: value,
      });
      setSelectedInquiry(event.target.nextSibling.textContent.trim());
    } else {
      setFormData({
        ...formData,
        [key]: value,
      });
    }
  }

  return (
    <Layout>
      <section className="w-full h-full">
        <div
          className={clsx(
            "flex flex-col justify-between mt-4 max-w-4xl xl:max-w-[73rem] w-full min-h-[calc(100vh-12rem)] mx-auto py-3"
          )}
        >
          <div className="title-container space-y-3 border-b border-lime-900 pb-6 mb-6">
            <h1 className="text-4xl font-bold uppercase">
              How can we help you out?
            </h1>
            <p className=" text-xl font-semibold">
              Reach out to us or visit our nearest office.
            </p>
          </div>
          <div className="main-container h-fit grid grid-cols-2 gap-4">
            <div className="info-container overflow-hidden relative flex flex-col justify-between rounded-sm bg-green-900 text-white py-12 px-8">
              <div className="info-container-heading">
                <h2 className="text-3xl font-semibold">Contact Information</h2>

                <span className="h-[2.5px] w-40 rounded-full flex bg-slate-50 my-4" />
                <p className="text-sm font-semibold">
                  Say something to start a chat!
                </p>
              </div>
              <div className="info-container-content font-semibold">
                <p className="content-p-tags">🕾 +1012 3456 789</p>
                <p className="content-p-tags">🖂 demo@gmail.com</p>
                <p className="content-p-tags">
                  🖈 262 Tama Towers, Lubowitzshire, IA 49410
                </p>
              </div>
              <span className="h-40 w-40 rounded-full bg-green-800 absolute -right-[4%] -bottom-7 z-10" />
              <span className="h-32 w-32 rounded-full border-2 border-slate-100/40 absolute right-12 bottom-12 z-10" />
            </div>
            <div className="form-container px-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-1 [&_input]:border-2 [&_input]:py-2 [&_input]:px-3 [&_textarea]:w-full [&_input]:border-cyan-100 [&_input]:text-sm [&_input]:focus:ring-2 [&_input]:focus:ring-lime-700/40 [&_input]:rounded-sm [&_label]:text-sm [&_label]:font-semibold [&_label]:text-slate-600"
              >
                <div className="form-row grid grid-cols-2 gap-3">
                  <div className="form-group flex flex-col">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group flex flex-col">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row grid grid-cols-2 gap-3">
                  <div className="form-group flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group flex flex-col">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="message-container  flex flex-col">
                  <label htmlFor="message">Message</label>
                  <textarea
                    type="text"
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="px-3 border-2 border-cyan-100 rounded-sm"
                    placeholder="Write your message..."
                  />
                </div>
                <div className="checkbox-group py-4 inline-flex space-x-3 items-center">
                  <fieldset className="inline-flex items-center space-x-1">
                    <input
                      type="checkbox"
                      id="generalInquiry"
                      checked={formData.generalInquiry}
                      onChange={handleChange}
                    />
                    <label>General Inquiry</label>
                  </fieldset>
                  <fieldset className="inline-flex items-center space-x-1">
                    <input
                      type="checkbox"
                      id="recipeAssistance"
                      checked={formData.recipeAssistance}
                      onChange={handleChange}
                    />
                    <label>Recipe Assistance</label>
                  </fieldset>
                  <fieldset className="inline-flex items-center space-x-1">
                    <input
                      type="checkbox"
                      id="technicalInquiry"
                      checked={formData.technicalInquiry}
                      onChange={handleChange}
                    />{" "}
                    <label>Technical Inquiry</label>
                  </fieldset>
                  <fieldset className="inline-flex items-center space-x-1">
                    <input
                      type="checkbox"
                      id="feedback"
                      checked={formData.feedback}
                      onChange={handleChange}
                    />
                    <label>Feedback</label>
                  </fieldset>
                </div>
                <button
                  type="submit"
                  className="submit-button w-full bg-black text-white text-xl py-1.5  rounded-md hover:bg-green-900 duration-200 ease-out font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Contact;