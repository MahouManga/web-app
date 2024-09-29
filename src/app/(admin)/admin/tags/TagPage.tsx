'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Toaster, toast } from 'sonner'

import { IoAdd, IoCreateOutline, IoSearchOutline, IoTrashBin } from 'react-icons/io5';
import Modal from '@/components/Modal';

interface Tag {
    id: string;
    name: string;
}

interface TagPageProps {
    data: Tag[];
}

export default function TagPage({ data }: TagPageProps) {
    const router = useRouter();
    const [generos, setGeneros] = useState(data || []);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTag, setNewTag] = useState({
        id: '',
        name: '',
    });
    const [search, setSearch] = useState('');
    const [editTag, setEditTag] = useState({
        id: '',
        name: '',
    })
    const [deleteNumber, setDeleteNumber] = useState(0)

    const handleSubmitNewTodo = async () => {

        let dataToSend = { name: newTag.name }; // Copia o objeto newTag

        try {
            let response;

            if (newTag.id === '') {
                // Se for um novo gênero (criação)
                response = await fetch('/api/tags', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
            } else {
                // Se for edição de um gênero existente
                response = await fetch(`/api/tags/${newTag.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTag),
                });
            }

            // Verifica se a resposta foi bem-sucedida
            if (response.status === 201) {
                toast.success('Gênero criado com sucesso!');
            } else if (response.status === 200) {
                toast.success('Gênero editado com sucesso!');
            } else {
                const errorData = await response.json();
                toast.error(`Erro ao salvar gênero: ${errorData.message}`);
            }
        } catch (error) {
            toast.error('Erro ao criar ou editar gênero!');
        }

        setModalOpen(false);
    };

    const handleSubmitDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/tags/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success('Gênero excluído com sucesso!');
            } else {
                const errorData = await response.json();
                toast.error(`Erro ao excluir gênero: ${errorData.message}`);
            }
        } catch (error: any) {
            toast.error('Erro ao excluir gênero! ', error.message);
        }
    }


    const deleteOpenModal = (id: string) => {
        const deleteModal = document.getElementById('deleteModal');
        if (deleteModal instanceof HTMLDialogElement) {
            deleteModal.showModal();
            const index = generos.findIndex((g:any) => g.id === id);
            setDeleteNumber(index);
        }
    }

    const handleSubmitEdit = async (id: string) => {
        try {
            const response = await fetch(`/api/tags/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editTag),
            });

            if (response.ok) {
                toast.success('Gênero atualizado com sucesso!');
                router.refresh();
            } else {
                const errorData = await response.json();
                toast.error(`Erro ao atualizar gênero: ${errorData.message}`);
            }
        } catch (error: any) {
            toast.error(`Erro ao atualizar gênero: ${error.message}`);
        }
    };

    const editOpenModal = (id: string) => {
        const editModal = document.getElementById('editModal');
        if (editModal instanceof HTMLDialogElement) {
            editModal.showModal();
            setEditTag(generos.find((g:any) => g.id === id)!);
        }
    }

    const filteredItems = generos.filter((item:any) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <Breadcrumb pageName="Tags" />
            <div className="bg-base-300 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full flex-col flex md:flex-row">
                        <div className="flex items-center w-full">
                            <label className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <IoSearchOutline className="w-5 h-5" />
                                </div>
                                <input type="text" id="simple-search" className="input input-bordered text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <button onClick={() => setModalOpen(true)}
                                type="button"
                                className="flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <IoAdd className="w-5 h-5 mr-2" />
                                Add Genre
                            </button>
                            <div className="flex items-center space-x-3 w-full md:w-auto">
                                <div id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center text-sm font-medium focus:outline-none rounded-lg">
                                    <select defaultValue="AZ" className="select w-full max-w-xs">
                                        <option value="AZ">A - Z</option>
                                        <option value="ZA">Z - A</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 w-full text-center'>
                    <table className="table table-pin-rows table-auto md:table-fixed w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((genre: any, index: number) => (
                                <tr key={genre.id}>
                                    <td>{genre.id}</td>
                                    <td>{genre.name}</td>
                                    <td className='flex items-center justify-center space-x-4'>
                                        <button type="button" className="btn btn-default" onClick={() => editOpenModal(genre.id)}>
                                            <IoCreateOutline size={20} />
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-error" onClick={() => deleteOpenModal(genre.id)}>
                                            <IoTrashBin size={20} />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <dialog id="deleteModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Deseja remover esse Gênero?</h3>
                    <div className='flex justify-center space-x-4 py-4'>
                        <p>ID: {generos[deleteNumber] ? generos[deleteNumber].id : null}</p>
                        <p> Nome: {generos[deleteNumber] ? generos[deleteNumber].name : null}</p>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-default">Cancelar</button>
                        </form>
                        <button className="btn btn-primary" onClick={() => handleSubmitDelete(generos[deleteNumber].id)}>Confirmar</button>
                    </div>
                </div>
            </dialog>

            <dialog id="editModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Deseja editar esse Gênero?</h3>
                    <div className='modal-middle'>
                        <label className='label'>
                            <span className='label-text'>ID</span>
                        </label>
                        <input
                            value={editTag.id}
                            onChange={(e) => setEditTag({ ...editTag, id: e.target.value })}
                            type='string'
                            placeholder='Se estiver vazio, será gerado automaticamente'
                            className='input input-bordered w-full'
                        />
                        <label className='label'>
                            <span className='label-text'>Nome</span>
                        </label>
                        <input
                            value={editTag.name}
                            onChange={(e) => setEditTag({ ...editTag, name: e.target.value })}
                            type='text'
                            placeholder='Tipo de gênero'
                            className='input input-bordered w-full'
                        />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-default">Cancelar</button>
                        </form>
                        <button className="btn btn-primary" onClick={() => handleSubmitEdit(editTag.id)}>Confirmar</button>
                    </div>
                </div>
            </dialog>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewTodo}>
                    <h3 className='font-bold text-lg'>Criar uma nova Tag</h3>
                    <div className='modal-middle'>
                        <label className='label'>
                            <span className='label-text'>Nome</span>
                        </label>
                        <input
                            value={newTag.name}
                            onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                            type='text'
                            placeholder='Tipo de gênero'
                            className='input input-bordered w-full'
                        />
                    </div>
                    <div className='modal-action'>
                        <button type='submit' className='btn btn-success'>
                            Submit
                        </button>
                        <button type='reset' className='btn' onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}