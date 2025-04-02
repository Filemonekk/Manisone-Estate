document.addEventListener('DOMContentLoaded', () => {
	const carousels = document.querySelectorAll('.carousel-container')

	carousels.forEach(carousel => {
		const track = carousel.querySelector('.carousel-track')
		const prevBtn = carousel.querySelector('.carousel-btn.prev')
		const nextBtn = carousel.querySelector('.carousel-btn.next')
		const cards = carousel.querySelectorAll('.property-card')

		let currentIndex = 0
		const visibleCards = 3
		const cardGap = 24 // px, zgodnie z SCSS grid-gap
		const cardWidth = cards[0].offsetWidth + cardGap

		// ustaw szerokość toru
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
	})
})
