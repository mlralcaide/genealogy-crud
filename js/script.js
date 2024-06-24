document.addEventListener('DOMContentLoaded', function() {
    const personList = document.getElementById('person-list');
    const personas = JSON.parse(localStorage.getItem('personas')) || [];

    personas.forEach(persona => {
        const li = document.createElement('li');
        li.classList.add('persona-item');
        li.textContent = `${persona.nombre} ${persona.apellido} (${new Date(persona.eventos.fechaNacimiento).getFullYear()} - ${persona.eventos.fechaDefuncion ? new Date(persona.eventos.fechaDefuncion).getFullYear() : 'vive'})`;
        li.dataset.id = persona.id;
        li.addEventListener('click', function() {
            localStorage.setItem('personaSeleccionada', JSON.stringify(persona));
            window.location.href = 'detalles.html';
        });
        personList.appendChild(li);
    });

    const personaForm = document.getElementById('persona-form');
    personaForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nuevaPersona = {
            id: Date.now(),
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            eventos: {
                fechaNacimiento: document.getElementById('fechaNacimiento').value,
                lugarNacimiento: document.getElementById('lugarNacimiento').value,
                fechaBautismo: document.getElementById('fechaBautismo').value,
                lugarBautismo: document.getElementById('lugarBautismo').value,
                fechaMatrimonio: document.getElementById('fechaMatrimonio').value,
                lugarMatrimonio: document.getElementById('lugarMatrimonio').value,
                fechaDefuncion: document.getElementById('fechaDefuncion').value,
                lugarDefuncion: document.getElementById('lugarDefuncion').value,
            },
            imagenURL: document.getElementById('imagenURL').value
        };

        personas.push(nuevaPersona);
        localStorage.setItem('personas', JSON.stringify(personas));

        const li = document.createElement('li');
        li.classList.add('persona-item');
        li.textContent = `${nuevaPersona.nombre} ${nuevaPersona.apellido} (${new Date(nuevaPersona.eventos.fechaNacimiento).getFullYear()} - ${nuevaPersona.eventos.fechaDefuncion ? new Date(nuevaPersona.eventos.fechaDefuncion).getFullYear() : 'vive'})`;
        li.dataset.id = nuevaPersona.id;
        li.addEventListener('click', function() {
            localStorage.setItem('personaSeleccionada', JSON.stringify(nuevaPersona));
            window.location.href = 'detalles.html';
        });
        personList.appendChild(li);

        personaForm.reset();
    });

    const clearDataButton = document.getElementById('clear-data');
    clearDataButton.addEventListener('click', function() {
        localStorage.clear();
        personList.innerHTML = '';
    });
});
