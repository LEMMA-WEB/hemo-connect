"use client";

import { type PropsWithChildren } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div className="border-b-1 border-neutral-200">
        <Header />
      </div>
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={20} maxSize={30}>
            MENU SIDEBAR
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={40}>{children}</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel max-size={40} defaultSize={0}>
            REFERENCE SIDEBAR
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
