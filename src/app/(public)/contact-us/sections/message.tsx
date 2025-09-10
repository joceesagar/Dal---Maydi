'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const MessageInputSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          message: ''
        });
      } else {
        console.error('Error:', result.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    {
      placeholder: "Your Name",
      field: 'name' as keyof FormData,
      required: true,
      error: errors.name
    },
    {
      placeholder: "Email Address",
      field: 'email' as keyof FormData,
      required: true,
      error: errors.email
    },
    {
      placeholder: "Phone Number (optional)",
      field: 'phoneNumber' as keyof FormData,
      required: false
    },
  ];

  return (
    <section className="flex flex-col w-full items-start gap-[41.62px] relative px-32 pt-16 mb-32">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[41.62px]">
        <div className="flex items-start gap-[27.75px] relative w-full">
          {inputFields.map((field, index) => (
            <div key={index} className="flex-1 flex flex-col">
              <Input
                placeholder={field.placeholder}
                value={formData[field.field]}
                onChange={(e) => handleInputChange(field.field, e.target.value)}
                className={`border-0 border-b-[0.87px] ${field.error ? 'border-red-500' : 'border-[#c9c9c9]'} rounded-none bg-transparent px-[8.67px] pt-[8.67px] pb-[27.75px] [font-family:'Poppins',Helvetica] font-normal text-black text-[20.8px] leading-[31.2px] placeholder:text-black focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[#bb8116]`}
                required={field.required}
              />
              {field.error && (
                <span className="text-red-500 text-sm mt-1 px-[8.67px] [font-family:'Poppins',Helvetica]">
                  {field.error}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col">
          <Textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`border-0 border-b-[0.87px] ${errors.message ? 'border-red-500' : 'border-[#c9c9c9]'} rounded-none bg-transparent px-[8.67px] pt-[8.67px] pb-[86.72px] min-h-[126.61px] resize-none [font-family:'Poppins',Helvetica] font-normal text-black text-[20.8px] leading-[31.2px] placeholder:text-black focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[#bb8116]`}
            required
          />
          {errors.message && (
            <span className="text-red-500 text-sm mt-1 px-[8.67px] [font-family:'Poppins',Helvetica]">
              {errors.message}
            </span>
          )}
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Thank you! Your message has been sent successfully.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Sorry, there was an error sending your message. Please try again.
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="flex w-[310.44px] items-center justify-center gap-[4.34px] px-[21.68px] py-[21.68px] bg-[#bb8116] hover:bg-[#a06f13] disabled:opacity-50 disabled:cursor-not-allowed rounded-[32.08px] h-auto"
        >
          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-[19.1px] text-center">
            {isLoading ? 'Sending...' : 'Leave us a Message'}
          </span>
          {!isLoading && <ArrowRightIcon className="w-[20.81px] h-[20.81px]" />}
        </Button>
      </form>
    </section>
  );
};