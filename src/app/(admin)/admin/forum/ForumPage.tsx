// ForumPage.tsx
"use client";
import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Modal from "@/components/Modal";
import SortableCategory from "./SortableCategory";
import { ForumCategory, Forum } from "./types";

const ForumPage: React.FC = () => {
  const [data, setData] = useState<ForumCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | number | null>(null);
  const [subforumTitle, setSubforumTitle] = useState<string>("");
  const [subforumDescription, setSubforumDescription] = useState<string>("");
  const [allowTopics, setAllowTopics] = useState<boolean>(true);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isEditingCategories, setIsEditingCategories] = useState<boolean>(false);

  // Fetch data from backend on component mount
  useEffect(() => {
    fetchCategoriesAndForums();
  }, []);

  const fetchCategoriesAndForums = async () => {
    try {
      const response = await fetch("/api/forum/category");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching categories and forums:", error);
    }
  };

  // Function to add a new category
  const addCategory = async () => {
    if (newCategoryName) {
      try {
        const response = await fetch("/api/forum/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newCategoryName,
          }),
        });
        const newCategory = await response.json();
        await fetchCategoriesAndForums();
        setNewCategoryName("");
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  // Function to open the modal to add a subforum
  const openAddSubforumModal = (parentId: string | number) => {
    setCurrentCategoryId(parentId);
    setModalOpen(true);
  };

  // Function to add a subforum
  const addSubforum = async () => {
    if (currentCategoryId === null || !subforumTitle) return;

    try {
      const response = await fetch("/api/forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: subforumTitle,
          description: subforumDescription,
          allowTopics,
          isPublic,
          categoryId: typeof currentCategoryId === "string" ? currentCategoryId : null,
          parentForumId: typeof currentCategoryId === "number" ? currentCategoryId : null,
        }),
      });
      const newSubforum = await response.json();

      // Update local state
      setData((prevData) => {
        const updateForums = (categories: ForumCategory[]): ForumCategory[] => {
          return categories.map((category) => {
            if (category.id === currentCategoryId) {
              return {
                ...category,
                forums: [...category.forums, newSubforum],
              };
            } else {
              return {
                ...category,
                forums: category.forums.map((forum) => {
                  if (forum.id === currentCategoryId) {
                    return {
                      ...forum,
                      subForums: [...forum.subForums, newSubforum],
                    };
                  } else {
                    return forum;
                  }
                }),
              };
            }
          });
        };
        return updateForums(prevData);
      });

      setModalOpen(false);
      setSubforumTitle("");
      setSubforumDescription("");
      setAllowTopics(true);
      setIsPublic(true);
    } catch (error) {
      console.error("Error adding subforum:", error);
    }
  };

  // Example updateCategory function
  const updateCategory = async (id: string, name: string) => {
    try {
      const response = await fetch(`/api/forum/category`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name
        }),
      });

      if (!response.ok) {
        console.error('Failed to update category');
        return;
      }

      const updatedCategory = await response.json();
      await fetchCategoriesAndForums();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };


  // Function to edit the name of a category or subforum
  const editForum = async (id: string | number, newName: string) => {
    try {
      await fetch("/api/forum", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: newName,
        }),
      });

      // Update local state
      setData((prevData) => {
        const editRecursively = (categories: ForumCategory[]): ForumCategory[] => {
          return categories.map((category) => {
            if (category.id === id) {
              return { ...category, name: newName };
            } else {
              return {
                ...category,
                forums: category.forums.map((forum) => {
                  const updatedForum = editForumRecursively(forum);
                  return updatedForum;
                }),
              };
            }
          });
        };

        const editForumRecursively = (forum: Forum): Forum => {
          if (forum.id === id) {
            return { ...forum, title: newName };
          } else {
            return {
              ...forum,
              subForums: forum.subForums.map((subForum) => editForumRecursively(subForum)),
            };
          }
        };

        return editRecursively(prevData);
      });
    } catch (error) {
      console.error("Error editing category/forum:", error);
    }
  };

  // deleteCategory function in ForumPage.tsx

  const deleteCategory = async (id: string) => {
    console.log(id)
    try {
      const response = await fetch(`/api/forum/category/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCategoriesAndForums();
      } else {
        console.error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };


  // Function to handle the order of categories
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);
      const newData = arrayMove(data, oldIndex, newIndex).map((item, index) => ({
        ...item,
        position: index + 1,
      }));

      // Update positions in backend
      try {
        await fetch("/api/forum/category/reorder", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData.map(({ id, position }) => ({ id, position }))),
        });
        setData(newData);
      } catch (error) {
        console.error("Error updating category positions:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-base-content">
        Gerenciar Categorias e Fóruns
      </h1>

      {/* Form to Add Category */}
      <div className="flex items-center mb-4 gap-5">
        <input
          type="text"
          placeholder="Nome da Categoria"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={addCategory} className="btn btn-primary">
          Adicionar Categoria
        </button>
        <button
          onClick={() => setIsEditingCategories((prev) => !prev)}
          className="btn btn-secondary"
        >
          {isEditingCategories ? "Salvar Categorias" : "Editar Categorias"}
        </button>
      </div>

      {isEditingCategories ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={data.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {data
              .sort((a, b) => a.position - b.position)
              .map((category) => (
                <SortableCategory
                  key={category.id}
                  item={category}
                />
              ))}
          </SortableContext>
        </DndContext>
      ) : (
        data
          .sort((a, b) => a.position - b.position)
          .map((category) => (
            <SortableCategory
              key={category.id}
              item={category}
              onAddSubforum={openAddSubforumModal}
              onEditCategory={updateCategory}
              onEditForum={editForum}
              onDeleteCategory={deleteCategory}
            />
          ))
      )}

      {/* Modal to Add Subforum */}
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Adicionar Subfórum</h2>
          <input
            type="text"
            placeholder="Título do Subfórum"
            value={subforumTitle}
            onChange={(e) => setSubforumTitle(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
          <textarea
            placeholder="Descrição do Subfórum"
            value={subforumDescription}
            onChange={(e) => setSubforumDescription(e.target.value)}
            className="textarea textarea-bordered w-full mb-4"
          />
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allowTopics}
                onChange={(e) => setAllowTopics(e.target.checked)}
                className="toggle toggle-primary"
              />
              Permitir Tópicos
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="toggle toggle-primary"
              />
              Público
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setModalOpen(false)} className="btn btn-secondary">
              Cancelar
            </button>
            <button onClick={addSubforum} className="btn btn-primary">
              Adicionar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ForumPage;
