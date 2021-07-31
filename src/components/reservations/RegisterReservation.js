import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  eventAddNew,
  eventUpdated,
} from "../../actions/events";
import documentTypes from "../../constants/documentsTypes";
import moment from "moment";
import { edifficeService } from "../../services/edifficeService";

export const RegisterReservation = () => {

    const now = moment().minutes(0).seconds(0).add(1, "hours");

    const initialState = {
        title: "",
        notes: "",
        start: now.toDate(),
        end: now.add(1, "hours").toDate(),
      };
    
      const [dateStart, setDateStart] = useState(now.toDate());
      const [dateEnd, setDateEnd] = useState(now.add(1, "hours").toDate());
      const [formValues, setFormValues] = useState(initialState);
      const [edifficeList, setedifficeList] = useState([])
      const dispatch = useDispatch();
      const { activeEvent } = useSelector((state) => state.calendar);
    
      const { title, notes, startDate, endDate } = formValues;

      useEffect(()=> {
        getAllEdifices()
      }, [])
    
      useEffect(() => {
        if (activeEvent) {
          setFormValues(activeEvent);
        } else {
          setFormValues(initialState);
        }
      }, [activeEvent]);
    
      const handleStartDateChange = (event) => {
        setDateStart(event);
        setFormValues((old) => ({
          ...old,
          start: event,
        }));
      };
    
      const handleEndDateChange = (event) => {
        setDateEnd(event);
        setFormValues((old) => ({
          ...old,
          end: event,
        }));
      };
    
      const handleInputChange = ({ target }) => {
        setFormValues((old) => ({
          ...old,
          [target.name]: target.value,
        }));
      };
    
      const handleSubmitForm = (e) => {
        e.preventDefault();
        const momentStart = moment(startDate);
        const momentEnd = moment(endDate);
        if (!momentStart.isSameOrAfter(momentEnd)) {
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
    };

    const getAllEdifices = () => {
      const response = edifficeService.getAll()
        .then()
        console.log(respo)
    }

    return (
        <div>
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="row">
                    <div className="col-sm">
                      <div className="form-group">
                          <label>Tipo Documento</label>
                          <select className="form-control">
                          {
                              documentTypes.map(({id, value}) => (
                              <option value={id} selected={id === 'CC' ? 'selected' : ''}>{value}</option>
                              ))
                          }
                          </select>
                      </div>
                      </div>
                      <div className="col-sm">
                      <div className="form-group">
                          <label>No. Documento</label>
                          <input className="form-control" type='number'/>
                      </div>
                    </div>
                </div>
                
                
                <div className="row">
                    <div className="col-sm">
                    <div className="form-group">
                        <label>Nombres</label>
                        <input className="form-control"/>
                    </div>
                    </div>
                    <div className="col-sm">
                    <div className="form-group">
                        <label>Apellidos</label>
                        <input className="form-control"/>
                    </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm">
                    <div className="form-group">
                        <label>Edificio</label>
                        <select className="form-control">
                        <option></option>
                        </select>
                    </div>
                    </div>
                    <div className="col-sm">
                    <div className="form-group">
                        <label>Apartamento</label>
                        <select className="form-control">
                        <option></option>
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
        </div>
    )
}
