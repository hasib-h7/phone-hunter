const getApi = async (searchText, limit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    dataGetting(data.data, limit);
}
function processData(limit) {
    spinner(true)
    const typedValue = document.getElementById('search-input');
    const url = typedValue.value;
    getApi(url, limit)
    container.innerHTML = '';
}
const container = document.getElementById('card-container');
const dataGetting = (data, limit) => {
    // console.log(data.data);
    container.innerText = '';
    const warning = document.getElementById('warning');
    const showAllContainer = document.getElementById('show-all-container');

    if (data.length === 0) {
        // console.log('none');  
        warning.classList.remove('d-none')
    }
    else {
        warning.classList.add('d-none')
    }

    if (limit && data.length > 10) {
        data = data.slice(0, 9);
        showAllContainer.classList.remove('d-none')

    }
    else {
        showAllContainer.classList.add('d-none')
    }
    data.forEach(element => {
        // console.log(element.phone_name);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
     <div class="card">
        <img src="${element.image}" class="card-img-top img-custom" alt="...">
        <div class="card-body">
          <h5 class="card-title">${element.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="phoneDetails('${element.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal"> Show Details </Button>
        </div>
     </div>
        `

        container.appendChild(div)

    });
    spinner(false)
}

document.getElementById('search-btn').addEventListener('click', function () {
    processData(10)
});
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processData(10)
        // console.log('kok');
    }
})

const spinner = isLoading => {
    const getSpinner = document.getElementById('spinner');
    if (isLoading) {
        getSpinner.classList.remove('d-none')
    }
    else {
        getSpinner.classList.add('d-none')
    }
}

document.getElementById('show-all').addEventListener('click', function () {
    processData()
});

const phoneDetails = async id => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    phoneModal(data.data);
}
// phoneDetails()
function phoneModal(data) {
    const modalContainer = document.getElementById('modal-body-container');
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = data.name ; 
    const sensors =data.mainFeatures.sensors ; 
    const spreadSensor = [...sensors]
    const sensorLimit = spreadSensor.join(' , ') ; 
//    const testing = sensor.forEach(res => tes2.push(res)) ; 
    const modalTemplate= `
        <img src="${data.image}" class="img-custom h-50">
        <h3 class="text-center mt-1 mb-1">Main Feature</h3>
        <p>Storage : ${data.mainFeatures ? data.mainFeatures.storage : 'No Storage' } </p>
        <p>Display : ${data.mainFeatures ? data.mainFeatures.displaySize : 'Not Found' } </p>
        <p>Memory : ${data.mainFeatures ? data.mainFeatures.memory : 'Not Found' } </p>
        <p>Chip Set : ${data.mainFeatures ? data.mainFeatures.chipSet : 'Not Found' } </p>
        <p>Sensors : ${sensorLimit ? sensorLimit : 'Not Found' } </p>
     
        <p>Release Date : ${data.releaseDate ? data.releaseDate : 'No Date Found'} </p> 
    `
    // const div = document.createElement('div') ; 
    // div.innerHTML = modalTemplate ; 
    modalContainer.innerHTML = modalTemplate ; 
    // modalContainer.appendChild(div) ;
    // div.innerHTML = '' ; 
    console.log(data.mainFeatures.sensors);
}
// phoneModal()

// console.log(modalContainer);
