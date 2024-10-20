"use client";

import React, { useEffect, useState } from "react";
import { DndContext, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface ImageItem {
    id: string;
    src: string;
    isUploaded: boolean;
    file?: File;
    width?: number;
    height?: number;
    fileSize?: number;
    imageURL?: string;
}

const SortableItem = ({ id, src, imageURL, isUploaded, onRemove, index }: ImageItem & { onRemove: (id: string) => void, index: number }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition: transition || undefined,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative p-1">
            <button
                onClick={() => onRemove(id)}
                onPointerDown={(event) => event.stopPropagation()}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
            >
                ×
            </button>
            <span className="absolute top-0 left-0 bg-black text-white text-xs px-1 rounded">
                {index + 1}
            </span>
            <img
                src={imageURL ?? src}
                alt={`Image ${id}`}
                className={`w-24 h-100 object-cover ${isUploaded ? 'border-2 border-green-500' : 'border-2 border-blue-500'}`}
            />
        </div>
    );
};

export default function MangaEditor({ serie, chapter, formData, chapterID, editorState }: any) {
    const [viewMode, setViewMode] = useState<number>(1);
    const [images, setImages] = useState<ImageItem[]>(chapter && chapter.content ? chapter.content.pages : []);
    const [zipFile, setZipFile] = useState<File | null>(null);

    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        console.log(images)
    }, [images]);

    const onDropImages = (acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map((file, index) => ({
            id: `new-${Date.now()}-${index}`,
            src: URL.createObjectURL(file),
            isUploaded: false,
            file,
        }));

        const totalSize = calculateTotalSize([...images.map((img) => img.file).filter((file) => file !== undefined) as File[], ...acceptedFiles]);

        if (parseFloat(totalSize) > 100) {
            toast.error("Total size exceeds 100MB limit.");
            return;
        }

        setImages((prev) => [...prev, ...newImages]);
    };

    const onDropZip = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const fileSizeMB = acceptedFiles[0].size / (1024 * 1024);
            if (fileSizeMB > 100) {
                toast.error("ZIP file size exceeds 100MB limit.");
                return;
            }
            setZipFile(acceptedFiles[0]);
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setImages((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleRemoveImage = (id: string) => {
        setImages((prev) => prev.filter((image) => image.id !== id));
    };

    const handleSubmit = async () => {
        if (!zipFile && images.length === 0) {
            toast.error("Porfavor envie algo para poder criar um capitulo.");
            return;
        }
        toast("Creating chapter...");

        if (chapter) return await handleSubmitFiles(chapterID);

        try {
            const chapterResponse = await fetch("/api/chapter/manga", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, type: 'MANGA', id: chapterID }), 
            });

            if (!chapterResponse.ok) {
                throw new Error("Failed to create chapter");
            }

            const chapterData = await chapterResponse.json();
            toast.success("Chapter created successfully!");

            await handleSubmitFiles(chapterData.data.id);
            console.log(chapterData)
        } catch (error) {
            toast.error("Error creating chapter.");
            console.error("Error creating chapter:", error);
        }
    };

    const handleSubmitFiles = async (chapterId: string) => {
        if (zipFile) {
            await handleSubmitZip(chapterId);
        }
        if (images.length > 0) {
            await handleSubmitImages(chapterId);
        }
    };

    const handleSubmitImages = async (chapterId: string) => {
        toast("Submitting images...");

        const data = new FormData();

        images.forEach((image, index) => {
            if (!image.isUploaded && image.file) {
                data.append(`image-${index}`, image.file);
            }
            data.append(`order-${index}`, JSON.stringify({ src: image.src, order: index }));
        });

        try {
            await fetch("/images/upload-images", {
                method: "POST",
                headers: {
                    Authorization: 'TEMPORARIO',
                },
                body: data,
            });
            toast.success("Images uploaded successfully!");
        } catch (error) {
            toast.error("Error uploading images.");
            console.error("Error uploading images:", error);
        }
    };

    const handleSubmitZip = async (chapterId: string) => {
        if (!zipFile) return;

        toast("Submitting ZIP file...");

        const data = new FormData();
        data.append("zipFile", zipFile);
        data.append("chapterID", String(chapterId));
        data.append("serieID", String(serie.id));

        try {
            let response = await fetch("/images/upload-zip", {
                method: "POST",
                headers: {
                    Authorization: 'TEMPORARIO',
                },
                body: data,
            });

            if (!response.ok) {
                toast.error("Error uploading ZIP file.");
                console.log(response)
            } else {
                let responseData = await response.json()
                console.log(responseData)
                toast.success("ZIP uploaded successfully!");

                try {
                    let response = await fetch("/api/chapter/manga", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ serieID: serie.id, chapterID: chapterId, imagens: responseData.images, type:'MANGA', ...formData }),
                    });
                } catch (error) {
                    toast.error("Error update page Images.");
                    console.error("Error update page:", error);
                }
            }
        } catch (error) {
            toast.error("Error uploading ZIP file.");
            console.error("Error uploading ZIP:", error);
        }
    };

    const calculateTotalSize = (files: File[]) => {
        const totalSize = files.reduce((acc, file) => acc + file.size, 0);
        return (totalSize / (1024 * 1024)).toFixed(2); // Convert to MB
    };

    const { getRootProps: getZipRootProps, getInputProps: getZipInputProps } = useDropzone({
        onDrop: onDropZip,
        multiple: false,
    });

    const { getRootProps: getImagesRootProps, getInputProps: getImagesInputProps } = useDropzone({
        onDrop: onDropImages,
        accept: { 'image/*': [] },
        multiple: true,
    });
    

    return (
        <div>
            <div className="mb-4 flex justify-center space-x-5 items-center">
                <button
                    className={`btn ${viewMode === 1 ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setViewMode(1)}
                >
                    Envio de ZIP
                </button>
                <button
                    className={`btn ${viewMode === 2 ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setViewMode(2)}
                >
                    Reordenar Páginas
                </button>
            </div>

            {viewMode === 1 && (
                <div>
                    <div {...getZipRootProps()} className="border-2 border-dashed border-gray-500 p-5 cursor-pointer">
                        <input {...getZipInputProps()} />
                        <p>Drag 'n' drop a ZIP file here, or click to select one</p>
                    </div>
                    {zipFile && <p>Selected file: {zipFile.name} ({(zipFile.size / (1024 * 1024)).toFixed(2)} MB)</p>}
                </div>
            )}

            {viewMode === 2 && (
                <>
                    <div {...getImagesRootProps()} className="border-2 border-dashed border-gray-500 p-5 cursor-pointer">
                        <input {...getImagesInputProps()} />
                        <p>Drag 'n' drop images here, or click to select files</p>
                    </div>
                    <p className="mt-2">Total size of images: {calculateTotalSize(images.map(image => image.file!).filter(file => file !== undefined))} MB</p>
                    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                        <SortableContext items={images} strategy={verticalListSortingStrategy}>
                            <div className="flex gap-2 flex-wrap mt-5">
                                {images.map((image, index) => (
                                    <SortableItem key={image.id} {...image} onRemove={handleRemoveImage} imageURL={`/images/series/${serie.id}/chapters/${chapterID}/${image.imageURL}`} index={index} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </>
            )}
            <button onClick={handleSubmit} className="mt-5 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
                        Submit Chapter
                    </button>
        </div>
    );
}
