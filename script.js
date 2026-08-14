const container = document.getElementById("aircraft-container");
const searchInput = document.getElementById("search");

let aircraftList = [];


async function loadAircraft() {

    try {

        const response = await fetch("/api/aircraft");

        if (!response.ok) {
            throw new Error("Failed to load aircraft");
        }

        aircraftList = await response.json();

        displayAircraft(aircraftList);

    } catch (error) {

        container.innerHTML = `
            <div class="loading">
                ❌ Unable to connect to backend.
            </div>
        `;

        console.error(error);
    }
}


function displayAircraft(list) {

    if (list.length === 0) {

        container.innerHTML = `
            <div class="loading">
                No aircraft found.
            </div>
        `;

        return;
    }


    container.innerHTML = list.map(plane => `

        <div class="aircraft-card">

            <img
                src="${plane.image}"
                alt="${plane.name}"
            >

            <div class="card-content">

                <h3>
                    ${plane.name}
                </h3>

                <div class="manufacturer">
                    ${plane.manufacturer}
                </div>

                <div class="spec">
                    <span>Type</span>
                    <strong>${plane.type}</strong>
                </div>

                <div class="spec">
                    <span>Category</span>
                    <strong>${plane.category}</strong>
                </div>

                <div class="spec">
                    <span>Passengers</span>
                    <strong>${plane.passengers}</strong>
                </div>

                <div class="spec">
                    <span>Range</span>
                    <strong>${plane.range}</strong>
                </div>

                <div class="spec">
                    <span>Cruise Speed</span>
                    <strong>${plane.speed}</strong>
                </div>

            </div>

        </div>

    `).join("");
}


searchInput.addEventListener("input", function () {

    const searchValue =
        searchInput.value.toLowerCase();

    const filtered =
        aircraftList.filter(plane =>
            plane.name.toLowerCase().includes(searchValue) ||
            plane.manufacturer.toLowerCase().includes(searchValue) ||
            plane.category.toLowerCase().includes(searchValue)
        );

    displayAircraft(filtered);

});


loadAircraft();
