"use client";
import { useEffect, useState } from "react";
import { opciones, Opcion, SubOpcion } from "./data";
import { OptionItem } from "./OptionItem";
import MobileView from "../components/MobileView";
import "./AyudaMobile.css";


interface SearchResult extends SubOpcion {
  parentId: string;
}

export default function Ayuda() {
  const [selectedSubOption, setSelectedSubOption] = useState<string | null>(null);
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  

  interface SearchQuery {
    query: string;
  }

  interface SearchResult {
    id: string;
    titulo: string;
    contenido?: string;
    parentId: string;
  }

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
  
    /* Busca en las subopciones de cada opción si el título de la subopción incluye la query */
    /* Si la query está en el título de la subopción, se agrega a los resultados */
    /* Se filtran los resultados para que solo se muestren las subopciones que incluyan la query */
    /* Se actualiza el estado de los resultados de la búsqueda */
    const results: SearchResult[] = opciones
      .flatMap((opcion) =>
        opcion.subopciones.map((subopcion) => ({
          ...subopcion,
          parentId: opcion.id,
        }))
      )
      .filter((subopcion) =>
        subopcion.titulo.toLowerCase().includes(query.toLowerCase())
      );
  
    setSearchResults(results);
  };
 /* Función que maneja el click en una opción */
 /* Si la opción está expandida, la contrae */
  /* Si la opción no está expandida, la expande */
  const handleOptionClick = (id: string): void => {
    setExpandedOption(expandedOption === id ? null : id);
  };

  interface SubOptionClickHandler {
    (id: string): void;
  }

  const handleSubOptionClick: SubOptionClickHandler = (id) => {
    setSelectedSubOption(id);
    setShowMenu(false); // Cerrar el menú al seleccionar una opción
  };
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowMenu(false);
    if (!showSearch) {  // Limpia la búsqueda al abrir
      setSearchQuery("");
      setSearchResults([]);
    }
  };

// Modifica la función toggleMenu:
const toggleMenu = () => {
  setShowMenu(!showMenu);
  setShowSearch(false);  // Cierra la búsqueda al abrir menú
};
  /* Renderiza el componente Ayuda */
  /* Muestra la barra de búsqueda y las opciones y subopciones */
  /* Muestra las imágenes correspondientes a la subopción seleccionada */

  return (
    <MobileView>
    <div className="mobile-view">
      {/* TopBar fija */}
      <div className="top-bar">
        <img src="/imgs/logo.svg" alt="Logo" className="profile-image" 
             style={{ width: "50px", height: "50px" }} />
        <h1 className="app-title">Ayuda GatitoPlis</h1>
        <div className="icons-container">
          <div className="menu-icon" onClick={toggleMenu}>
            <svg viewBox="0 0 24 24" fill="#3c3c3c">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </div>
          <div className="search-icon" onClick={toggleSearch}>
            <svg viewBox="0 0 24 24" fill="#3c3c3c">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
        </div>
      </div>


        {/* Barra de búsqueda desplegable */}
        <div className={`search-container ${showSearch ? 'active' : ''}`}>
          <input
            type="text"
            placeholder="Buscar..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="search-result-item"
                  onClick={() => {
                    setExpandedOption(result.parentId);
                    setSelectedSubOption(result.id);
                    setShowSearch(false);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  {result.titulo}
                </div>
              ))}
            </div>
          )}
        </div>


      {/* Overlay y menú lateral */}
      <div className="content-wrapper">
      <div className={`overlay ${showMenu ? 'active' : ''}`} onClick={toggleMenu} />
        <div className={`options-column ${showMenu ? 'active' : ''}`}>
          <ul>
            {opciones.map((opcion) => (
              <li key={opcion.id}>
                <div 
                  className="option-header"
                  onClick={() => handleOptionClick(opcion.id)}
                >
                  <span>{opcion.titulo}</span>
                  <span className="arrow">{expandedOption === opcion.id ? '▼' : '►'}</span>
                </div>
                {expandedOption === opcion.id && (
                  <ul className="subopciones">
                    {opcion.subopciones.map((subopcion) => (
                      <li
                        key={subopcion.id}
                        className={`subopcion ${selectedSubOption === subopcion.id ? 'selected' : ''}`}
                        onClick={() => handleSubOptionClick(subopcion.id)}
                      >
                        {subopcion.titulo}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

                  <div className="info-column">
            {selectedSubOption ? ( // Solo renderiza si hay una subopción seleccionada
              <h2>
                {opciones
                  .find((opcion) =>
                    opcion.subopciones.some((subopcion) => subopcion.id === selectedSubOption)
                  )
                  ?.subopciones.find((subopcion) => subopcion.id === selectedSubOption)?.titulo}
              </h2>
            ) : (
              <p className="default-message"> </p>
            )}
            <p>
              {selectedSubOption &&
                opciones
                  .find((opcion) =>
                    opcion.subopciones.some((subopcion) => subopcion.id === selectedSubOption)
                  )
                  ?.subopciones.find((subopcion) => subopcion.id === selectedSubOption)?.contenido}
            </p>

          {/* Cómo Crear una Publicación */}
          {selectedSubOption === "subopcion1" && ( // Solo muestra las imágenes si la subopción es "Recuperar Contraseña"
            <>
              <div className="image-container">
                <p>Paso 1: Al darle click a Crear publicacion se te mostara una interefaz como esta donde podras escribir
                  el "Titulo", "descripcion" y "subir una imagen" para tu publicacion.
                </p>
                <img
                  src="/imgs/Crearp1.png" // Ruta de la imagen
                  alt="Crearp1"
                />
                <p>Como puedes notar el boton de publicar esta desactivado ya te diremos el porque!</p>
              </div>

              <div className="image-container">
                <p>Paso 2: Necesitas llenar los campos de tu publicacion para que el boton publicar se active como en la siguiente imagen!</p>
                <img
                  src="/imgs/Crearp2.png" // Ruta de la imagen
                  alt="Crearp2"
                />
                <p>Con los campos llenos vamos a darle click al boton!</p>
              </div>
              <div className="image-container">
              <p>Paso 3: Al darle click al boton publicar se te mostrara una ventana como esta, donde te mostrara tu publicacion
                y te dara la opcion de editarla o eliminarla. </p> 
                <img
                  src="/imgs/Crearp3.png" // Ruta de la imagen
                  alt="Crearp3"
                />
                 <p>En la siguiente seccion te enseñaremos a Editar tu publicacion!</p>
              </div>
            </>
          )}

          {/* Cómo Editar una Publicación */}
          {selectedSubOption === "subopcion2" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: Como puedes ver en la imagen de abajo te señalamos el boton editar dando click en los 3 botones se despliega el menu, vamos dale click con el mouse!</p>
                
                <img
                  src="/imgs/Editarp1.jpg" // Ruta de la imagen
                  alt="Editarp1"
                />
                <p>ahora se te mostrara la interefaz para poder editar tu publicacion</p>
              </div>

              <div className="image-container">
                <p>Paso 2: Excelente ahora solo tienes que cambiar la informacion que necesitas!</p>
                <img
                  src="/imgs/Editarp2.png" // Ruta de la imagen
                  alt="Editarp2"
                />
                <img
                  src="/imgs/Editarp3.png" // Ruta de la imagen
                  alt="Editarp3"
                />
                <p>Con los campos ya editados vamos a darle click al boton Guardar Cambios!</p>
              </div>
              <div className="image-container">
              <p>Paso 3: Al darle click al boton Guardar Cambios se te mostrara un mensaje que tus cambios se han guardado exitosamente!. </p> 
                <img
                  src="/imgs/Editarp4.png" // Ruta de la imagen
                  alt="Editarp4"
                />
                 <p>En la siguiente seccion te enseñaremos a Como Reportar una Publicacion!</p>
              </div>
            </>
          )}


                {/* Como Reportar una Publicacion */}
                {selectedSubOption === "subopcion15" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: Como puedes ver en la imagen de abajo te señalamos el boton Reportar publicacion, vamos dale click con el mouse!</p>
                
                <img
                  src="/imgs/ReportP.jpg" // Ruta de la imagen
                  alt="ReportP"
                />
                <p>ahora se te mostrara la interefaz para Hacer el reporte de una publicacion</p>
              </div>

              <div className="image-container">
                <p>Paso 2: Aqui se muestran todas las opciones disponibles para reportar!</p>
                <img
                  src="/imgs/ReportP1.jpg" // Ruta de la imagen
                  alt="ReportP1"
                />
                <img
                  src="/imgs/ReportP2.jpg" // Ruta de la imagen
                  alt="ReportP2"
                />
                <p>Al elegir una opcion se nos activara el boton listo para enviar el reporte</p>
              </div>
              <div className="image-container">
              <p>Paso 3: Al darle click al boton listo se enviara el reporte y te mostrara el siguiente mensaje. </p> 
                <img
                  src="/imgs/ReportP3.jpg" // Ruta de la imagen
                  alt="ReportP3"
                />
                 <p>En la siguiente seccion te enseñaremos a Eliminar tu publicacion!</p>
              </div>
            </>
          )}
          {/* Cómo cambiar la privacidad una Publicación */}
          {selectedSubOption === "subopcion3" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: Como puedes ver en la imagen de abajo te señalamos el boton Editar Destinatario, vamos dale click con el mouse!</p>
                
                <img
                  src="/imgs/EditarD1.png" // Ruta de la imagen
                  alt="EditarD1"
                />
                <p>ahora se te mostrara la interefaz para poder cambiar la privacidad tu publicacion</p>
              </div>

              <div className="image-container">
                <p>Paso 2: Como puedes ver tienes 3 opciones!, que tu publicacion se quede publica, que solo 
                  se comparta con tus amigos, o poder elegir quien quieres que solo vea tu publicacion</p>
                <img
                  src="/imgs/EditarD2.png" // Ruta de la imagen
                  alt="EditarD2"
                />
                
                <p>Vamos a eleguir amigos en concreto!</p>
                <img
                  src="/imgs/EditarD5.png" // Ruta de la imagen
                  alt="EditarD5"
                />
              </div>
              <div className="image-container">
              <p>Paso 3: Como puedes ver ahora te aparece tu lista de amigos . </p> 
                <img
                  src="/imgs/EditarD3.png" // Ruta de la imagen
                  alt="EditarD3"
                />
                
              </div>
              <div className="image-container">
              <p>Paso 4: vamos a eleguir que solo 2 puedan ver nuestra publicacion! </p> 
                <img
                  src="/imgs/EditarD4.png" // Ruta de la imagen
                  alt="EditarD4"
                />
                 <p>Al hacer click en listo se nos cambiara la privacidad de tu publicacion y te mostrara el siguiente mensaje!</p>
              
              <img
                  src="/imgs/EditarD6.png" // Ruta de la imagen
                  alt="EditarD6"
                />
                <p>Excelente, en la siguiente seccion aprenderas a Agregar un Comentario! </p>
                </div>
            </>
          )}





          {/* Agregar comentarios */}
          {selectedSubOption === "subopcion5" && ( // Solo muestra las imágenes si la subopción es "Recuperar Contraseña"
            <>
              <div className="image-container">
                <p>Paso 1: En tu publicacion o en cualquier otra tendras este icono al que 
                  podras hacerle click para que te despliegue la opcion de comentar</p>
                <img
                  src="/imgs/Comentar.png" // Ruta de la imagen
                  alt="Comentar"
                />
              </div>

              <div className="image-container">
                <p>Paso 2: como puedes ver en la siguiente imagen podras escribir comentarios en tus publicaciones</p>
                <img
                  src="/imgs/Come1.png" // Ruta de la imagen
                  alt="Come1"
                />
                <p>Vamos a agregar algunos comentarios recuerda dar click en el boton de comentar para poder crear tus comentarios.</p>
              </div>
              <div className="image-container">
              <p>Paso 3: como puedes ver hemos agregados dos comentarios</p>
                <img
                  src="/imgs/Come2.png" // Ruta de la imagen
                  alt="Come2"
                />
                
              </div>
              <div className="image-container">
              <p>Cuando creas un comentario te aparecera esta notificacion que se ha creado correctamente</p>
                <img
                  src="/imgs/Come3.png" // Ruta de la imagen
                  alt="Come2"
                />
                 <p>En la siguiente seccion te vamos a explicar como Eliminar un comentario</p>
              </div>
            </>
          )}

          {/* Agregar reacciones */}
          {selectedSubOption === "subopcion6" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: En tu publicacion veras estos tipo de reaccioness disponibles</p>
                <img
                  src="/imgs/Reac1.png" // Ruta de la imagen
                  alt="Reac1"
                />
              </div>

              <div className="image-container">
                <p>vamos a darle me gusta haciendo click en la siguiente reaccion</p>
                <img
                  src="/imgs/Reacmegusta.png" // Ruta de la imagen
                  alt="Reacmegusta"
                />
                <p>asi se vera cuando hagamos click un mensaje de que hemos reaccionado correctamente</p>
                <img
                  src="/imgs/Reac7.png" // Ruta de la imagen
                  alt="Reac7"
                />
                <p>Ahora reaccionaremos con un corazon a las publicaciones</p>
                <img
                  src="/imgs/Reacmeencanta.png" // Ruta de la imagen
                  alt="Reacmeencanta"
                />
                <p>Asi se vera cuando reaccionemos correctamente</p>
                <img
                  src="/imgs/Reac2.png" // Ruta de la imagen
                  alt="Reac2"
                />
                <p>Ahora reaccionaremos tristemente :c</p>
                <img
                  src="/imgs/Reactriste.png" // Ruta de la imagen
                  alt="Reactriste"
                />
                <p>Asi se vera cuando reaccionemos correctamente</p>
                <img
                  src="/imgs/Reac8.png" // Ruta de la imagen
                  alt="Reac8"
                />
                <p>Ahora guardaremos la publicacion</p>
                <img
                  src="/imgs/Reacguardar.png" // Ruta de la imagen
                  alt="Reacguardar"
                />
                <p>Asi se vera cuando reaccionemos correctamente</p>
                <img
                  src="/imgs/Reac8.png" // Ruta de la imagen
                  alt="Reac8"
                />
                <p>Ahora repostearemos la publicacion</p>
                <img
                  src="/imgs/Replicar.png" // Ruta de la imagen
                  alt="Replicar"
                />
                <p>Asi se vera cuando reaccionemos correctamente</p>
                <img
                  src="/imgs/Reac4.png" // Ruta de la imagen
                  alt="Reac4"
                />
                </div>
            </>
          )}

           {/* Enviar publicaciones */}
          {selectedSubOption === "subopcion7" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: En tu publicacion o en cualquier otra tendras este icono al que 
                  podras hacerle click para que envies tu publicacion a otros contactos</p>
                <img
                  src="/imgs/Reacenviar.png" // Ruta de la imagen
                  alt="Reacenviar"
                />
                <p>Paso 2: Se te desplegara la siguiente interfaz donde podras elejir a tus contactos para enviar la publicacion
                  elijamos a uno!
                </p>
                <img
                  src="/imgs/EnviarP2.png" // Ruta de la imagen
                  alt="EnviarP2"
                />
                <p>Paso 3: Eligienedo a nuestros contactos se nos activara el boton enviar, hagamos en click para 
                  enviar a nuestro gatito  
                </p>
                <img
                  src="/imgs/EnviarP3.png" // Ruta de la imagen
                  alt="EnviarP3"
                />
              <p>Paso 4: Nos aparecera un mensaje de que se ha enviado correctamente la publicacion</p>  
                
                <img
                  src="/imgs/EnviarP4.png" // Ruta de la imagen
                  alt="EnviarP4"
                />

              </div>
            </>
          )}

          {/* Eliminar comentarios*/}
          {selectedSubOption === "subopcion13" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: En tu publicacion abajo en la seccion de comentarios te saldra un icono como este que 
                  te permitira eliminar los comentarios</p>
                <img
                  src="/imgs/Comentario.jpg" // Ruta de la imagen
                  alt="Comentario"
                />
                <p>Paso 2: Se te desplegara la siguiente interfaz donde se te informara que estas a punto de eliminar un comentario!
                </p>
                <img
                  src="/imgs/Comentario1.jpg" // Ruta de la imagen
                  alt="Comentario1"
                />
                <p>Paso 3: Si elegiste eliminarlo te aparece sl siguiente mensaje:  
                </p>
                <img
                  src="/imgs/Comentario2.jpg" // Ruta de la imagen
                  alt="Comentario2"
                />
                 <p>En la siguiente seccion te explicaremos como Editar un Comentario    
                </p>

              </div>
            </>
          )}

          {/* Editar comentarios*/}
          {selectedSubOption === "subopcion14" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: En tu publicacion abajo en la seccion de comentarios te saldra un icono como este que 
                  te permitira editar los comentarios</p>
                <img
                  src="/imgs/EditC.jpg" // Ruta de la imagen
                  alt="EditC"
                />
                <p>Paso 2: Ahora se te permitira modificar los comentarios y tienes dos botones para "guardar" que al darle click
                  se guardara tu modificacion o "cancelar" que te permitira volver a la vista anterior
                </p>
                <img
                  src="/imgs/EditC1.jpg" // Ruta de la imagen
                  alt="EditC1"
                />
                <p>Paso 3: Vamos a editar el mensaje!  
                </p>
                <img
                  src="/imgs/EditC2.jpg" // Ruta de la imagen
                  alt="EditC2"
                />
                 <p>Paso 4: Si decidiste guardar tus cambios aparecera el siguiente mensaje!  
                </p>
                <img
                  src="/imgs/EditC3.jpg" // Ruta de la imagen
                  alt="EditC3"
                />
                 <p>En la siguiente seccion te explicaremos como Reaccionar a la Publicaiones    
                </p>

              </div>
            </>
          )}

          {/* Reportar comentarios*/}
          {selectedSubOption === "subopcion16" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: Como puedes ver en la imagen de abajo te señalamos el boton Reportar Comentario, vamos dale click con el mouse!</p>
                
                <img
                  src="/imgs/ReportC1.jpg" // Ruta de la imagen
                  alt="ReportC1"
                />
                <p>ahora se te mostrara la interefaz para Hacer el reporte de un Comentario</p>
              </div>

              <div className="image-container">
                <p>Paso 2: Aqui se muestran todas las opciones disponibles para reportar!</p>
                <img
                  src="/imgs/ReportP1.jpg" // Ruta de la imagen
                  alt="ReportP1"
                />
                <img
                  src="/imgs/ReportP2.jpg" // Ruta de la imagen
                  alt="ReportP2"
                />
                <p>Al elegir una opcion se nos activara el boton listo para enviar el reporte</p>
              </div>
              <div className="image-container">
              <p>Paso 3: Al darle click al boton listo se enviara el reporte y te mostrara el siguiente mensaje. </p> 
                <img
                  src="/imgs/ReportC2.jpg" // Ruta de la imagen
                  alt="ReportC2"
                />
                 <p>En la siguiente seccion te enseñaremos a Eliminar tu publicacion!</p>
              </div>
            </>
          )}
          {/* Eliminar Publicaciones*/}
          {selectedSubOption === "subopcion4" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: En tu publicacion al lado derecho aparecera la opcion de eliminar publicacion </p>
                <img
                  src="/imgs/EliminarP.jpg" // Ruta de la imagen
                  alt="EliminarP"
                />
                <p>Paso 2: Al hacer click en el icono de eliminar te aparecera un mensaje de que estas a punto de eliminar la publicacion!
                </p>
                <img
                  src="/imgs/EliminarP1.jpg" // Ruta de la imagen
                  alt="EliminarP1"
                />
                <p>Paso 3: si haz decidido eliminar la publicacion te aparecera el siguiente mensaje:  
                </p>
                <img
                  src="/imgs/EliminarP2.jpg" // Ruta de la imagen
                  alt="EliminarP2"
                />
                 <p>Paso 4: Si decidiste guardar tus cambios aparecera el siguiente mensaje!  
                </p>
                
                 <p>En la siguiente seccion te explicaremos como Cambiar la Privacidad de la Publicaiones    
                </p>

              </div>
            </>
          )}

          {/* Recuperar Contraseña */}
          {selectedSubOption === "subopcion8" && ( // Solo muestra las imágenes si la subopción es "Recuperar Contraseña"
            <>
              <div className="image-container">
                <p>Paso 1: Al ingresar mas de 3 veces la contraseña mal se te redireccionara al apartado recuperar contraseña</p>
                <img
                  src="/imgs/recucontra.png" // Ruta de la imagen
                  alt="Paso 1"
                />
                <p>Aqui se hara la validacion correspondiente, cuando todo se verifique te redireccionara a cambiar la contraseña.</p>
              </div>

              <div className="image-container">
                <p>Paso 2: Aqui podras cambiar la contraseña recuerda que la debes ingresar dos veces para una validacion correcta.</p>
                <img
                  src="/imgs/cambcontra.png" // Ruta de la imagen
                  alt="Paso 2"
                />
                <p>Una vez verificado, se te redireccionara a la pantalla de inicio de sesion.</p>
              </div>
              <div className="image-container">
                
                <img
                  src="/imgs/iniciosesion.png" // Ruta de la imagen
                  alt="Paso 3"
                />
                
              </div>
            </>
          )}

                {/* Crear Grupos*/}
                {selectedSubOption === "subopcion10" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: En la pagina de chat podremos ver este icono, al darle click se te desplegarala siguiente pantalla </p>
                <img
                  src="/imgs/Grupo.jpg" // Ruta de la imagen
                  alt="Grupo"
                />
                <p>Paso 2: en este apartado podremos crear el grupo, asignarle un nombre y agregar a los contactos que deseemos

                </p>
                
                <img
                  src="/imgs/Grupo1.jpg" // Ruta de la imagen
                  alt="Grupo1"
                />
                <p>Paso 3: si haz decidido a crear el grupo te aparecera el siguiente mensaje:  
                </p>
                <img
                  src="/imgs/Grupo2.jpg" // Ruta de la imagen
                  alt="Grupo2"
                />
                 

              </div>
            </>
          )}
          
               {/* Como Agregar un nuevo integrante al grupo*/}
               {selectedSubOption === "subopcion12" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: En la pagina de chat a la derecha podremos ver este icono, al darle click se te desplegarala siguiente pantalla </p>
                <img
                  src="/imgs/AGrupo.jpg" // Ruta de la imagen
                  alt="Grupo"
                />
                <p>Paso 2: en este apartado podremos agregar a un miebro adicional al grupo, solo necesitas seleccionar el contacto y darle click en el boton de agregar

                </p>
                
                <img
                  src="/imgs/AGrupo2.jpg" // Ruta de la imagen
                  alt="AGrupo2"
                />
                <img
                  src="/imgs/AGrupo4.jpg" // Ruta de la imagen
                  alt="AGrupo4"
                />
                <img
                  src="/imgs/AGrupo5.jpg" // Ruta de la imagen
                  alt="AGrupo5"
                />
                
                <p>Paso 3: si haz decidido a otro miembro al grupo te aparecera el siguiente mensaje:  
                </p>
                <img
                  src="/imgs/AGrupo6.jpg" // Ruta de la imagen
                  alt="AGrupo6"
                />
                 

              </div>
            </>
          )}
          
          {/* Como enviar una solicitud de amistad*/}
          {selectedSubOption === "subopcion17" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: En la pagina de chat a la izquierda podemos ver la seccion  Usuarios generales , al darle click se te desplegarala siguiente pantalla </p>
                <img
                  src="/imgs/Soli5.jpg" // Ruta de la imagen
                  alt="Soli5"
                />
                <p>Paso 2: aqui te apareceran todos los usuarios de la red social ahora solo tienes que darle click en enviar solicitud de amistad

                </p>
                
                <img
                  src="/imgs/Soli2.jpg" // Ruta de la imagen
                  alt="Soli2"
                />

                <p>Paso 3: si todo se hizo de manera correcta te aparecera el siguiente mensaje:  
                </p>
                <img
                  src="/imgs/Soli3.jpg" // Ruta de la imagen
                  alt="Soli3"
                />
                  <p>Paso 4: si intentas enviarle la misma solicitud a alguien que ya le enviaste la solicitud de amistad, te aparecera el siguiente mensaje:  
                </p>
                <img
                  src="/imgs/Soli4.jpg" // Ruta de la imagen
                  alt="Soli4"
                />

              </div>
            </>
          )}
                {/* Crear Grupos*/}
                {selectedSubOption === "subopcion11" && ( 
            <>
              <div className="image-container">
                <p>Paso 1: En la pagina de chat podremos ver esta opcion, al darle click se te cambiara al Tema Nocturno! </p>
                <img
                  src="/imgs/Noche.jpg" // Ruta de la imagen
                  alt="Noche"
                />
                <p>Paso 2: Ahora si te gusta la claridad podras volver a dar click en la opcion y volveras al tema claro

                </p>
                
                <img
                  src="/imgs/Dia.jpg" // Ruta de la imagen
                  alt="Dia"
                />
                
                 

              </div>
            </>
          )}
          

      </div>
      </div>

    </div>
    </MobileView>
  );
}