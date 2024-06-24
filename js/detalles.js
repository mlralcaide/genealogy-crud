document.addEventListener("DOMContentLoaded", function () {
  const persona = JSON.parse(localStorage.getItem("personaSeleccionada"));

  if (persona !== null) {
    document.getElementById(
      "nombrePersona"
    ).textContent = `${persona.nombre} ${persona.apellido}`;
    document.getElementById("fechaNacimientoPersona").textContent =
      persona.eventos.fechaNacimiento;

    // Configurar la imagen si hay una URL proporcionada
    const imagenPersona = document.getElementById("imagenPersona");
    if (persona.imagenURL) {
      imagenPersona.src = persona.imagenURL;
      imagenPersona.style.display = "block";
    } else {
      imagenPersona.style.display = "none";
    }

    document.getElementById("fechaNacimiento").textContent =
      persona.eventos.fechaNacimiento;
    document.getElementById("lugarNacimiento").innerHTML = persona.eventos
      .lugarNacimiento
      ? persona.eventos.lugarNacimiento
      : '<button id="btnAgregarNacimiento" class="btn-add-data">+ ADD</button>';

    document.getElementById("fechaBautismo").innerHTML = persona.eventos
      .fechaBautismo
      ? persona.eventos.fechaBautismo
      : '<button id="btnAgregarBautismo" class="btn-add-data">+ ADD</button>';

    if (persona.eventos.fechaDefuncion) {
      document.getElementById("fechaDefuncion").textContent =
        persona.eventos.fechaDefuncion;
      document.getElementById("lugarDefuncion").innerHTML = persona.eventos
        .lugarDefuncion
        ? persona.eventos.lugarDefuncion
        : '<button id="btnAgregarDefuncion" class="btn-add-data">+ ADD</button>';
    } else {
      document.getElementById("fechaDefuncion").textContent = "Vive";
      document.getElementById("lugarDefuncion").textContent = "";
    }

    // Evento para el botón "Añadir" de Nacimiento
    document
      .getElementById("btnAgregarNacimiento")
      .addEventListener("click", function () {
        const ventanaEmergente = window.open(
          "",
          "ventanaEmergente",
          "width=400,height=300"
        );
        ventanaEmergente.document.body.innerHTML = `
              <h3>Fecha de Nacimiento</h3>
              <label for="fechaNacimiento">Fecha:</label>
              <input type="date" id="fechaNacimiento">
              <br>
              <label for="lugarNacimiento">Lugar:</label>
              <input type="text" id="lugarNacimiento">
              <br>
              <button id="guardarNacimiento">Guardar</button>
              <button id="cancelarNacimiento">Cancelar</button>
          `;

        // Evento para el botón "Guardar" de Nacimiento
        ventanaEmergente.document
          .getElementById("guardarNacimiento")
          .addEventListener("click", function () {
            const fechaNacimiento =
              ventanaEmergente.document.getElementById("fechaNacimiento").value;
            const lugarNacimiento =
              ventanaEmergente.document.getElementById("lugarNacimiento").value;
            persona.eventos.fechaNacimiento = fechaNacimiento;
            persona.eventos.lugarNacimiento = lugarNacimiento;
            localStorage.setItem(
              "personaSeleccionada",
              JSON.stringify(persona)
            );
            document.getElementById("fechaNacimiento").textContent =
              fechaNacimiento;
            document.getElementById("lugarNacimiento").textContent =
              lugarNacimiento;
            ventanaEmergente.close();
            updatePersonasList();
          });

        // Evento para el botón "Cancelar" de Nacimiento
        ventanaEmergente.document
          .getElementById("cancelarNacimiento")
          .addEventListener("click", function () {
            ventanaEmergente.close();
          });
      });

    // Evento para el botón "Añadir" de Bautismo
    document
      .getElementById("btnAgregarBautismo")
      .addEventListener("click", function () {
        const ventanaEmergente = window.open(
          "",
          "ventanaEmergente",
          "width=400,height=300"
        );
        ventanaEmergente.document.body.innerHTML = `
            <h3>Fecha de Bautismo</h3>
            <label for="fechaBautismo">Fecha:</label>
            <input type="date" id="fechaBautismo">
            <br>
            <label for="lugarBautismo">Lugar:</label>
            <input type="text" id="lugarBautismo">
            <br>
            <button id="guardarBautismo">Guardar</button>
            <button id="cancelarBautismo">Cancelar</button>
        `;

        // Evento para el botón "Guardar" de Bautismo
        ventanaEmergente.document
          .getElementById("guardarBautismo")
          .addEventListener("click", function () {
            const fechaBautismo =
              ventanaEmergente.document.getElementById("fechaBautismo").value;
            const lugarBautismo =
              ventanaEmergente.document.getElementById("lugarBautismo").value;
            persona.eventos.fechaBautismo = fechaBautismo;
            persona.eventos.lugarBautismo = lugarBautismo;
            localStorage.setItem(
              "personaSeleccionada",
              JSON.stringify(persona)
            );
            document.getElementById("fechaBautismo").textContent =
              fechaBautismo;
            document.getElementById("lugarBautismo").textContent =
              lugarBautismo;
            ventanaEmergente.close();
            updatePersonasList();
          });

        // Evento para el botón "Cancelar" de Bautismo
        ventanaEmergente.document
          .getElementById("cancelarBautismo")
          .addEventListener("click", function () {
            ventanaEmergente.close();
          });
      });
  }

  function updatePersonasList() {
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    const index = personas.findIndex((p) => p.id === persona.id);
    if (index !== -1) {
      personas[index] = persona;
    } else {
      personas.push(persona);
    }
    localStorage.setItem("personas", JSON.stringify(personas));
    mostrarPersonas();
  }

  function mostrarPersonas() {
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    const listaPersonas = document.getElementById("listaPersonas");
    listaPersonas.innerHTML = "";
    personas.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `${p.nombre} ${p.apellido} (${p.eventos.fechaNacimiento})`;
      li.addEventListener("click", function () {
        localStorage.setItem("personaSeleccionada", JSON.stringify(p));
        window.location.href = "detalles.html";
      });
      listaPersonas.appendChild(li);
    });
  }

  mostrarPersonas();
});
