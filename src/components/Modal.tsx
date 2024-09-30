'use client';
interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode;
    className?: String;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children, className }) => {
    return (
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div className={`modal-box ${className}`}>
                <label
                    onClick={() => setModalOpen(false)}
                    className='btn btn-sm btn-circle absolute right-2 top-2'
                >
                    ✕
                </label>
                {children}
            </div>
        </div>
    );
};

export default Modal;