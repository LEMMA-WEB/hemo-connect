"use client";

import { type PropsWithChildren } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Header } from "@/components/layout/header";
import { MenuSidebar } from "@/components/layout/menu-sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div className="border-b-1 border-neutral-200">
        <Header />
      </div>
      <div className="flex flex-1">
        <MenuSidebar className="h-full min-w-80 border-r-1 border-neutral-200" />

        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={50}>{children}</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel max-size={50} defaultSize={0}>
            REFERENCE SIDEBAR
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
