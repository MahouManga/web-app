// SortableCategory.tsx
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ForumItem from "./ForumItem";
import { ForumCategory } from "./types";

interface SortableCategoryProps {
  item: ForumCategory;
  onAddSubforum?: (parentId: string | number) => void;
  onEditCategory?: (id: string, newName: string) => void;
  onDeleteCategory?: (id: string) => void;
  onEditForum?: (id: string, newName: string) => void;
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

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(item.name);

  const handleEdit = () => {
    if (!onEditCategory) return;
    if (isEditing) {
      onEditCategory(item.id, editedName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="mb-4 bg-base-100 shadow-md rounded-md p-4 relative">
      <div className="flex items-center mb-2 gap-5" {...listeners}>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="text-lg font-semibold bg-transparent border-b focus:ring-0 focus:outline-none flex-grow text-base-content"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="text-lg font-semibold flex-grow text-base-content">
            {item.name}
          </span>
        )}
        <span className="text-base-content/70">(Posição: {item.position})</span>
        {onAddSubforum && <button
          onClick={(e) => {
            e.stopPropagation();
            onAddSubforum(item.id);
          }}
          className="btn btn-sm btn-primary z-20 relative"
        >
          + Fórum
        </button>}
        {onEditCategory && <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
          className="btn btn-sm btn-secondary z-20 relative"
        >
          {isEditing ? "Salvar" : "Editar"}
        </button>}
        {onDeleteCategory && <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteCategory(item.id); // Call deleteCategory with the category ID
          }}
          className="btn btn-sm btn-error z-20 relative"
        >
          Delete
        </button>}
      </div>
      <div className="">
        {item.forums.map((forum) => (
          <ForumItem
            key={forum.id}
            item={forum}
            depth={1}
            onAddSubforum={onAddSubforum ? onAddSubforum : () => {}}
            onEditForum={onEditForum ? onEditForum : () => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default SortableCategory;
