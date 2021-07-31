import React, { useState, useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import { useSelector } from "react-redux";
import { edifficeService } from "../../../services/edifficeService";
import { seasonService } from "../../../services/seasonService";
import { apartmentService } from "../../../services/apartmentsService";
import Swal from "sweetalert2";
import * as yup from 'yup';
import { apartmentSchema } from "../../models/validations/apartmentValidation";

const ApartmentRegister = () => {
  const {auth} = useSelector((state) => state);

  const initialState = {
    name: "",
    ediffice: "",
    owner: auth?.uid,
    seasonId: "",
    seasonLowPrice: 0,
    seasonMidPrice: 0,
    seasonHighPrice: 0,
    holidayPrice: 0,
  };

  const [formData, handleInputChange, reset] = useForm(initialState);
  const [edifficeList, setEdifficeList] = useState([]);
  const [seasonList, setSeasonList] = useState([]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    getAllEdiffices();
    getAllSeason();
  }, []);

  const getAllEdiffices = async () => {
    const res = await edifficeService.getAll();
    setEdifficeList(res?.listEdiffices);
  };

  const getAllSeason = async () => {
    const res = await seasonService.getAll();
    setSeasonList(res?.seasonsList);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const isValidForm = await apartmentSchema.isValid(formData)
    if (isValidForm) {
        try {
            const res = await apartmentService.save(formData);
            if (res.ok) {
                Swal.fire({
                    title: 'Apartamento Guardado!',
                    text: 'La información del apartamento ha sido almacenada correctamente',
                    icon: 'success'
                })
            }
        } catch (error) {
            Swal.fire({
                title: 'Lo sentimos!',
                text: 'Ha ocurrido un error guardando el apartamento',
                icon: 'error'
            })
        }
    } else {
        Swal.fire({
            title: 'Formulario incompleto!',
            text: 'Por favor complete todos los campos obligatorios',
            icon: 'warning'
        })
    }
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="row">
          <div className="col-sm">
            <div className="form-group">
              <label>Número o nombre apartamento</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                required="true"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label>Edificio</label>
              <select
                className="form-control"
                name="ediffice"
                onChange={handleInputChange}
                value={formData.ediffice}
                required="true"
              >
                <option value="" disabled selected>Seleccione una opción</option>
                {edifficeList && edifficeList.map(({ _id, name }) => (
                  <option value={_id} key={_id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="form-group">
              <label>Temporada</label>
              <select
                className="form-control"
                name="seasonId"
                onChange={handleInputChange}
              >
                <option value="" disabled selected>Seleccione una opción</option>
                {seasonList.map(({ _id, name }) => (
                  <option value={_id} key={_id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <label>Tarifa festivo</label>
              <input
                className="form-control"
                type="number"
                name="holidayPrice"
                onChange={handleInputChange}
                value={formData.holidayPrice}
              />
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <label>Temp. Baja</label>
              <input
                className="form-control"
                type="number"
                name="seasonLowPrice"
                onChange={handleInputChange}
                value={formData.seasonLowPrice}
              />
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <label>Temp. Media</label>
              <input
                className="form-control"
                type="number"
                name="seasonMidPrice"
                onChange={handleInputChange}
                value={formData.seasonMidPrice}
              />
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <label>Temp. Alta</label>
              <input
                className="form-control"
                type="number"
                name="seasonHighPrice"
                onChange={handleInputChange}
                value={formData.seasonHighPrice}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-2">
            <button
              onClick={reset}
              className="btn btn-outline-danger btn-block"
            >
              <i className="fas fa-eraser"></i>
              <span> Limpiar</span>
            </button>
          </div>
          <div className="col-2">
            <button type="submit" className="btn btn-primary btn-block">
              <i className="far fa-save"></i>
              <span> Guardar</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApartmentRegister;
