document.addEventListener("DOMContentLoaded", function () {
  const person = JSON.parse(localStorage.getItem("selectedPerson"));

  if (person !== null) {
    document.getElementById(
      "personName"
    ).textContent = `${person.firstName} ${person.lastName}`;
    document.getElementById("birthDatePerson").textContent =
      person.events.birthDate;

    const personImage = document.getElementById("personImage");
    if (person.imageURL) {
      personImage.src = person.imageURL;
      personImage.style.display = "block";
    } else {
      personImage.style.display = "none";
    }

    document.getElementById("birthDate").textContent = person.events.birthDate;
    document.getElementById("birthPlace").innerHTML = person.events.birthPlace
      ? person.events.birthPlace
      : '<button id="btnAddBirth" class="btn-add-data">+ ADD</button>';

    document.getElementById("baptismDate").innerHTML = person.events.baptismDate
      ? person.events.baptismDate
      : '<button id="btnAddBaptism" class="btn-add-data">+ ADD</button>';

    if (person.events.deathDate) {
      document.getElementById("deathDate").textContent =
        person.events.deathDate;
      document.getElementById("deathPlace").innerHTML = person.events.deathPlace
        ? person.events.deathPlace
        : '<button id="btnAddDeath" class="btn-add-data">+ ADD</button>';
    } else {
      document.getElementById("deathDate").textContent = "alive";
      document.getElementById("deathPlace").textContent = "";
    }

    document
      .getElementById("btnAddBirth")
      .addEventListener("click", function () {
        const popupWindow = window.open(
          "",
          "popupWindow",
          "width=400,height=300"
        );
        popupWindow.document.body.innerHTML = `
                  <h3>Birth Date</h3>
                  <label for="birthDate">Date:</label>
                  <input type="date" id="birthDate">
                  <br>
                  <label for="birthPlace">Place:</label>
                  <input type="text" id="birthPlace">
                  <br>
                  <button id="saveBirth">Save</button>
                  <button id="cancelBirth">Cancel</button>
              `;

        popupWindow.document
          .getElementById("saveBirth")
          .addEventListener("click", function () {
            const birthDate =
              popupWindow.document.getElementById("birthDate").value;
            const birthPlace =
              popupWindow.document.getElementById("birthPlace").value;
            person.events.birthDate = birthDate;
            person.events.birthPlace = birthPlace;
            localStorage.setItem("selectedPerson", JSON.stringify(person));
            document.getElementById("birthDate").textContent = birthDate;
            document.getElementById("birthPlace").textContent = birthPlace;
            popupWindow.close();
            updatePeopleList();
          });

        popupWindow.document
          .getElementById("cancelBirth")
          .addEventListener("click", function () {
            popupWindow.close();
          });
      });

    document
      .getElementById("btnAddBaptism")
      .addEventListener("click", function () {
        const popupWindow = window.open(
          "",
          "popupWindow",
          "width=400,height=300"
        );
        popupWindow.document.body.innerHTML = `
                  <h3>Baptism Date</h3>
                  <label for="baptismDate">Date:</label>
                  <input type="date" id="baptismDate">
                  <br>
                  <label for="baptismPlace">Place:</label>
                  <input type="text" id="baptismPlace">
                  <br>
                  <button id="saveBaptism">Save</button>
                  <button id="cancelBaptism">Cancel</button>
              `;

        popupWindow.document
          .getElementById("saveBaptism")
          .addEventListener("click", function () {
            const baptismDate =
              popupWindow.document.getElementById("baptismDate").value;
            const baptismPlace =
              popupWindow.document.getElementById("baptismPlace").value;
            person.events.baptismDate = baptismDate;
            person.events.baptismPlace = baptismPlace;
            localStorage.setItem("selectedPerson", JSON.stringify(person));
            document.getElementById("baptismDate").textContent = baptismDate;
            document.getElementById("baptismPlace").textContent = baptismPlace;
            popupWindow.close();
            updatePeopleList();
          });

        popupWindow.document
          .getElementById("cancelBaptism")
          .addEventListener("click", function () {
            popupWindow.close();
          });
      });
  }

  function updatePeopleList() {
    const people = JSON.parse(localStorage.getItem("people")) || [];
    const index = people.findIndex((p) => p.id === person.id);
    if (index !== -1) {
      people[index] = person;
    } else {
      people.push(person);
    }
    localStorage.setItem("people", JSON.stringify(people));
    displayPeople();
  }

  function displayPeople() {
    const people = JSON.parse(localStorage.getItem("people")) || [];
    const personList = document.getElementById("person-list");
    personList.innerHTML = "";

    people.forEach((person) => {
      const li = document.createElement("li");
      li.classList.add("person-item");
      li.textContent = `${person.firstName} ${person.lastName} (${new Date(
        person.events.birthDate
      ).getFullYear()} - ${
        person.events.deathDate
          ? new Date(person.events.deathDate).getFullYear()
          : "alive"
      })`;
      li.dataset.id = person.id;
      li.addEventListener("click", function () {
        localStorage.setItem("selectedPerson", JSON.stringify(person));
        window.location.href = "details.html";
      });
      personList.appendChild(li);
    });
  }

  document.getElementById("btnAddDeath").addEventListener("click", function () {
    const popupWindow = window.open("", "popupWindow", "width=400,height=300");
    popupWindow.document.body.innerHTML = `
            <h3>Death Date</h3>
            <label for="deathDate">Date:</label>
            <input type="date" id="deathDate">
            <br>
            <label for="deathPlace">Place:</label>
            <input type="text" id="deathPlace">
            <br>
            <button id="saveDeath">Save</button>
            <button id="cancelDeath">Cancel</button>
            `;

    popupWindow.document
      .getElementById("saveDeath")
      .addEventListener("click", function () {
        const deathDate =
          popupWindow.document.getElementById("deathDate").value;
        const deathPlace =
          popupWindow.document.getElementById("deathPlace").value;
        person.events.deathDate = deathDate;
        person.events.deathPlace = deathPlace;
        localStorage.setItem("selectedPerson", JSON.stringify(person));
        document.getElementById("deathDate").textContent = deathDate;
        document.getElementById("deathPlace").textContent = deathPlace;
        popupWindow.close();
        updatePeopleList();
      });

    popupWindow.document
      .getElementById("cancelDeath")
      .addEventListener("click", function () {
        popupWindow.close();
      });
  });
});
