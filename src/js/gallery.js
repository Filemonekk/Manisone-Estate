const gallery = document.getElementById('gallery')
const showMoreBtn = document.getElementById('showMoreBtn')
const filterSelect = document.getElementById('filterType')
const sortSelect = document.getElementById('sortSelect')

let propertiesData = []
let itemsPerPage = 10
let currentPage = 1
let activeFilter = ''
let activeSort = ''

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
	let filteredData = activeFilter ? propertiesData.filter(item => item.type === activeFilter) : [...propertiesData]

	if (activeSort === 'price-asc') {
		filteredData.sort((a, b) => a.price - b.price)
	} else if (activeSort === 'price-desc') {
		filteredData.sort((a, b) => b.price - a.price)
	}

	const visibleItems = filteredData.slice(start, end)

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

loadData()

filterSelect.addEventListener('change', () => {
	activeFilter = filterSelect.value
	currentPage = 1
	gallery.innerHTML = ''
	showMoreBtn.style.display = 'block'
	renderProperties()
})

sortSelect.addEventListener('change', () => {
	activeSort = sortSelect.value
	currentPage = 1
	gallery.innerHTML = ''
	showMoreBtn.style.display = 'block'
	renderProperties()
})
