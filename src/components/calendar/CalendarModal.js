import React, { useState, useEffect } from "react";
import moment from "moment";

import Modal from "react-modal";
import "../../styles/modal.css";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
  eventAddNew,
  eventClearActive,
  eventUpdated,
} from "../../actions/events";
import documentTypes from "../../constants/documentsTypes";
import { edifficeService } from "../../services/edifficeService";
import { apartmentService } from "../../services/apartmentsService";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: 'auto',
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");

const CalendarModal = () => {
  const initialState = {
    documentType: "",
    documentNumber: "",
    propertyId: "",
    edifficeId: "",
    startDate: "",
    endDate: "",
    total: "",
    payment: "",
    client: "",
    official: "",
    registerDate: now.toDate(),
  };

  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [formValues, setFormValues] = useState(initialState);
  const [edifficeList, setEdifficeList] = useState([]);
  const [listApartments, setListApartments] = useState([]);
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const { notes, startDate, endDate } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initialState);
    }
  }, [activeEvent]);

  useEffect(() => {
    getAllEdiffices();
  }, []);

  useEffect(() => {
    if (formValues.edifficeId) {
      getApartmentList(formValues.edifficeId)
    }
    console.log(formValues)
  }, [formValues])

  const getAllEdiffices = async () => {
    const res = await edifficeService.getAll();
    setEdifficeList(res?.listEdiffices);
  };

  const getApartmentList = async (idifficeId) => {
    const res = await apartmentService.getApartmentByEdiffice(idifficeId);
    setListApartments(res?.apartmentsList)
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActive());
    setFormValues(initialState);
  };

  const handleStartDateChange = (event) => {
    setDateStart(event);
    setFormValues((old) => ({
      ...old,
      startDate: event,
    }));
  };

  const handleEndDateChange = (event) => {
    setDateEnd(event);
    setFormValues((old) => ({
      ...old,
      endDate: event,
    }));
  };

  const handleInputChange = (e) => {
    const {target} = e
    setFormValues((old) => ({
      ...old,
      [target.name]: target.value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(startDate);
    const momentEnd = moment(endDate);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire({
        title: "Error",
        text: "La fecha final debe ser mayor a la fecha inicial",
        icon: "error",
      });
    }

    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "2313",
            name: "Fernando",
          },
        })
      );
    }

    closeModal();
  };

  return (
    <diV>
      <Modal
        isOpen={modalOpen}
        style={customStyles}
        onRequestClose={closeModal}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h4> {activeEvent ? "Editar reserva" : "Nueva reserva"} </h4>
        <hr />
        <form className="container" onSubmit={handleSubmitForm}>
          <div className="row">
            <div className="col-sm">
              <div className="form-group">
                <label>Tipo Documento</label>
                <select className="form-control" name="documentType" onChange={handleInputChange}>
                  {documentTypes.map(({ id, value }) => (
                    <option value={id} selected={id === "CC" ? "selected" : ""}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-sm">
              <div className="form-group">
                <label>No. Documento</label>
                <input className="form-control" type="number" name="documentNumber" onChange={handleInputChange}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm">
              <div className="form-group">
                <label>Nombres</label>
                <input className="form-control" name="documentNumber" onChange={handleInputChange}/>
              </div>
            </div>
            <div className="col-sm">
              <div className="form-group">
                <label>Apellidos</label>
                <input className="form-control" name="documentNumber" onChange={handleInputChange}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm">
              <div className="form-group">
                <label>Edificio</label>
                <select className="form-control" name="edifficeId" onChange={handleInputChange}>
                  <option value="" disabled selected>Seleccione una opción</option>
                  { edifficeList && 
                    edifficeList.map(({ name, _id }) => (
                      <option key={_id} value={_id}>{name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-sm">
              <div className="form-group">
                <label>Apartamento</label>
                <select className="form-control" name="propertyId" onChange={handleInputChange} key={formValues.edifficeId} disabled={!listApartments}>
                  <option value="" disabled selected>Seleccione una opción</option>
                  { listApartments &&
                    listApartments.map(({ name, _id }) => (
                      <option key={_id} value={_id}>{name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm">
              <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker
                  onChange={handleStartDateChange}
                  value={dateStart}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm">
              <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker
                  onChange={handleEndDateChange}
                  value={dateEnd}
                  minDate={dateStart}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm">
              <div className="form-group">
                <textarea
                style={{height: '80px'}}
                  type="text"
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={notes}
                  onChange={handleInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">
                  Información adicional
                </small>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </diV>
  );
};

export default CalendarModal;
