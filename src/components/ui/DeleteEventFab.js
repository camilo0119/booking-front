import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { eventDeleted } from '../../actions/events'

export const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleDeleteEvent = () => {
        Swal.fire({
            title: 'Esta seguro?',
            text: 'Esta seguro que desea eliminar el evento?',
            icon: 'question',
            confirmButtonText: 'Si',
            showDenyButton: true,
            denyButtonText: 'No'
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire('Eliminado', '', 'success')
                dispatch(eventDeleted())
            }
        })
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDeleteEvent}>
            <i className="fas fa-trash"></i>
            <span>  Borrar evento</span>
        </button>
    )
}
