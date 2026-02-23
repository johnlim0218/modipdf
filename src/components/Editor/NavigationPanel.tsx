import React from "react";
import { MoreVertical, Check, Trash2, RotateCw, Plus } from "lucide-react";
import { useEditor } from "./EditorContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableThumbnail({
  id,
  index,
  thumbnail,
  isActive,
  isSelected,
  onSelect,
  onRemove,
  onRotate,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group flex flex-col items-center gap-2 mb-4 ${isActive ? "z-50" : ""}`}
      onClick={(e) => onSelect(id, e.metaKey || e.ctrlKey)}
    >
      <div
        className={`
        relative w-full aspect-[1/1.414] bg-white border rounded shadow-sm cursor-pointer
        transition-all duration-200
        ${isSelected ? "ring-2 ring-indigo-600 border-indigo-600" : "border-gray-200 hover:border-indigo-400"}
      `}
      >
        {/* Thumbnail Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={`Page ${index + 1}`}
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* Selected Overlay */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-indigo-600 rounded-full p-0.5 text-white shadow-sm">
            <Check size={12} strokeWidth={3} />
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRotate();
            }}
            className="p-1.5 bg-white rounded-full shadow text-gray-600 hover:text-indigo-600 hover:scale-110 transition"
            title="Rotate"
          >
            <RotateCw size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1.5 bg-white rounded-full shadow text-gray-600 hover:text-red-600 hover:scale-110 transition"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Page Number */}
      <span className="text-xs text-gray-500 font-medium">{index + 1}</span>
    </div>
  );
}

export default function NavigationPanel() {
  const {
    pages,
    addFiles,
    selectedPageIds,
    selectPage,
    removePages,
    rotatePages,
    movePage,
  } = useEditor();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      movePage(active.id as string, over.id as string);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Pages ({pages.length})
        </h3>
        <button
          onClick={() => document.getElementById("add-file-input")?.click()}
          className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
          title="Add PDF"
        >
          <Plus size={16} />
        </button>
        <input
          id="add-file-input"
          type="file"
          multiple
          accept=".pdf,image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              addFiles(Array.from(e.target.files));
              // Reset input value to allow selecting same file again
              e.target.value = "";
            }
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={pages.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {pages.map((page, index) => (
              <SortableThumbnail
                key={page.id}
                id={page.id}
                index={index}
                thumbnail={page.thumbnail}
                isSelected={selectedPageIds.has(page.id)}
                onSelect={selectPage}
                onRemove={() => removePages([page.id])}
                onRotate={() => rotatePages([page.id])}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
