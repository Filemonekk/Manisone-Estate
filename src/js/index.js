document.addEventListener('DOMContentLoaded', () => {
	const staticCarousels = document.querySelectorAll('.carousel-container')
	staticCarousels.forEach(carousel => initializeCarousel(carousel))

	const rentCarouselSection = document.querySelector('.for-rent-section')
	const rentTrack = rentCarouselSection.querySelector('.carousel-track')

	fetch('./src/data/properties.json')
		.then(response => response.json())
		.then(data => {
			const rentProperties = data.filter(p => p.type === 'rent')

			rentProperties.forEach(property => {
				const card = document.createElement('article')
				card.classList.add('property-card')
				card.innerHTML = `
					<img src="./src/${property.image}" alt="${property.title}" />
					<span class="property-label for-rent">For Rent</span>
					<h3>${property.title}</h3>
					<p>${property.description}</p>
					<a href="./src/pages/gallery.html">View More</a>
				`
				rentTrack.appendChild(card)
			})

			initializeCarousel(rentCarouselSection)
		})
		.catch(error => console.error('Error loading JSON:', error))

	function initializeCarousel(carousel) {
		const track = carousel.querySelector('.carousel-track')
		const prevBtn = carousel.querySelector('.carousel-btn.prev')
		const nextBtn = carousel.querySelector('.carousel-btn.next')
		const cards = carousel.querySelectorAll('.property-card')

		if (cards.length === 0) return

		let currentIndex = 0
		const visibleCards = 3
		const cardGap = 24
		const cardWidth = cards[0].offsetWidth + cardGap

		track.style.width = `${cards.length * cardWidth}px`

		function updateCarousel() {
			const offset = -(cardWidth * currentIndex)
			track.style.transform = `translateX(${offset}px)`
			track.style.transition = 'transform 0.5s ease'

			prevBtn.disabled = currentIndex === 0
			nextBtn.disabled = currentIndex >= cards.length - visibleCards
		}

		prevBtn.addEventListener('click', () => {
			if (currentIndex > 0) {
				currentIndex--
				updateCarousel()
			}
		})

		nextBtn.addEventListener('click', () => {
			if (currentIndex < cards.length - visibleCards) {
				currentIndex++
				updateCarousel()
			}
		})

		updateCarousel()
	}
})
