// data.ts
// Definimos la interfaz SubOpcion
export interface SubOpcion {
    id: string;
    titulo: string;
    contenido: string;
  }
  // Definimos la interfaz Opcion
  export interface Opcion {
    id: string;
    titulo: string;
    contenido: string;
    subopciones: SubOpcion[];
  }
  
  // Definimos un arreglo de opciones
  export const opciones: Opcion[] = [
    {
        id: "opcion1",
        titulo: "Tus Publicaciones",
        contenido: "Información sobre cómo Crear tu Perfil...",
        subopciones: [
          {
            id: "subopcion1",
            titulo: "Cómo Crear una Publicación",
            contenido: "Hola!, aqui te vamos a ayudar a como crear una publicacion en nuestra plataforma, " +
              "para ello sigue los siguientes pasos: " 
          },
  
          { id: "subopcion2", 
            titulo: "Como Editar tu Publicacion", 
            contenido: "Hola!, en esta seccion te enseñaremos a como editar tu publicacion, " +
              "para ello sigue los siguientes pasos: "
          },
  
          { id: "subopcion4", 
            titulo: "Como Eliminar tu Publicacion", 
            contenido: "Hola!, en esta seccion te vamos a enseñar como Eliminar tus publicaicones "+
            "para ello sigue los siguientes pasos: " 
          },
          { id: "subopcion15", 
            titulo: "Como Reportar una Publicacion", 
            contenido: "Hola!, en esta seccion te vamos a enseñar como Reportar las publicaicones "+
            "para ello sigue los siguientes pasos: " 
          },
  
          { id: "subopcion3", 
            titulo: "Como Cambiar la Privacidad de tu Publicacion", 
            contenido: "Hola!, en esta seccion te vamos a enseñar como cambiar la privacidad de tus publicaicones "+
              "para ello sigue los siguientes pasos: " 
            },
  
  
          { id: "subopcion5", 
            titulo: "Como Agregar un comentario", 
            contenido: "Hola!, en esta seccion te vamos a enseñar como agregar comentarios a tus publicaicones "+
              "para ello sigue los siguientes pasos: " 
            },
            { id: "subopcion13", 
              titulo: "Como Eliminar un comentario", 
              contenido: "Hola!, en esta seccion te vamos a enseñar como Eliminar comentarios a tus publicaicones "+
                "para ello sigue los siguientes pasos: " 
              },
              { id: "subopcion14", 
                titulo: "Como Editar un comentario", 
                contenido: "Hola!, en esta seccion te vamos a enseñar como Editar comentarios a tus publicaicones "+
                  "para ello sigue los siguientes pasos: " 
                },
                { id: "subopcion16", 
                  titulo: "Como Reportar un comentario", 
                  contenido: "Hola!, en esta seccion te vamos a enseñar como Reportar comentarios a tus publicaicones "+
                    "para ello sigue los siguientes pasos: " 
                  },
  
                { id: "subopcion6", 
                  titulo: "Como Reaccionar a las plublicaciones",
                  contenido: "Hola!, en esta seccion te vamos a enseñar como reaccionar a las publicaciones "+
                    "para ello sigue los siguientes pasos: " 
                  }, 
                { id: "subopcion7", 
                  titulo: "Como Enviar publicaciones",
                  contenido: "Hola!, en esta seccion te vamos a enseñar como enviar publicaciones "+
                    "a tus contactos para ello sigue los siguientes pasos: " 
                  }, 
  
        ],
      },
      {
        id: "opcion2",
        titulo: "Administración de cuenta",
        contenido: "Información sobre cómo registrarse...",
        subopciones: [
                  { 
                    id: "subopcion8", 
                    titulo: "Recuperar Contraseña", 
                    contenido: "Si te llega a pasar de que se te olvido la contraseña de tu cuenta, no te preocupes, " +
                      "ya que al equivocarte más de tres intentos se te redireccionará a la página de recuperar " +
                      "contraseña. Esto te permitirá ingresar tu correo, y en el mismo se te enviará un código " +
                      "que deberás ingresar para poder acceder al apartado de cambiar contraseña.",
                    },
                  { id: "subopcion9", titulo: "Paso 2", contenido: "Información del paso 2..." },
        ],
      },
      {
        id: "opcion3",
        titulo: "Tus Chats",
        contenido: "Información sobre cómo recuperar la contraseña...",
        subopciones: [
          
                { id: "subopcion11", 
                  titulo: "Cambiemos el tema de tu interfaz!", 
                  contenido: "Hola!, en esta seccion te vamos a enseñar como cambiar el tema de tu interfaz en nuestra plataforma, " +
                    "para ello sigue los siguientes pasos: "
                },
        
                { id: "subopcion10", 
                  titulo: "Como Crear grupo de Chat",
                  contenido: "Hola!, en esta seccion te vamos a enseñar como crear un grupo de chat en nuestra plataforma, " + 
                    "para ello sigue los siguientes pasos: " 
                  },
        
                { id: "subopcion12", 
                  titulo: "Como Agregar un nuevo integrante al grupo", 
                  contenido: "Hola!, en esta seccion te vamos a enseñar como agregar un nuevo integrante a tu grupo de chat en nuestra plataforma, " +
                    "para ello sigue los siguientes pasos: "},
                { id: "subopcion17", 
                  titulo: "Como enviar una solicitud de amistad", 
                  contenido: "Hola!, en esta seccion te vamos a enseñar como enviar una solicitud de amistad en nuestra plataforma, " +
                  "para ello sigue los siguientes pasos: "},
        ],
      },
  ];