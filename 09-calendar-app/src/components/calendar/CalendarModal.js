import React, { useEffect, useState } from 'react';
// seleccionar atributos del store
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

// posiciona el modal en el medio
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// para que pase la prueba del componente AppRouter
if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#root');
}

// momento actual + 1 hora
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    // selecciono del store el atributo ui.modalOpen para asignarlo al componente modal y inciar con ese valor

    // asigna la fecha/hora en fecha inicio
    const [dateStart, setDateStart] = useState(now.toDate());
    // asigna la fecha/hora en fecha fin
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    // cambia el state para validar que el titulo es valido
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);
    // extraigo los atributos para asignarlos a los inputs del form o validarlos
    const { notes, title, start, end } = formValues;

    useEffect(() => {
        // si no es null el evento activo asigno los valores al form del evento seleccionado
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent, setFormValues])

    // asigna el nuevo valor al input que coincida con el target.name
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }
    const closeModal = () => {
        // TODO: cerrar el modal
        // asigna false al state en uiReducer para cerrar el modal
        dispatch(uiCloseModal());
        // asigna null al activeEvent en el store
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    }
    // asigna la nueva fecha seleccionada    
    const handleStartDateChange = (e) => {
        setDateStart(e);
        // para asignar al state del form el nuevo valor al atributo start
        setFormValues({
            ...formValues,
            start: e
        })
    }
    // asigna la nueva fecha seleccionada
    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }
        // si esta activo el activeEvent significa que quiere editar el evento
        if (activeEvent) {
            dispatch(eventStartUpdate(formValues))
        } else {

            // envio los datos del form para guardarlos en la bd
            dispatch(eventStartAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();

    }

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {(activeEvent) ? 'Editar evento' : 'Nuevo evento'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        // si el titulo no es valido(false) marca error
                        className={`form-control ${!titleValid && 'is-invalid'} `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

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
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
