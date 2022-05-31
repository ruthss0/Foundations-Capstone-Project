const travelItems = document.querySelector('#travel-items')
const travelSelected = document.querySelector('#travel-selected')
const countryList = document.querySelector('#country-list')

function deleteCity(id) {
    axios.delete(`http://localhost:4004/cities/${id}`)
        .then(() => {
            travelSelected.innerHTML = `<h2 class="empty-travel">Click on one of you adventures for more info!</h2>

            <div class="logo">
              <img
                src="https://t4.ftcdn.net/jpg/01/10/24/63/360_F_110246303_oXrSTJJtcTYUkoHzJuRZJ4aSBqXINGd1.jpg" />
                <h3 class="nameLogo">Travel Hypothetical</h3>
            </div>`;
            getCities()
        })
        .catch(err => console.log(err))
}

function getCities() {
    travelItems.innerHTML = ''

    axios.get('http://localhost:4004/cities/')
        .then(res => { 
            res.data.forEach(elem => {
                let travelItem = `
                    <div class="travel-item">
                        <img
                        src="${elem.image_url}">
                        <button onclick="getCity(${elem.city_id})">${elem.city_name}, ${elem.country}</button>
                    </div>
                `

                travelItems.innerHTML += travelItem
            })
        })
}

function getCity(id) {
    axios.get(`http://localhost:4004/cities/${id}`)
    .then(res => {
        const city = res.data;
        let ratingHTML = '';
        for (let i = 0; i < 5; i++) {
            let checked = '';
            if(i < city.rating) {
                checked = 'checked'
            }
            ratingHTML += `<span class="fa fa-star ${checked}"></span>`
        }

        travelSelected.innerHTML = `
            <div class="travel-selected-inside">
                <h1>${city.city_name}, ${city.country}</h1>
                <p class="text">
                    ${city.description}
                </p>
                <img src="${city.image_url}" />
                <div>
                <p>Rating:</p>
                    <div>
                    ${ratingHTML}
                    </div>
                </div>
                <button onclick="deleteCity(${city.city_id})" class="delete-btn">Delete</button>
            </div>
        `
    })
    .catch(err => console.log(err))
}

getCities();

