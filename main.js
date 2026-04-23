// Three phases:
//   hero   — single lead card visible at its grid[last] slot
//   grid   — N cards tile the right pane; count = floor(availW/cardW) × floor(availH/cardH)
//   folder — cards have flown into the macOS folder; folder section visible

const PHASE = { HERO: 'hero', GRID: 'grid', FOLDER: 'folder' }

const GRID_GAP = 16
const GRID_PADDING = 20
const CARD_POOL_SIZE = 16 // enough elements for very wide displays

// Card templates — cycled through to fill whatever count the layout needs.
const CARD_TEMPLATES = [
  { img: '/images/blazer.jpg', title: 'Kartik Research Embroidered Wool Blazer', price: '$1,895', tags: [{ name: '100% wool', color: '#e0e7ff' }, { name: 'embroidered', color: '#fef3c7' }], note: 'statement blazer for your friends wedding' },
  { img: '/images/tee.jpg', title: 'Merz b. Schwanen Cotton Tee', price: '$85', tags: [{ name: 'essentials', color: '#f4f4f5' }, { name: 'organic cotton', color: '#dcfce7' }], note: 'wider silhouette for you' },
  { img: '/images/jeans.jpg', title: 'orSlow 105 Straight-Leg Jeans', price: '$375', tags: [{ name: '13.5oz denim', color: '#dbeafe' }, { name: 'washed black', color: '#e0e7ff' }], note: 'a good pair of vintage inspired 90s Levis 501-style jeans' },
  { img: '/images/yeezy.png', title: 'YEEZY Runner', price: '$40', tags: [{ name: 'nylon with sheen', color: '#f4f4f5' }, { name: 'gorpcore', color: '#fef3c7' }], note: 'easy, versatile, and cheap' },
  { img: '/images/polo.jpg', title: 'Our Legacy Silk Shirt', price: '$280', tags: [{ name: '100% silk', color: '#fce7f3' }, { name: 'relaxed fit', color: '#e0e7ff' }], note: 'easy dinner option' },
  { img: '/images/polo.jpg', title: 'A.PRESSE Washed Silk Polo', price: '$495', tags: [{ name: 'textured finish', color: '#dcfce7' }, { name: '100% silk', color: '#fce7f3' }], note: 'layered under your grey sport coat' },
  { img: '/images/blazer.jpg', title: 'Comme des Garçons Blazer', price: '$1,200', tags: [{ name: 'oversized', color: '#fef3c7' }, { name: 'structured', color: '#e0e7ff' }], note: 'throw over everything' },
  { img: '/images/jeans.jpg', title: 'Lemaire Relaxed Trouser', price: '$420', tags: [{ name: 'wool blend', color: '#dbeafe' }, { name: 'tapered', color: '#dcfce7' }], note: 'pair with your white sneakers' },
  { img: '/images/tee.jpg', title: 'Auralee Cotton Sweater', price: '$395', tags: [{ name: 'cashmere', color: '#f4f4f5' }, { name: 'ribbed', color: '#dcfce7' }], note: 'weekend wear' },
]

// Build a deterministic pool of CARD_POOL_SIZE card data by cycling templates.
const poolCards = Array.from({ length: CARD_POOL_SIZE }, (_, i) => CARD_TEMPLATES[i % CARD_TEMPLATES.length])
// The lead card (the one seen alone in hero) is forced to be the polo — always occupies the last visible slot.
const LEAD_CARD = { img: '/images/polo.jpg', title: 'A.PRESSE Washed Silk Polo', price: '$495', tags: [{ name: 'textured finish', color: '#dcfce7' }, { name: '100% silk', color: '#fce7f3' }], note: 'layered under your grey sport coat' }

const rightPane = document.getElementById('right-pane')
const heroGridSection = document.getElementById('hero-grid-section')
const folderSection = document.getElementById('folder-section')
const scrollIndicator = document.getElementById('scroll-indicator')
const flyOverlay = document.getElementById('fly-overlay')
const boardFolder = document.getElementById('board-folder')
const boardThumbs = document.getElementById('board-folder-thumbs')

// Populate the board-folder thumbnails using the first three real card images.
const thumbSources = CARD_TEMPLATES.slice(0, 3)
thumbSources.forEach(c => {
  const thumb = document.createElement('img')
  thumb.className = 'board-folder-thumb'
  thumb.src = c.img
  thumb.alt = c.title
  boardThumbs.appendChild(thumb)
})

function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5) }
function lerp(a, b, t) { return a + (b - a) * t }

function cardInnerHTML(card) {
  return `
    <img class="card-img" src="${card.img}" alt="${card.title}" draggable="false">
    <div class="card-header">
      <span class="card-title">${card.title}</span>
      <span class="card-price">${card.price}</span>
    </div>
    <div class="card-tags">${card.tags.map(t => `<span class="card-tag" style="background:${t.color}">${t.name}</span>`).join('')}</div>
    <div class="card-note"><p><strong>stylist note:</strong> ${card.note}</p></div>
  `
}

function makeCardEl(card, i) {
  const el = document.createElement('div')
  el.className = 'card'
  el.dataset.index = String(i)
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = cardInnerHTML(card)
  el.style.opacity = '0'
  rightPane.appendChild(el)
  return el
}

// Create the full pool up front; layout reveals `count` of them.
const cardEls = poolCards.map((c, i) => makeCardEl(c, i))

// --- Layout computation ---
// Natural card size is driven by CSS (.card width + rendered height).
// Count is derived from how many cards fit in the right pane.
function computeLayout() {
  const paneW = rightPane.clientWidth
  const paneH = rightPane.clientHeight
  const cardW = cardEls[0].offsetWidth
  const cardH = cardEls[0].offsetHeight

  const availW = Math.max(0, paneW - 2 * GRID_PADDING)
  const availH = Math.max(0, paneH - 2 * GRID_PADDING)

  // 5 cards horizontally: 5 cols × 1 row. Grid is bottom-anchored and anchored to the page's left margin.
  const cols = 5
  const rows = 1
  const count = Math.min(cardEls.length, cols * rows)
  const leadIndex = 0 // lead card is the leftmost — animation fans cards out to the right from here.

  const naturalGridW = cols * cardW + (cols - 1) * GRID_GAP
  const naturalGridH = rows * cardH + (rows - 1) * GRID_GAP

  // Left-anchor to the page margin (matches nav padding = 44px from viewport left).
  const PAGE_LEFT_MARGIN = 44
  const rightPaneRect = rightPane.getBoundingClientRect()
  const viewportW = document.documentElement.clientWidth
  // Scale all cards uniformly if the natural grid is wider than the available horizontal space (left margin → right edge - 20).
  const availForGrid = Math.max(0, viewportW - PAGE_LEFT_MARGIN - 20)
  const fitScale = Math.min(1, availForGrid / naturalGridW)
  const scaledCardW = cardW * fitScale
  const scaledCardH = cardH * fitScale
  const scaledGap = GRID_GAP * fitScale
  const gridW = naturalGridW * fitScale
  const gridH = naturalGridH * fitScale

  const grid0X = PAGE_LEFT_MARGIN - rightPaneRect.left

  // Hard ceiling — grid bottom never goes past `paneH - GRID_BOTTOM_INSET`, so it never bleeds into the footer.
  const GRID_BOTTOM_INSET = 10
  const grid0Y = Math.max(0, paneH - gridH - GRID_BOTTOM_INSET)

  // Enforce a minimum gap between the heading and the grid by pulling the heading UP (reducing text-pane padding-top)
  // if the current padding would cause the heading to crowd the grid.
  const MIN_HEADING_GAP = 30
  const heading = heroGridSection.querySelector('.hero-heading')
  const textPane = heroGridSection.querySelector('.text-pane')
  if (heading && textPane) {
    const headingRect = heading.getBoundingClientRect()
    const gridTopViewportY = rightPaneRect.top + grid0Y
    const maxAllowedHeadingBottom = gridTopViewportY - MIN_HEADING_GAP
    const overflow = headingRect.bottom - maxAllowedHeadingBottom
    if (overflow > 0) {
      const currentPadding = parseFloat(getComputedStyle(textPane).paddingTop) || 0
      textPane.style.paddingTop = Math.max(0, currentPadding - overflow) + 'px'
    }
  }

  const gridPositions = []
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols)
    const col = i % cols
    gridPositions.push({
      x: grid0X + col * (scaledCardW + scaledGap),
      y: grid0Y + row * (scaledCardH + scaledGap),
      scale: fitScale,
    })
  }

  // Make sure the polo card data lives at the lead slot, regardless of where in the pool.
  if (cardEls[leadIndex]) {
    const wantHTML = cardInnerHTML(LEAD_CARD)
    if (cardEls[leadIndex].dataset.isLead !== '1') {
      cardEls[leadIndex].innerHTML = wantHTML
      cardEls[leadIndex].dataset.isLead = '1'
    }
    // Reset any element that used to be lead but isn't anymore (after resize)
    cardEls.forEach((el, i) => {
      if (i !== leadIndex && el.dataset.isLead === '1') {
        el.innerHTML = cardInnerHTML(poolCards[i])
        delete el.dataset.isLead
      }
    })
  }

  const heroPos = { ...gridPositions[leadIndex] }
  return { cols, rows, count, leadIndex, gridPositions, heroPos, fitScale }
}

function applyTransform(el, pos, opacity) {
  el.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`
  el.style.opacity = String(opacity)
}

function hideExtraCards(count) {
  for (let i = count; i < cardEls.length; i++) {
    cardEls[i].style.opacity = '0'
    cardEls[i].style.transform = 'translate(-9999px, -9999px)'
  }
}

function applyPhase(next) {
  const { gridPositions, heroPos, count, leadIndex } = computeLayout()
  hideExtraCards(count)
  if (next === PHASE.HERO) {
    cardEls.slice(0, count).forEach((el, i) => {
      if (i === leadIndex) applyTransform(el, heroPos, 1)
      else applyTransform(el, heroPos, 0) // stacked behind, invisible
    })
    folderSection.classList.remove('is-visible')
    heroGridSection.style.opacity = '1'
    heroGridSection.style.pointerEvents = ''
  } else if (next === PHASE.GRID) {
    cardEls.slice(0, count).forEach((el, i) => applyTransform(el, gridPositions[i], 1))
    folderSection.classList.remove('is-visible')
    heroGridSection.style.opacity = '1'
    heroGridSection.style.pointerEvents = ''
  } else if (next === PHASE.FOLDER) {
    folderSection.classList.add('is-visible')
    heroGridSection.style.opacity = '0'
    heroGridSection.style.pointerEvents = 'none'
    cardEls.forEach(el => { el.style.opacity = '0' })
  }
  updateScrollIndicator(next)
}

function updateScrollIndicator(p) {
  scrollIndicator.classList.remove('phase-grid', 'phase-folder')
  if (p === PHASE.GRID) scrollIndicator.classList.add('phase-grid')
  else if (p === PHASE.FOLDER) scrollIndicator.classList.add('phase-folder')
}

// --- State ---
let phase = PHASE.HERO
let animating = false

// --- Intro: lead card flies in on first load ---
function animateIntro() {
  animating = true
  const { heroPos, count, leadIndex } = computeLayout()
  hideExtraCards(count)
  const startPos = { x: heroPos.x, y: heroPos.y + 80, scale: heroPos.scale }
  const lead = cardEls[leadIndex]

  const startTime = performance.now()
  const duration = 900
  function step(now) {
    const t = Math.min(1, (now - startTime) / duration)
    const e = easeOutQuint(t)
    applyTransform(lead, {
      x: lerp(startPos.x, heroPos.x, e),
      y: lerp(startPos.y, heroPos.y, e),
      scale: heroPos.scale,
    }, e)
    if (t < 1) requestAnimationFrame(step)
    else { animating = false }
  }
  requestAnimationFrame(step)
}

// --- Hero → Grid: non-lead cards fan out from behind the lead into the full grid ---
function animateHeroToGrid() {
  if (animating || phase !== PHASE.HERO) return
  animating = true
  const { gridPositions, heroPos, count, leadIndex } = computeLayout()
  hideExtraCards(count)

  const startTime = performance.now()
  const duration = 900
  const stagger = 60
  // Stagger by distance from the lead slot — closer cards reveal first.
  const order = []
  for (let i = 0; i < count; i++) if (i !== leadIndex) order.push(i)
  order.sort((a, b) => {
    const pa = gridPositions[a], pb = gridPositions[b]
    const da = Math.hypot(pa.x - gridPositions[leadIndex].x, pa.y - gridPositions[leadIndex].y)
    const db = Math.hypot(pb.x - gridPositions[leadIndex].x, pb.y - gridPositions[leadIndex].y)
    return da - db
  })
  const startOffset = new Array(count).fill(0)
  order.forEach((idx, k) => { startOffset[idx] = 80 + k * stagger })


  function step(now) {
    const elapsed = now - startTime
    let active = false
    for (let i = 0; i < count; i++) {
      const el = cardEls[i]
      const t = Math.max(0, Math.min(1, (elapsed - startOffset[i]) / duration))
      const e = easeOutQuint(t)
      const from = heroPos
      const to = gridPositions[i]
      const fromOp = i === leadIndex ? 1 : 0
      const toOp = 1
      applyTransform(el, {
        x: lerp(from.x, to.x, e),
        y: lerp(from.y, to.y, e),
        scale: lerp(from.scale, to.scale, e),
      }, lerp(fromOp, toOp, e))
      if (t < 1) active = true
    }
    if (active) requestAnimationFrame(step)
    else { animating = false; phase = PHASE.GRID; updateScrollIndicator(phase) }
  }
  updateScrollIndicator(PHASE.GRID)
  requestAnimationFrame(step)
}

// --- Grid → Hero: cards collapse back behind the lead ---
function animateGridToHero() {
  if (animating || phase !== PHASE.GRID) return
  animating = true
  const { gridPositions, heroPos, count, leadIndex } = computeLayout()
  hideExtraCards(count)

  const startTime = performance.now()
  const duration = 600
  const stagger = 35
  const order = []
  for (let i = 0; i < count; i++) if (i !== leadIndex) order.push(i)
  order.sort((a, b) => {
    const pa = gridPositions[a], pb = gridPositions[b]
    const da = Math.hypot(pa.x - gridPositions[leadIndex].x, pa.y - gridPositions[leadIndex].y)
    const db = Math.hypot(pb.x - gridPositions[leadIndex].x, pb.y - gridPositions[leadIndex].y)
    return db - da // farthest leave first
  })
  const startOffset = new Array(count).fill(0)
  order.forEach((idx, k) => { startOffset[idx] = k * stagger })


  function step(now) {
    const elapsed = now - startTime
    let active = false
    for (let i = 0; i < count; i++) {
      const el = cardEls[i]
      const t = Math.max(0, Math.min(1, (elapsed - startOffset[i]) / duration))
      const e = easeOutQuint(t)
      const from = gridPositions[i]
      const to = heroPos
      const fromOp = 1
      const toOp = i === leadIndex ? 1 : 0
      applyTransform(el, {
        x: lerp(from.x, to.x, e),
        y: lerp(from.y, to.y, e),
        scale: lerp(from.scale, to.scale, e),
      }, lerp(fromOp, toOp, e))
      if (t < 1) active = true
    }
    if (active) requestAnimationFrame(step)
    else { animating = false; phase = PHASE.HERO; updateScrollIndicator(phase) }
  }
  updateScrollIndicator(PHASE.HERO)
  requestAnimationFrame(step)
}

// --- Grid → Folder: all visible cards fly into the macOS folder ---
function animateGridToFolder() {
  if (animating || phase !== PHASE.GRID) return
  animating = true

  folderSection.classList.add('is-visible')
  folderSection.offsetHeight // force layout so folderRect is readable

  const folderRect = boardFolder.getBoundingClientRect()
  const targetX = folderRect.left + folderRect.width / 2
  const targetY = folderRect.top + folderRect.height / 2

  const { count, fitScale } = computeLayout()

  const clones = []
  for (let i = 0; i < count; i++) {
    const el = cardEls[i]
    const rect = el.getBoundingClientRect()
    const cardW = el.offsetWidth
    const cardH = el.offsetHeight
    const clone = document.createElement('div')
    clone.className = 'fly-card'
    clone.innerHTML = cardInnerHTML(poolCards[i])
    clone.style.left = '0px'
    clone.style.top = '0px'
    clone.style.width = cardW + 'px'
    clone.style.height = cardH + 'px'
    clone.style.transform = `translate(${rect.left}px, ${rect.top}px) scale(${fitScale})`
    flyOverlay.appendChild(clone)
    clones.push({ clone, cardW, cardH })
  }

  cardEls.forEach(el => { el.style.opacity = '0' })

  const flightDurationMs = 1100
  const stagger = 60
  const fadeStart = 700
  const endScale = 0.08
  const lastIndex = count - 1

  requestAnimationFrame(() => {
    clones.forEach(({ clone, cardW, cardH }, i) => {
      const endX = targetX - (cardW * endScale) / 2
      const endY = targetY - (cardH * endScale) / 2
      const delay = (lastIndex - i) * stagger // lead card leaves first
      clone.style.transition = [
        `transform ${flightDurationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        `opacity 300ms ease ${delay + fadeStart}ms`,
      ].join(', ')
      clone.style.transform = `translate(${endX}px, ${endY}px) scale(${endScale})`
      clone.style.opacity = '0'
    })
  })

  heroGridSection.style.transition = 'opacity 0.5s ease'
  heroGridSection.style.opacity = '0'

  const totalMs = flightDurationMs + lastIndex * stagger + 120
  setTimeout(() => {
    heroGridSection.style.pointerEvents = 'none'
    flyOverlay.innerHTML = ''
    animating = false
    phase = PHASE.FOLDER
    updateScrollIndicator(phase)
  }, totalMs)
  updateScrollIndicator(PHASE.FOLDER)
}

// --- Folder → Grid ---
function animateFolderToGrid() {
  if (animating || phase !== PHASE.FOLDER) return
  animating = true
  folderSection.classList.remove('is-visible')
  heroGridSection.style.transition = 'opacity 0.4s ease'
  heroGridSection.style.opacity = '1'
  heroGridSection.style.pointerEvents = ''
  const { gridPositions, count } = computeLayout()
  hideExtraCards(count)
  for (let i = 0; i < count; i++) applyTransform(cardEls[i], gridPositions[i], 1)

  setTimeout(() => {
    animating = false
    phase = PHASE.GRID
    updateScrollIndicator(phase)
  }, 450)
  updateScrollIndicator(PHASE.GRID)
}

// --- Navigation ---
let introPlayed = false
function isWaitlistOpen() { return document.body.classList.contains('waitlist-open') }

function handleScrollDown() {
  if (isWaitlistOpen() || animating) return
  if (!introPlayed) { introPlayed = true; animateIntro(); return }
  if (phase === PHASE.HERO) animateHeroToGrid()
  else if (phase === PHASE.GRID) animateGridToFolder()
}
function handleScrollUp() {
  if (isWaitlistOpen() || animating) return
  if (phase === PHASE.FOLDER) animateFolderToGrid()
  else if (phase === PHASE.GRID) animateGridToHero()
}

document.addEventListener('click', (e) => {
  if (animating || isWaitlistOpen()) return
  if (e.target.closest('.card, .scroll-indicator, .waitlist-modal, a, button, input, textarea, select, label')) return
  handleScrollDown()
})

document.addEventListener('wheel', (e) => {
  if (isWaitlistOpen()) return
  if (e.deltaY > 20) handleScrollDown()
  else if (e.deltaY < -20) handleScrollUp()
}, { passive: true })

let touchStartY = 0, touchStartTime = 0
document.addEventListener('touchstart', (e) => {
  if (isWaitlistOpen()) return
  if (e.target.closest('a, button, input, textarea, select, label')) return
  touchStartY = e.touches[0].clientY
  touchStartTime = Date.now()
}, { passive: true })
document.addEventListener('touchend', (e) => {
  if (isWaitlistOpen()) return
  if (e.target.closest('a, button, input, textarea, select, label')) return
  const dy = touchStartY - e.changedTouches[0].clientY
  const dt = Date.now() - touchStartTime
  const velocity = Math.abs(dy) / dt
  const threshold = window.innerWidth <= 768 ? 80 : 50
  if (dy > threshold && velocity > 0.15) handleScrollDown()
  else if (dy < -threshold && velocity > 0.15) handleScrollUp()
}, { passive: true })

scrollIndicator.addEventListener('click', () => {
  if (isWaitlistOpen() || animating) return
  if (phase === PHASE.FOLDER) handleScrollUp()
  else handleScrollDown()
})
scrollIndicator.addEventListener('keydown', (e) => {
  if (isWaitlistOpen() || animating) return
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (phase === PHASE.FOLDER) handleScrollUp()
    else handleScrollDown()
  }
})

window.addEventListener('resize', () => {
  if (animating) return
  applyPhase(phase)
})

// --- Boot ---
const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve()
const imgPromises = cardEls.map(el => {
  const img = el.querySelector('.card-img')
  if (img && !img.complete) return new Promise(resolve => { img.onload = resolve; img.onerror = resolve })
  return Promise.resolve()
})

Promise.all([fontPromise, ...imgPromises]).then(() => {
  const { heroPos, count, leadIndex } = computeLayout()
  hideExtraCards(count)
  // All visible cards start stacked at the hero position, invisible.
  for (let i = 0; i < count; i++) {
    if (i === leadIndex) applyTransform(cardEls[i], heroPos, 0)
    else applyTransform(cardEls[i], heroPos, 0)
  }
  requestAnimationFrame(() => {
    introPlayed = true
    animateIntro()
  })
})
