// Not currently in use, keeping this in case I need it later

import { useDialogs } from "@toolpad/core";
import { FaTrashAlt } from "react-icons/fa";


const ConfirmDeleteDialog: React.FC = () => {
    const dialogs = useDialogs()
    return (
        <button type="button" className="btn" onClick={async () => {
                const confirmed = await dialogs.confirm('Kategorie löschen?', {
                    okText: 'Löschen',
                    cancelText: 'Abbrechen',
                });
                if (confirmed) {
                }
                }}
            >
            <span className="icon"><FaTrashAlt/></span>
            <span className="btn-label">Löschen</span> 
        </button>
    )
};

export default ConfirmDeleteDialog