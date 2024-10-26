// ForumItem.tsx
import React, { useState } from "react";
import { ForumItemType } from "./types";

interface ForumItemProps {
  item: ForumItemType;
  depth: number;
  onAddSubforum: (parentId: number) => void;
  onEditCategory: (id: number, newName: string) => void;
}

const ForumItem: React.FC<ForumItemProps> = ({ item, depth, onAddSubforum, onEditCategory }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(item.name);

  const toggleExpand = () => setExpanded((prev) => !prev);

  const handleEdit = () => {
    if (isEditing) {
      onEditCategory(item.id, editedName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="pl-6">
      <div
        className="flex items-center cursor-pointer hover:bg-base-200 rounded-md p-2"
        onClick={(e) => {
          e.stopPropagation();
          toggleExpand();
        }}
      >
        <div className={`transition-transform ${expanded ? "rotate-90" : ""}`}>
          {item.subForums.length > 0 ? (
            <span className="mr-2">▶</span>
          ) : (
            <span className="mr-2">•</span>
          )}
        </div>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="font-semibold bg-transparent border-b focus:ring-0 focus:outline-none text-base-content"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="font-semibold text-base-content">{item.name}</span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddSubforum(item.id);
          }}
          className="ml-auto btn btn-xs btn-primary z-20 relative"
        >
          + SubFórum
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
          className="ml-2 btn btn-xs btn-secondary z-20 relative"
        >
          {isEditing ? "Salvar" : "Editar"}
        </button>
      </div>
      {expanded && (
        <div className="ml-4 border-l-2 border-base-300 pl-4">
          {item.subForums.map((child) => (
            <ForumItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onAddSubforum={onAddSubforum}
              onEditCategory={onEditCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumItem;