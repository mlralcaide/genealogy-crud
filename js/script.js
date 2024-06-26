document.addEventListener('DOMContentLoaded', function() {
    const personList = document.getElementById('person-list');
    const people = JSON.parse(localStorage.getItem('people')) || [];

    people.forEach(person => {
        const li = document.createElement('li');
        li.classList.add('person-item');
        li.textContent = `${person.firstName} ${person.lastName} (${new Date(person.events.birthDate).getFullYear()} - ${person.events.deathDate ? new Date(person.events.deathDate).getFullYear() : 'alive'})`;
        li.dataset.id = person.id;
        li.addEventListener('click', function() {
            localStorage.setItem('selectedPerson', JSON.stringify(person));
            window.location.href = 'details.html';
        });
        personList.appendChild(li);
    });

    const personForm = document.getElementById('person-form');
    personForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newPerson = {
            id: Date.now(),
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            events: {
                birthDate: document.getElementById('birthDate').value,
                birthPlace: document.getElementById('birthPlace').value,
                baptismDate: document.getElementById('baptismDate').value,
                baptismPlace: document.getElementById('baptismPlace').value,
                marriageDate: document.getElementById('marriageDate').value,
                marriagePlace: document.getElementById('marriagePlace').value,
                deathDate: document.getElementById('deathDate').value,
                deathPlace: document.getElementById('deathPlace').value,
            },
            imageURL: document.getElementById('imageURL').value
        };

        people.push(newPerson);
        localStorage.setItem('people', JSON.stringify(people));

        const li = document.createElement('li');
        li.classList.add('person-item');
        li.textContent = `${newPerson.firstName} ${newPerson.lastName} (${new Date(newPerson.events.birthDate).getFullYear()} - ${newPerson.events.deathDate ? new Date(newPerson.events.deathDate).getFullYear() : 'alive'})`;
        li.dataset.id = newPerson.id;
        li.addEventListener('click', function() {
            localStorage.setItem('selectedPerson', JSON.stringify(newPerson));
            window.location.href = 'details.html';
        });
        personList.appendChild(li);

        personForm.reset();
    });

    const clearDataButton = document.getElementById('clear-data');
    clearDataButton.addEventListener('click', function() {
        localStorage.clear();
        personList.innerHTML = '';
    });
});
