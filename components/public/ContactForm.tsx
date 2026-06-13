"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
        <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
          Message Sent!
        </h3>
        <p className="text-sm text-green-600 dark:text-green-400">
          Thank you for reaching out. We will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Name"
          placeholder="Your name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <Input
          label="Email"
          type="email"
          placeholder="Your email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </div>
      <Input
        label="Subject"
        placeholder="Subject"
        required
        value={formData.subject}
        onChange={(e) =>
          setFormData({ ...formData, subject: e.target.value })
        }
      />
      <TextArea
        label="Message"
        placeholder="Your message..."
        required
        value={formData.message}
        onChange={(e) =>
          setFormData({ ...formData, message: e.target.value })
        }
      />
      <Button type="submit" size="lg">
        Send Message
      </Button>
    </form>
  );
}
