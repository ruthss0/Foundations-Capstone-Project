const form = document.querySelector('form')
const nameInput = document.querySelector('#name-input')
const countrySelect = document.querySelector('#country-select')
const descriptionText = document.querySelector('#description-text')
const imageUrlInput = document.querySelector('#image_url-input')
const allstars = document.querySelectorAll('.fa-star')

function handleSubmit(e) {
    e.preventDefault()

    if (nameInput.value < 1) {
        alert ('You must enter a city name')
        return
    }

    if (descriptionText.value < 1) {
        alert ('You must enter your story')
        return
    }

    if (imageUrlInput.value < 1) {
        alert ('You must enter a picture')
        return
    }

    const userRating = [...document.querySelectorAll('.fa-star')].filter(elem => elem.classList.contains('checked')).length
    const body = {
        name: nameInput.value, 
        rating: userRating,
        countryId: +countrySelect.value,
        description: descriptionText.value,
        image_url:imageUrlInput.value,
    }

    axios.post('http://localhost:4004/cities', body)
        .then(() => {
            window.location.href = '/';
        })
}

function getCountries() {
  axios.get('http://localhost:4004/countries')
      .then(res => {
          res.data.forEach(country => {
              const option = document.createElement('option')
              option.setAttribute('value', country['country_id'])
              option.textContent = country.name
              countrySelect.appendChild(option)
          })
      })
}

getCountries()
form.addEventListener('submit', handleSubmit)

allstars.forEach(star => {
    star.onclick = () => {
        let starlevel = star.getAttribute('data-num');
        allstars.forEach(el => {
           if(starlevel < el.getAttribute('data-num')) {
                el.classList.remove('checked')
           }
           else {
              el.classList.add('checked')
           }
        })
    }
})
