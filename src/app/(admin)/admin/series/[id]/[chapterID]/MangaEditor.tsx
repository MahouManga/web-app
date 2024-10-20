'use client';

import { useState } from "react";

export default function MangaEditor({ props }: any) {
    const [newImages, setNewImages] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [viewMode, setViewMode] = useState<number>(1); // 1: Envio de ZIP, 2: Reordenar Páginas
    const [totalSize, setTotalSize] = useState<number>(0);

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
                <div className="mb-5">
                    <h3 className="text-lg font-bold mb-3">Upload de ZIP com Imagens (Máximo 50mb)</h3>
                    {selectedFile && (
                        <div className="mt-3">
                            <p>Arquivo selecionado: {selectedFile.name}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}