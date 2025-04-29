import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useUploadThing } from "~/utils/storage";

export function useLead() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const trpcUtils = api.useUtils();
  const { startUpload } = useUploadThing("imageUploader");

  const createLead = api.leads.create.useMutation({
    onSuccess: () => {
      toast.success("Lead created successfully");
      trpcUtils.leads.getLeadsPaginated.invalidate();
      trpcUtils.leads.getControlledLeadsInfinite.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to create lead: ${error.message}`);
    },
  });

  const handleCreateLead = async (data: any) => {
    try {
      setIsSubmitting(true);

      if (!data.file) {
        toast.error("Please select an image");
        return false;
      }

      const uploadResponse = await startUpload([data.file]);
      if (!uploadResponse?.[0]) {
        toast.error("Failed to upload image");
        return false;
      }

      const leadData = {
        ...data,
        leadImages: [
          {
            url: uploadResponse[0].url,
            key: uploadResponse[0].key,
          },
        ],
      };

      await createLead.mutateAsync(leadData);
      return true;
    } catch (error) {
      console.error("Error creating lead:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createLead: handleCreateLead,
    isSubmitting,
  };
}
