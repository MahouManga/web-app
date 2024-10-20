"use client";

import React, { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

const ProfilePage = () => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingFictitiousName, setIsEditingFictitiousName] = useState(false);
  const [email, setEmail] = useState("usuario@email.com");
  const [username, setUsername] = useState("harrykaray");
  const [fictitiousName, setFictitiousName] = useState("Nome Exemplo");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [privacyEnabled, setPrivacyEnabled] = useState(false);
  const [profileImage, setProfileImage] = useState("/noImage.jpg");
  const [bannerImage, setBannerImage] = useState("/noImage.jpg");

  const toggleEditEmail = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  const toggleEditUsername = () => {
    setIsEditingUsername(!isEditingUsername);
  };

  const toggleEditFictitiousName = () => {
    setIsEditingFictitiousName(!isEditingFictitiousName);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFictitiousNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFictitiousName(e.target.value);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-neutral text-base-content flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-5xl bg-base-200 rounded-xl shadow-lg p-8">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6 text-base-content">
          <ul>
            <li>Mahou Reader</li>
            <li>Perfil</li>
            <li className="font-bold">Editar Perfil</li>
          </ul>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="relative flex flex-col items-center">
            <img
              src={profileImage}
              alt="User Avatar"
              className="w-32 h-32 shadow-lg mb-4"
            />
            <button className="absolute bottom-0 right-0 btn btn-circle btn-sm bg-base-100 shadow-md" onClick={() => document.getElementById('profileImageInput').click()}>
              <FiRefreshCcw className="text-primary" />
            </button>
            <input type="file" id="profileImageInput" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
          </div>
          <div className="relative flex flex-col items-center w-full">
            <img
              src={bannerImage}
              alt="Banner"
              className="w-full h-32 object-cover shadow-lg mb-4"
            />
            <button className="absolute bottom-0 right-0 btn btn-circle btn-sm bg-base-100 shadow-md" onClick={() => document.getElementById('bannerImageInput').click()}>
              <FiRefreshCcw className="text-primary" />
            </button>
            <input type="file" id="bannerImageInput" accept="image/*" onChange={handleBannerImageChange} className="hidden" />
          </div>
        </div>

        {/* Profile Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Username Section */}
          <div className="form-control">
            <label className="label text-base-content">
              <span className="label-text font-semibold">Usuário</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className={`input input-bordered input-primary w-full ${isEditingUsername ? "" : "bg-base-300"}`}
                value={username}
                onChange={handleUsernameChange}
                disabled={!isEditingUsername}
              />
              <button
                className="btn btn-outline btn-sm"
                onClick={toggleEditUsername}
              >
                {isEditingUsername ? "Salvar" : "Editar"}
              </button>
            </div>
          </div>

          {/* Fictitious Name Section */}
          <div className="form-control">
            <label className="label text-base-content">
              <span className="label-text font-semibold">Nome (Fictício)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className={`input input-bordered input-primary w-full ${isEditingFictitiousName ? "" : "bg-base-300"}`}
                value={fictitiousName}
                onChange={handleFictitiousNameChange}
                disabled={!isEditingFictitiousName}
              />
              <button
                className="btn btn-outline btn-sm"
                onClick={toggleEditFictitiousName}
              >
                {isEditingFictitiousName ? "Salvar" : "Editar"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Email Section */}
          <div className="form-control">
            <label className="label text-base-content">
              <span className="label-text font-semibold">E-Mail</span>
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                className={`input input-bordered input-primary w-full ${isEditingEmail ? "" : "bg-base-300"}`}
                value={email}
                onChange={handleEmailChange}
                disabled={!isEditingEmail}
              />
              <button
                className="btn btn-outline btn-sm"
                onClick={toggleEditEmail}
              >
                {isEditingEmail ? "Salvar" : "Editar"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Notifications Section */}
                <div className="form-control">
                  <label className="label cursor-pointer text-base-content">
                    <span className="label-text font-semibold">Receber Notificações</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary ml-4"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
                  </label>
                </div>

              {/* Privacy Section */}
                <div className="form-control">
                  <label className="label cursor-pointer text-base-content">
                    <span className="label-text font-semibold">Privacidade</span>
                <input
                  type="checkbox"
                  className="toggle toggle-secondary ml-4"
                  checked={privacyEnabled}
                  onChange={() => setPrivacyEnabled(!privacyEnabled)}
                />
                  </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mb-12">
          <button className="btn btn-primary btn-wide bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:from-primary-focus hover:to-secondary-focus">
            Salvar Informações
          </button>
        </div>

        {/* Account Information & Change Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Account Information */}
          <div className="bg-base-100 p-6 rounded-xl shadow-md text-base-content">
            <h2 className="text-lg font-semibold mb-4">Dados de Criação de Conta</h2>
            <p>
              <span className="font-bold">Data de Criação:</span> 14/10/2024
            </p>
            <p>
              <span className="font-bold">Última alteração de senha:</span> 10/10/2024
            </p>
          </div>

          {/* Change Password */}
          <div className="bg-base-100 p-6 rounded-xl shadow-md text-base-content">
            <h2 className="text-lg font-semibold mb-4">Alterar Senha</h2>
            <div className="form-control mb-3">
              <input
                type="password"
                className="input input-bordered input-primary"
                placeholder="Senha atual"
              />
            </div>
            <div className="form-control mb-3">
              <input
                type="password"
                className="input input-bordered input-primary"
                placeholder="Nova senha"
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="password"
                className="input input-bordered input-primary"
                placeholder="Repita a senha"
              />
            </div>
            <button className="btn btn-primary btn-wide bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:from-primary-focus hover:to-secondary-focus">
              Atualizar Senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
