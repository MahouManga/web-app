'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

import Breadcrumb from '@/components/Breadcrumb';

import { IoAdd, IoDocumentTextOutline, IoShareSocialOutline } from 'react-icons/io5';

export default function SeriePage({ serie, chapters }: any) {
    const [serieData, setSerieData] = useState(serie);

    // Agrupar capítulos por volume
    const groupedChapters = chapters.reduce((acc: any, chapter: any) => {
        (acc[chapter.volume] = acc[chapter.volume] || []).push(chapter);
        return acc;
    }, {});

    return (
        <div>
            <Breadcrumb pageName="Series" />
            <div className="mx-auto bg-base-200 text-base-content rounded-lg shadow-lg p-4">
                <div className="card lg:card-side bg-base-100 shadow-xl mb-8">
                    <figure>
                        <Image src={serieData.posterImage || '/noImage.jpg'} alt="Album Cover" width={200} height={300} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{serieData.title}</h2>
                        <p>Tipo: {serieData.type}</p>
                        <p>Subtipo: {serieData.subtype}</p>
                        <p>Títulos: {serieData.titles.map((title: any) => title.title).join(', ')}</p>
                        <p>Gêneros: {serieData.genres.map((genre: any) => genre.name).join(', ')}</p>
                        <p>Autores: {serieData.authors.map((author: any) => author.name).join(', ')}</p>
                        <p>Ano de publicação: {serieData.releasedAt}</p>
                        <p>Status: {serieData.status}</p>
                        <p>View: {serieData.views}</p>
                        <p>Cadastrado: {moment(serieData.createdAt).format('MMMM Do YYYY')}</p>
                        <p>Atualizado: {moment(serieData.updatedAt).format('MMMM Do YYYY')}</p>
                        <div className="card-actions justify-end">
                            <Link href={`/admin/series/${serieData.id}/files`}>
                                <button className="btn bg-secondary-content text-secondary">Assets</button>
                            </Link>
                            <Link href={`/series/${serieData.id}`}>
                                <button className="btn btn-secondary">Olhar no Site</button>
                            </Link>
                            <Link href={`/admin/series/${serieData.id}/edit`}>
                                <button className="btn btn-primary">Editar Obra</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <p className="mb-4">Essa tabela é atualizada a cada 15 segundos automaticamente.</p>
                    {Object.keys(groupedChapters).map((volume) => (
                        <div key={volume} className="mb-8">
                            <h3 className="text-lg font-bold mb-4">Volume {volume}</h3>
                            <table className="table w-full max-h-[400px] overflow-y-auto">
                                <thead>
                                    <tr>
                                        <th>CAP</th>
                                        <th>Volume</th>
                                        <th>TÍTULO</th>
                                        <th>VIEWS</th>
                                        <th>ATUALIZAÇÃO</th>
                                        <th>Criador</th>
                                        <th>AÇÕES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedChapters[Number(volume)].map((chapter: any, index: any) => (
                                        <tr key={index}>
                                            <td>{chapter.index}</td>
                                            <td>{chapter.volume}</td>
                                            <td>{chapter.title || '---'}</td>
                                            <td>{chapter.views}</td>
                                            <td>{moment(chapter.updatedAt).format('MMMM Do YYYY')}</td>
                                            <td>{chapter.creator?.name || '---'}</td>
                                            <td>
                                                <Link href={`/admin/series/${serieData.id}/${chapter.id}`}>
                                                    <button className="btn btn-ghost btn-xs">
                                                        <IoDocumentTextOutline size={20} />
                                                    </button>
                                                </Link>
                                                <Link href={`/series/${serieData.id}/ler/${chapter.volume == 0 ? '' : `vol-${chapter.volume}-`}cap-${chapter.id}`}>
                                                    <button className="btn btn-ghost btn-xs">
                                                        <IoShareSocialOutline size={20} />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
                <Link href={`/admin/series/${serieData.id}/new`}>
                    <button className="btn btn-circle btn-success fixed bottom-4 right-4">
                        <span className="material-icons">
                            <IoAdd size={30} />
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
