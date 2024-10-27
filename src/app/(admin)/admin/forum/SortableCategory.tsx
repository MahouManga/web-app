// SortableCategory.tsx
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ForumItem from "./ForumItem";
import { Forum, ForumCategory } from "./types";

interface SortableCategoryProps {
  item: ForumCategory;
  onAddSubforum?: (parentId: string | number) => void;
  onEditCategory?: (category: ForumCategory) => void;
  onDeleteCategory?: (id: string) => void;
  onEditForum?: (forum: Forum) => void;
}

const SortableCategory: React.FC<SortableCategoryProps> = ({
  item,
  onAddSubforum,
  onEditCategory,
  onDeleteCategory,
  onEditForum,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="mb-4 bg-base-100 shadow-md rounded-md p-4 relative"
    >
      <div className="flex items-center mb-2 gap-5" {...listeners}>
        <span className="text-lg font-semibold flex-grow text-base-content">{item.name}</span>
        <span className="text-base-content/70">(Posição: {item.position})</span>
        {onAddSubforum && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddSubforum(item.id);
            }}
            className="btn btn-sm btn-primary z-20 relative"
          >
            + Fórum
          </button>
        )}
        {onEditCategory && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditCategory(item);
            }}
            className="btn btn-sm btn-secondary z-20 relative"
          >
            Editar
          </button>
        )}
        {onDeleteCategory && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteCategory(item.id);
            }}
            className="btn btn-sm btn-error z-20 relative"
          >
            Deletar
          </button>
        )}
      </div>
      <div className="">
        {item.forums.map((forum) => (
          <ForumItem
            key={forum.id}
            item={forum}
            depth={1}
            onAddSubforum={onAddSubforum}
            onEditForum={onEditForum}
          />
        ))}
      </div>
    </div>
  );
};

export default SortableCategory;