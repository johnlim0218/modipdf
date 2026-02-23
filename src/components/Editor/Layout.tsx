import React from "react";

interface EditorLayoutProps {
  header: React.ReactNode;
  toolbar: React.ReactNode;
  navigationPanel: React.ReactNode;
  canvas: React.ReactNode;
  propertyPanel: React.ReactNode;
}

export default function EditorLayout({
  header,
  toolbar,
  navigationPanel,
  canvas,
  propertyPanel,
}: EditorLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Top Header */}
      <div className="h-14 bg-white border-b border-gray-200 z-20">
        {header}
      </div>

      {/* Secondary Toolbar */}
      <div className="h-12 bg-white border-b border-gray-200 z-10 shadow-sm">
        {toolbar}
      </div>

      {/* Main Content Area (3 Columns) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Navigation */}
        <div className="w-60 bg-gray-100 border-r border-gray-200 overflow-y-auto hidden md:block">
          {navigationPanel}
        </div>

        {/* Center: Canvas */}
        <div className="flex-1 overflow-auto bg-gray-200 relative">
          {canvas}
        </div>

        {/* Right Panel: Properties */}
        <div className="w-72 bg-white border-l border-gray-200 overflow-y-auto hidden lg:block">
          {propertyPanel}
        </div>
      </div>
    </div>
  );
}
