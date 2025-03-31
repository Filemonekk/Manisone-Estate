const gallery = document.getElementById('gallery')
const showMoreBtn = document.getElementById('showMoreBtn')

let propertiesData = []
let itemsPerPage = 10
let currentPage = 1

async function loadData() {
	try {
		const response = await fetch('../data/properties.json')
		propertiesData = await response.json()
		renderProperties()
	} catch (error) {
		console.error('Error loading properties data:', error)
	}
}

function renderProperties() {
	const start = (currentPage - 1) * itemsPerPage
	const end = currentPage * itemsPerPage
	const visibleItems = propertiesData.slice(start, end)

	visibleItems.forEach(item => {
		const card = document.createElement('div')
		card.className = 'property-card'

		card.innerHTML = `
        <img src="../${item.image}" alt="${item.title}" />
        <div class="property-label ${item.type === 'sale' ? 'for-sale' : 'for-rent'}">
          ${item.type === 'sale' ? 'For Sale' : 'For Rent'}
        </div>
        <div class="property-info">
          <h3>${item.title}</h3>
          <p>${item.location}</p>
          <p class="price">${item.priceLabel}</p>
          <p>${item.bedrooms} beds • ${item.bathrooms} baths • ${item.area} m²</p>
        </div>
      `

		gallery.appendChild(card)
	})

	if (end >= propertiesData.length) {
		showMoreBtn.style.display = 'none'
	}
}

loadData();
