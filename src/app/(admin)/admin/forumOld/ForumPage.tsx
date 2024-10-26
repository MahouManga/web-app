// ForumPage.tsx
"use client";
import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import Modal from "@/components/Modal";
import SortableCategory from "./SortableCategory";
import { CategoryType, ForumItemType } from "./types";

const ForumPage: React.FC = () => {
  const [data, setData] = useState<CategoryType[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);
  const [subforumTitle, setSubforumTitle] = useState<string>("");
  const [subforumDescription, setSubforumDescription] = useState<string>("");
  const [allowTopics, setAllowTopics] = useState<boolean>(true);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isEditingCategories, setIsEditingCategories] = useState<boolean>(false);

  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

  // Function to add a new category
  const addCategory = () => {
    if (newCategoryName) {
      setData((prevData) => [
        ...prevData,
        {
          id: Date.now(),
          name: newCategoryName,
          position: prevData.length + 1,
          subForums: [],
        },
      ]);
      setNewCategoryName("");
    }
  };

  // Function to open the modal to add a subforum
  const openAddSubforumModal = (parentId: number) => {
    setCurrentCategoryId(parentId);
    setModalOpen(true);
  };

  // Function to add a subforum
  const addSubforum = () => {
    if (currentCategoryId === null || !subforumTitle) return;

    setData((prevData) => {
      const addSubforumRecursively = (items: (CategoryType | ForumItemType)[]): (CategoryType | ForumItemType)[] => {
        return items.map((item) => {
          if (item.id === currentCategoryId) {
            const updatedItem = {
              ...item,
              subForums: [
                ...item.subForums,
                {
                  id: Date.now(),
                  name: subforumTitle,
                  description: subforumDescription,
                  allowTopics,
                  isPublic,
                  subForums: [],
                },
              ],
            };
            return updatedItem;
          }
          if (item.subForums) {
            return {
              ...item,
              subForums: addSubforumRecursively(item.subForums),
            };
          }
          return item;
        });
      };
      return addSubforumRecursively(prevData) as CategoryType[];
    });
    setModalOpen(false);
    setSubforumTitle("");
    setSubforumDescription("");
    setAllowTopics(true);
    setIsPublic(true);
  };

  // Function to edit the name of a category or subforum
  const editCategory = (id: number, newName: string) => {
    setData((prevData) => {
      const editRecursively = (items: (CategoryType | ForumItemType)[]): (CategoryType | ForumItemType)[] => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, name: newName };
          }
          if (item.subForums) {
            return { ...item, subForums: editRecursively(item.subForums) };
          }
          return item;
        });
      };
      return editRecursively(prevData) as CategoryType[];
    });
  };

  // Function to handle the order of categories
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((prevData) => {
        const oldIndex = prevData.findIndex((item) => item.id === active.id);
        const newIndex = prevData.findIndex((item) => item.id === over.id);
        const newData = arrayMove(prevData, oldIndex, newIndex);
        return newData.map((item, index) => ({ ...item, position: index + 1 }));
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-base-content">Gerenciar Categorias e Fóruns</h1>

      <button
        onClick={() => setIsEditingCategories((prev) => !prev)}
        className="btn btn-secondary mb-4"
      >
        {isEditingCategories ? "Salvar Categorias" : "Editar Categorias"}
      </button>

      {/* Form to Add Category */}
      <div className="flex items-center mb-4 gap-5">
        <input
          type="text"
          placeholder="Nome da Categoria"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={addCategory} className="btn btn-primary">
          Adicionar Categoria
        </button>
      </div>

      {isEditingCategories ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={data.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            {data
              .sort((a, b) => a.position - b.position)
              .map((category) => (
                <SortableCategory
                  key={category.id}
                  item={category}
                  onAddSubforum={openAddSubforumModal}
                  onEditCategory={editCategory}
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
              onEditCategory={editCategory}
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