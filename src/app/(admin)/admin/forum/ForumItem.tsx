// ForumItem.tsx
import React, { useState } from "react";
import { Forum } from "./types";

interface ForumItemProps {
  item: Forum;
  depth: number;
  onAddSubforum?: (parentId: string | number) => void;
  onEditForum?: (forum: Forum) => void;
}

const ForumItem: React.FC<ForumItemProps> = ({
  item,
  depth,
  onAddSubforum,
  onEditForum,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

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
        <span className="font-semibold text-base-content">{item.title}</span>
        {onAddSubforum && <button
          onClick={(e) => {
            e.stopPropagation();
            onAddSubforum(item.id);
          }}
          className="ml-auto btn btn-xs btn-primary z-20 relative"
        >
          + SubFórum
        </button>}
        {onEditForum && <button
          onClick={(e) => {
            e.stopPropagation();
            onEditForum(item);
          }}
          className="ml-2 btn btn-xs btn-secondary z-20 relative"
        >
          Editar
        </button>}
      </div>
      {expanded && (
        <div className="ml-4 border-l-2 border-base-300 pl-4">
          {item.subForums.map((child) => (
            <ForumItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onAddSubforum={onAddSubforum}
              onEditForum={onEditForum}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumItem;