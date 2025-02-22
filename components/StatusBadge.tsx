import clsx from "clsx";
import Image from "next/image";

import { StatusIcon } from "@/constants";

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "programado",
        "bg-blue-600": status === "pendiente",
        "bg-red-600": status === "cancelado",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt="doctor"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "programado",
          "text-blue-500": status === "pendiente",
          "text-red-500": status === "cancelado",
        })}
      >
        {status}
      </p>
    </div>
  );
};