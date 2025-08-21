"use client";

import { BillToForm } from "./BillToForm";
import { FromForm } from "./FromForm";
import { DescriptionForm } from "./DescriptionForm";
import { useInvoiceFormSteps } from "~/features/invoices/hooks/useInvoiceFormSteps";

type InvoiceFormProps = {
  invoiceNumber: string;
};

export function InvoiceForm({ invoiceNumber }: InvoiceFormProps) {
  const {
    currentStep,
    formData,
    goToNextStep,
    goToPreviousStep,
    saveStepData,
  } = useInvoiceFormSteps();

  const handleBillToSave = (data: any) => {
    saveStepData("billTo", data);
    goToNextStep();
  };

  const handleFromSave = (data: any) => {
    saveStepData("from", data);
    goToNextStep();
  };

  const handleDescriptionSave = (data: any) => {
    saveStepData("description", data);
    // Here you would typically save to database and redirect
    console.log("Final form data:", { ...formData, description: data });
    // For now, just log the complete data
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  return (
    <div className="h-full">
      {currentStep === "billTo" && (
        <BillToForm
          invoiceNumber={invoiceNumber}
          onSaveAndNext={handleBillToSave}
        />
      )}
      
      {currentStep === "from" && (
        <FromForm
          onSaveAndNext={handleFromSave}
          onBack={handleBack}
        />
      )}
      
      {currentStep === "description" && (
        <DescriptionForm
          onSaveAndNext={handleDescriptionSave}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
