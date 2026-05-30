import { useState } from "react";


function PersonalForm(){

    const [enlaces, setEnlaces] = useState([""]);

    const agregarEnlace = () =>{
        setEnlaces([...enlaces, ""]);
    }

    const handleEnlaceChange = (index, value) => {
        const nuevosEnlaces = [...enlaces];
        nuevosEnlaces[index] = value;
        setEnlaces(nuevosEnlaces);
    };


    return(
        <form>
            <label>Nombre completo: </label>
            <input type="text" spellCheck="true" name="nombre"/>

            <label>Area de especialidad:</label>
            <input type="text" spellCheck="true" name="especialidad"/>

            <label>Pais:</label>
            <input type="text" spellCheck="true" name="pais"/>

            <label>Estado: </label>
            <input type="text" spellCheck="true" name="estado"/>
            
            <label>Municipio: </label>
            <input type="text" spellCheck="true" name="municipio" placeholder="Puedes dejar este campo vacio"/>

            <label>Correo electronico: </label>
            <input type="email" name="correo"/>

            <label>Telefono: </label>
            <input type="tel" name="telefono" placeholder="Puedes dejar este campo vacio"/>

            <label>Perfil profesional: </label>
            <textarea spellCheck="true" name="perfil"></textarea>

            <label>Enlaces profesionales: </label>
            {enlaces.map((enlace, index) => (
                <input key={index} type="url" value={enlace} placeholder="https://..." onChange={(e) => handleEnlaceChange(index, e.target.value)}/>
            ))}
            <button type="button" onClick={agregarEnlace}>+ Agregar enlace</button>


        </form>
    );
}

export default PersonalForm;