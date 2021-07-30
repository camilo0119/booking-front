import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(uiOpenModal())
    }

    return (
        <div className="add-booking" onClick={openModal}>
            <button className="btn btn-primary fab">
                <i className="fas fa-plus" />
            </button>
        </div>
    )
}
