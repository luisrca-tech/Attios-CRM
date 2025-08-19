"use client";

import { useState } from "react";

export type InvoiceFormStep = "billTo" | "from" | "description";

export function useInvoiceFormSteps() {
  const [currentStep, setCurrentStep] = useState<InvoiceFormStep>("billTo");
  const [formData, setFormData] = useState({
    billTo: null as any,
    from: null as any,
    description: null as any,
  });

  const goToNextStep = () => {
    if (currentStep === "billTo") {
      setCurrentStep("from");
    } else if (currentStep === "from") {
      setCurrentStep("description");
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === "description") {
      setCurrentStep("from");
    } else if (currentStep === "from") {
      setCurrentStep("billTo");
    }
  };

  const saveStepData = (step: InvoiceFormStep, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: data,
    }));
  };

  const isFirstStep = currentStep === "billTo";
  const isLastStep = currentStep === "description";

  return {
    currentStep,
    formData,
    goToNextStep,
    goToPreviousStep,
    saveStepData,
    isFirstStep,
    isLastStep,
  };
}
