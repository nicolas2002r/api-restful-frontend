const navbarConfig = {
    "/": {
      title: "Inicio",
      links: [
        { name: "Home", path: "/" },
        { name: "Register", path: "/UserRegistration" },
        { name: "Teacher", path: "/AgendaDocente" },
      ],
    },
    "/UserRegistration": {
      title: "Registro de Usuario",
      links: [
        { name: "Home", path: "/" },
        { name: "Register", path: "/UserRegistration" },
      ],
    },
    "/AgendaDocente": {
      title: "Página del Docente",
      links: [
        { name: "Home", path: "/" },
        { name: "Teacher", path: "/AgendaDocente" },
      ],
    },
    // Agrega más rutas según sea necesario
  };
  
  export default navbarConfig;
  