import { env } from "@/env";
import React from "react";
import Record from "./record";

interface pageProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
}

const page: React.FC<pageProps> = ({ ...props }) => {
  return (
    <div className="p-8 px-12" {...props}>
      <Record url={env.BACKEND_URL!} className="h-full flex flex-col"/>
    </div>
  );
};

export default page;
