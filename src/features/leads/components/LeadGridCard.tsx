import Image from "next/image";
import { Button } from "~/common/components/ui/Button";
import { Icon } from "~/common/components/ui/Icons/_index";
import Link from "next/link";
import type { UserStatus } from "~/common/types/userStatus";
import { UserStatusLogged } from "~/common/components/ui/UserStatusLogged";
import { LeadGridSkeleton } from "./LeadGridSkeleton";

interface LeadGridCardProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tag: { name: string; id: number; createdAt: Date; updatedAt: Date } | null;
  image: string;
  status: string;
  isLoading?: boolean;
}

export function LeadGridCard({
  firstName,
  lastName,
  email,
  phone,
  tag,
  image,
  status,
  isLoading,
}: LeadGridCardProps) {
  if (isLoading) {
    return <LeadGridSkeleton />;
  }

  return (
    <div className="flex h-full flex-col justify-between rounded-xl bg-white-100 lg:border lg:border-white-400">
      <div className="flex justify-between p-4 lg:justify-end">
        <Icon.Sidebar.Leads
          fill="#000"
          className="h-4 w-4 lg:hidden"
        />

        <Button
          color="septenary"
          className="h-9 w-9 border border-white-200"
        >
          <Icon.MoreActions />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative min-h-20 min-w-20">
          <Image
            src={image ?? "/placeholder-avatar.png"}
            alt={`${firstName} ${lastName}`}
            width={80}
            height={80}
            className="3xl:h-32 h-20 3xl:w-32 w-20 rounded-lg object-cover"
          />
          <UserStatusLogged
            userStatus={status as UserStatus}
            className="lg:h-4 lg:w-4"
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col items-center gap-1">
            <strong className="text-base leading-6">{`${firstName} ${lastName}`}</strong>
            <div className="flex min-w-[8rem] items-center justify-center rounded-lg bg-white-200 px-7 py-2 lg:hidden 2xl:flex">
              <span className="font-bold text-primary-200 text-sm leading-5">
                {tag?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="3xl:mt-8 mt-4 flex w-full border-white-400 border-t">
        <div className="flex flex-1 items-center justify-center border-white-400 border-r py-4">
          <Link
            href={`mailto:${email}`}
            className="flex items-center gap-1 font-black text-black-100 text-xs uppercase transition-colors hover:text-primary-200"
          >
            <Icon.Email className="h-[1.125rem] w-[1.125rem]" />
            Email
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-4">
          <Link
            href={`tel:${phone}`}
            className="flex items-center gap-1 font-black text-black-100 text-xs uppercase transition-colors hover:text-primary-200"
          >
            <Icon.Call className="h-[1.125rem] w-[1.125rem]" />
            Call
          </Link>
        </div>
      </div>
    </div>
  );
}
