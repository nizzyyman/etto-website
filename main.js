import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext'

const QUOTE = "SPEND MORE TIME CREATIVE DIRECTING. "
function isMobileViewport() {
  return window.innerWidth <= 768
}
const FONT = isMobileViewport() ? '700 12px "ABC Diatype Expanded"' : '700 22px "ABC Diatype Expanded"'
const LINE_HEIGHT = isMobileViewport() ? 18 : 32
const text = QUOTE.repeat(200)
let preparedText = null

const CARD_MARGIN = 10 // breathing room between card and text

const cards = [
  { col: 0, x: isMobileViewport() ? 0 : 20, y: isMobileViewport() ? 0 : 10, img: '/images/blazer.jpg', title: 'Kartik Research Embroidered Wool Blazer', price: '$1,895', tags: [{ name: '100% wool', color: '#e0e7ff' }, { name: 'embroidered', color: '#fef3c7' }], note: 'statement blazer for your friends wedding' },
  { col: 0, x: isMobileViewport() ? (window.innerWidth - 40 - 150 - 28) : 300, y: isMobileViewport() ? 0 : 180, img: '/images/polo.jpg', title: 'A.PRESSE Washed Silk Polo', price: '$495', tags: [{ name: 'textured finish', color: '#dcfce7' }, { name: '100% silk', color: '#fce7f3' }], note: 'layered under your grey sport coat' },
  { col: 1, x: 20, y: 10, img: '/images/tee.jpg', title: 'Merz b. Schwanen Cotton Tee', price: '$85', tags: [{ name: 'essentials', color: '#f4f4f5' }, { name: 'organic cotton', color: '#dcfce7' }], note: 'wider silhouette for you' },
  { col: 1, x: 380, y: 10, img: '/images/jeans.jpg', title: 'orSlow 105 Straight-Leg Jeans', price: '$375', tags: [{ name: '13.5oz denim', color: '#dbeafe' }, { name: 'washed black', color: '#e0e7ff' }], note: 'a good pair of vintage inspired 90s Levis 501-style jeans' },
  { col: 1, x: 280, y: 220, img: '/images/yeezy.png', title: 'YEEZY', price: '$40', tags: [{ name: 'nylon with sheen', color: '#f4f4f5' }, { name: 'gorpcore', color: '#fef3c7' }], note: 'easy, versatile, and cheap. The brown has a cool sheen to it.' },
]

const columns = [document.getElementById('col-left'), document.getElementById('col-right')]
const section1 = document.getElementById('section-1')
const section2 = document.getElementById('section-2')
const boardFolder = document.getElementById('board-folder')
const boardThumbs = document.getElementById('board-folder-thumbs')
const flyOverlay = document.getElementById('fly-overlay')
const scrollIndicator = document.getElementById('scroll-indicator')
const section2Inner = document.getElementById('section-2-inner')

// Folder thumbnails
cards.slice(0, 3).forEach(c => {
  const thumb = document.createElement('img')
  thumb.className = 'board-folder-thumb'
  thumb.src = c.img
  thumb.alt = c.title
  boardThumbs.appendChild(thumb)
})

const boardThumbEls = Array.from(boardThumbs.children)

function setMobileSection2CopyVisible(visible) {
  if (!isMobileViewport()) return
  section2Inner.classList.toggle('mobile-entering', !visible)
  section2Inner.classList.toggle('mobile-ready', visible)
}

function setMobileBoardThumbVisibility(indices, visible) {
  if (!isMobileViewport()) return
  indices.forEach(index => {
    const thumb = boardThumbEls[index]
    if (!thumb) return
    thumb.classList.toggle('is-hidden', !visible)
  })
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeInCubic(t) {
  return t * t * t
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

// Card HTML template
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

// Intro animation — final positions resolved after images load
const INTRO_X = 8
const INTRO_Y = 8
const INTRO_LEAD_CARD_INDEX = 0
let finalPositions = cards.map(c => ({ x: c.x, y: c.y, col: c.col }))

// On load: all cards live in col 0, stacked. Right-col cards hidden.
cards.forEach(c => { c.x = INTRO_X; c.y = INTRO_Y; c.col = 0 })

function createCardEl(card, index) {
  const el = document.createElement('div')
  el.className = 'card'
  el.setAttribute('tabindex', '0')
  el.setAttribute('role', 'group')
  el.setAttribute('aria-label', card.title)
  el.dataset.index = index
  el.style.left = INTRO_X + 'px'
  el.style.top = INTRO_Y + 'px'
  // Right-column cards start hidden
  if (finalPositions[index].col === 1) {
    el.style.opacity = '0'
    el.style.pointerEvents = 'none'
  }
  el.innerHTML = cardInnerHTML(card)
  // All cards start in column 0
  columns[0].appendChild(el)
  return el
}

const cardEls = cards.map((c, i) => createCardEl(c, i))

function applyIntroStackOrder() {
  // Keep the intended lead card on top during the intro stack.
  cardEls.forEach((el, i) => {
    el.style.zIndex = i === INTRO_LEAD_CARD_INDEX ? 30 : 10
  })
}

applyIntroStackOrder()

function syncRects() {
  cards.forEach((c, i) => {
    c.w = cardEls[i].offsetWidth
    c.h = cardEls[i].offsetHeight
  })
}

// Drag
let dragTarget = null
let dragOffset = { x: 0, y: 0 }
let animating = false

document.addEventListener('pointerdown', (e) => {
  if (animating) return
  const el = e.target.closest('.card')
  if (!el) return
  dragTarget = el
  const rect = el.getBoundingClientRect()
  dragOffset.x = e.clientX - rect.left
  dragOffset.y = e.clientY - rect.top
  el.setPointerCapture(e.pointerId)
  el.style.cursor = 'grabbing'
})

document.addEventListener('pointermove', (e) => {
  if (!dragTarget) return
  const idx = parseInt(dragTarget.dataset.index)
  const c = cards[idx]
  const col = columns[c.col]
  const colRect = col.getBoundingClientRect()
  c.x = e.clientX - colRect.left - dragOffset.x
  c.y = e.clientY - colRect.top - dragOffset.y
  dragTarget.style.left = c.x + 'px'
  dragTarget.style.top = c.y + 'px'
  renderColumn(c.col)
})

document.addEventListener('pointerup', () => {
  if (dragTarget) { dragTarget.style.cursor = 'grab'; dragTarget = null }
})

document.addEventListener('keydown', (e) => {
  if (animating) return
  const el = document.activeElement?.closest('.card')
  if (!el) return
  const step = 10
  const idx = parseInt(el.dataset.index)
  const c = cards[idx]
  let moved = false
  if (e.key === 'ArrowLeft') { c.x -= step; moved = true }
  else if (e.key === 'ArrowRight') { c.x += step; moved = true }
  else if (e.key === 'ArrowUp') { c.y -= step; moved = true }
  else if (e.key === 'ArrowDown') { c.y += step; moved = true }
  if (moved) {
    e.preventDefault()
    el.style.left = c.x + 'px'
    el.style.top = c.y + 'px'
    renderColumn(c.col)
  }
})

// Text layout
function getLineSegments(y, lineHeight, colWidth, obstacles) {
  const overlapping = obstacles.filter(r =>
    (r.y - CARD_MARGIN) < y + lineHeight && (r.y + r.h + CARD_MARGIN) > y
  )
  if (overlapping.length === 0) return [{ x: 0, width: colWidth }]

  const blocked = overlapping.map(r => ({
    left: Math.max(0, r.x - CARD_MARGIN), right: Math.min(colWidth, r.x + r.w + CARD_MARGIN),
  })).sort((a, b) => a.left - b.left)

  const merged = [blocked[0]]
  for (let i = 1; i < blocked.length; i++) {
    const last = merged[merged.length - 1]
    if (blocked[i].left <= last.right) last.right = Math.max(last.right, blocked[i].right)
    else merged.push(blocked[i])
  }

  const segments = []
  let cursor = 0
  for (const b of merged) {
    if (b.left > cursor && b.left - cursor > 30) segments.push({ x: cursor, width: b.left - cursor })
    cursor = Math.max(cursor, b.right)
  }
  if (cursor < colWidth && colWidth - cursor > 30) segments.push({ x: cursor, width: colWidth - cursor })
  return segments
}

function renderColumn(colIndex) {
  const col = columns[colIndex]
  const canvas = col.querySelector('canvas')
  const dpr = window.devicePixelRatio || 1
  const w = col.clientWidth
  const h = col.clientHeight

  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, w, h)
  ctx.font = FONT
  ctx.fillStyle = '#000'
  ctx.textBaseline = 'top'

  const obstacles = cards
    .map((c, i) => ({ c, el: cardEls[i] }))
    .filter(({ c, el }) => c.col === colIndex && el.style.opacity !== '0' && el.style.visibility !== 'hidden')
    .map(({ c }) => {
      const left = Math.max(0, c.x)
      const right = Math.min(w, c.x + c.w)
      const top = Math.max(0, c.y)
      const bottom = Math.min(h, c.y + c.h)
      if (right <= left || bottom <= top) return null
      return {
        x: left,
        y: top,
        w: right - left,
        h: bottom - top,
      }
    })
    .filter(Boolean)
  if (!preparedText) return

  let cursor = { segmentIndex: 0, graphemeIndex: 0 }
  let y = 0

  while (y + LINE_HEIGHT < h) {
    const segments = getLineSegments(y, LINE_HEIGHT, w, obstacles)
    if (segments.length === 0) { y += LINE_HEIGHT; continue }
    for (const seg of segments) {
      let line = layoutNextLine(preparedText, cursor, seg.width)
      if (line === null) {
        cursor = { segmentIndex: 0, graphemeIndex: 0 }
        line = layoutNextLine(preparedText, cursor, seg.width)
      }
      if (!line || !line.text.trim()) continue

      const scaleX = line.width > 0 ? seg.width / line.width : 1
      ctx.save()
      ctx.translate(seg.x, y + 4)
      ctx.scale(scaleX, 1)
      ctx.fillText(line.text, 0, 0)
      ctx.restore()
      cursor = line.end
    }
    y += LINE_HEIGHT
  }
}

function renderAll() {
  syncRects()
  renderColumn(0)
  renderColumn(1)
}

// --- Section transition animation ---
let onSection2 = false
let introExpanded = false

function animateToSection2() {
  if (animating || onSection2) return
  animating = true
  onSection2 = true
  scrollIndicator.classList.add('at-bottom')

  if (isMobileViewport()) {
    setMobileSection2CopyVisible(false)
    setMobileBoardThumbVisibility([0, 1], false)

    const thumbRects = boardThumbEls.slice(0, 2).map(thumb => thumb.getBoundingClientRect())
    const visibleCards = cardEls
      .map((el, i) => ({ el, i }))
      .filter(({ i }) => cards[i].col === 0)
      .slice(0, 2)

    const viewportHeight = window.innerHeight
    const stage1Duration = 300
    const stage2Duration = 920
    const stage3HoldDuration = 160
    const stage4Duration = 560
    const totalDuration = stage1Duration + stage2Duration + stage3HoldDuration + stage4Duration
    const animationStart = performance.now() + 20
    const leftColRect = columns[0].getBoundingClientRect()
    const card0Meta = visibleCards[0]
    const card1Meta = visibleCards[1]
    const card0Index = card0Meta.i
    const card1Index = card1Meta.i
    const card0El = card0Meta.el
    const card1El = card1Meta.el
    const card0Start = { x: cards[card0Index].x, y: cards[card0Index].y }
    const card1Start = { x: cards[card1Index].x, y: cards[card1Index].y }
    const cardExitVisibleSliver = 42
    const mobileRightShadowAllowance = 16
    const rightLaneX = Math.max(
      card1Start.x,
      columns[0].clientWidth - card1El.offsetWidth - mobileRightShadowAllowance
    )
    const card0Down = {
      x: card0Start.x,
      y: columns[0].clientHeight - cardExitVisibleSliver,
    }
    const card1Peel = {
      x: rightLaneX,
      y: card0Start.y,
    }
    const card1Down = {
      x: rightLaneX,
      y: columns[0].clientHeight - cardExitVisibleSliver,
    }
    const finalScale = 0.26
    let stage3Clones = null

    function setCardPosition(index, point) {
      cards[index].x = point.x
      cards[index].y = point.y
      cardEls[index].style.left = point.x + 'px'
      cardEls[index].style.top = point.y + 'px'
    }

    function createStage3Clones() {
      if (stage3Clones) return stage3Clones

      const cloneData = [
        {
          el: card0El,
          index: card0Index,
          thumbRect: thumbRects[0] || boardFolder.getBoundingClientRect(),
          startPoint: { x: leftColRect.left + card0Start.x, y: leftColRect.top + card0Start.y },
        },
        {
          el: card1El,
          index: card1Index,
          thumbRect: thumbRects[1] || boardFolder.getBoundingClientRect(),
          startPoint: { x: leftColRect.left + card1Peel.x, y: leftColRect.top + card1Peel.y },
        },
      ].map(({ el, index, thumbRect, startPoint }, order) => {
        const currentRect = el.getBoundingClientRect()
        const rect = {
          left: startPoint.x,
          top: startPoint.y,
          width: currentRect.width,
          height: currentRect.height,
        }
        const clone = document.createElement('div')
        clone.className = 'fly-card mobile-merge'
        clone.innerHTML = cardInnerHTML(cards[index])
        clone.style.left = rect.left + 'px'
        clone.style.top = rect.top + 'px'
        clone.style.width = rect.width + 'px'
        clone.style.zIndex = String(40 - order)
        clone.style.transformOrigin = 'top center'
        flyOverlay.appendChild(clone)
        el.style.visibility = 'hidden'
        return {
          clone,
          start: { x: rect.left, y: rect.top, scale: 1, opacity: 1 },
          target: {
            x: thumbRect.left + (thumbRect.width - rect.width) / 2,
            y: thumbRect.top + (thumbRect.height - rect.height) / 2,
            scale: finalScale,
            opacity: 0,
          },
        }
      })

      stage3Clones = cloneData
      return stage3Clones
    }

    function applyCloneState(clone, base, state) {
      clone.style.transform = `translate(${state.x - base.x}px, ${state.y - base.y}px) scale(${state.scale})`
      clone.style.opacity = String(state.opacity)
    }

    function interpolateState(from, to, t) {
      return {
        x: lerp(from.x, to.x, t),
        y: lerp(from.y, to.y, t),
        scale: lerp(from.scale ?? 1, to.scale ?? 1, t),
        opacity: lerp(from.opacity ?? 1, to.opacity ?? 1, t),
      }
    }

    function stepMobileMerge(now) {
      const elapsed = Math.max(0, now - animationStart)
      let anyActive = true

      if (elapsed <= stage1Duration) {
        const t = easeInOutCubic(Math.min(1, elapsed / stage1Duration))
        setCardPosition(card0Index, card0Start)
        setCardPosition(card1Index, interpolateState(card1Start, card1Peel, t))
        renderAll()
      } else if (elapsed <= stage1Duration + stage2Duration) {
        const t = easeInOutCubic(Math.min(1, (elapsed - stage1Duration) / stage2Duration))
        setCardPosition(card0Index, interpolateState(card0Start, card0Down, t))
        setCardPosition(card1Index, interpolateState(card1Peel, card1Down, t))
        renderAll()
      } else if (elapsed <= stage1Duration + stage2Duration + stage3HoldDuration) {
        const t = Math.min(1, (elapsed - stage1Duration - stage2Duration) / stage3HoldDuration)
        setCardPosition(card0Index, card0Down)
        setCardPosition(card1Index, card1Down)
        renderAll()
        section1.style.opacity = String(Math.max(0, 1 - t * 5))
      } else if (elapsed <= totalDuration) {
        const t = Math.min(1, (elapsed - stage1Duration - stage2Duration - stage3HoldDuration) / stage4Duration)
        const moveT = easeInOutCubic(t)
        const fadeT = easeInCubic(Math.max(0, (t - 0.42) / 0.58))
        const clones = createStage3Clones()
        section1.style.opacity = '0'
        clones.forEach(({ clone, start, target }) => {
          applyCloneState(clone, start, interpolateState(start, { ...target, opacity: 1 - fadeT }, moveT))
        })
      } else {
        anyActive = false
        const clones = createStage3Clones()
        section1.style.opacity = '0'
        clones.forEach(({ clone, start, target }) => {
          applyCloneState(clone, start, target)
        })
      }

      if (anyActive) requestAnimationFrame(stepMobileMerge)
    }

    requestAnimationFrame(stepMobileMerge)

    setTimeout(() => {
      setMobileBoardThumbVisibility([0, 1], true)
    }, stage1Duration + stage2Duration + stage3HoldDuration + Math.round(stage4Duration * 0.7))

    setTimeout(() => {
      setMobileSection2CopyVisible(true)
    }, totalDuration + 110)

    setTimeout(() => {
      document.querySelector('footer').classList.add('visible')
      document.body.classList.add('show-footer')
    }, totalDuration + 110)

    setTimeout(() => {
      section1.style.pointerEvents = 'none'
      flyOverlay.innerHTML = ''
      animating = false
    }, totalDuration + 520)

    return
  }

  // 1. Fade out section 1 (reveals section 2 behind)
  const fadeDuration = 0.5
  section1.style.transition = `opacity ${fadeDuration}s ease`
  section1.style.opacity = '0'

  // 2. Measure folder target
  const folderRect = boardFolder.getBoundingClientRect()
  const targetX = folderRect.left + folderRect.width / 2
  const targetY = folderRect.top + folderRect.height / 2

  // 3. Clone cards into fixed overlay
  const visibleCards = cardEls.map((el, i) => ({ el, i }))

  const clones = visibleCards.map(({ el, i }) => {
    const rect = el.getBoundingClientRect()
    const clone = document.createElement('div')
    clone.className = 'fly-card'
    clone.innerHTML = cardInnerHTML(cards[i])
    clone.style.left = rect.left + 'px'
    clone.style.top = rect.top + 'px'
    clone.style.width = rect.width + 'px'
    flyOverlay.appendChild(clone)
    return { clone, startX: rect.left, startY: rect.top, w: rect.width, h: rect.height }
  })

  // 4. Hide originals
  visibleCards.forEach(({ el }) => { el.style.visibility = 'hidden' })

  // 5. Animate clones to folder with stagger
  const flightDuration = 1.1
  const stagger = 80
  const fadeStart = 700
  const endScale = 0.08

  requestAnimationFrame(() => {
    clones.forEach(({ clone, startX, startY, w, h }, i) => {
      const dx = targetX - (startX + w / 2)
      const dy = targetY - (startY + h / 2)
      const delay = i * stagger

      clone.style.transition = [
        `transform ${flightDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        `opacity 0.3s ease ${delay + fadeStart}ms`,
      ].join(', ')
      clone.style.transform = `translate(${dx}px, ${dy}px) scale(${endScale})`
      clone.style.opacity = '0'
    })
  })

  // 6. Clean up after animation completes
  setTimeout(() => {
    section1.style.pointerEvents = 'none'
    flyOverlay.innerHTML = ''
    animating = false
  }, 1600)
}

function animateToSection1() {
  if (animating || !onSection2) return
  animating = true
  onSection2 = false
  scrollIndicator.classList.remove('at-bottom')
  if (isMobileViewport()) {
    document.querySelector('footer').classList.remove('visible')
    document.body.classList.remove('show-footer')
    setMobileSection2CopyVisible(false)
    setMobileBoardThumbVisibility([0, 1], false)
  }

  // Restore section 1
  const restoreCards = isMobileViewport()
    ? cardEls.filter((_, i) => cards[i].col === 0)
    : cardEls
  restoreCards.forEach(el => { el.style.visibility = '' })
  const reverseDuration = isMobileViewport() ? 0.25 : 0.4
  section1.style.transition = `opacity ${reverseDuration}s ease`
  section1.style.opacity = '1'
  section1.style.pointerEvents = ''
  flyOverlay.innerHTML = ''

  setTimeout(() => {
    section1.style.transition = 'none'
    animating = false
    renderAll()
  }, isMobileViewport() ? 250 : 400)
}

// Wheel & touch — first interaction triggers intro, subsequent ones navigate sections
let introPlayed = false

function isWaitlistOpen() {
  return document.body.classList.contains('waitlist-open')
}

function handleScrollDown() {
  if (isWaitlistOpen()) return
  if (!introPlayed || !introExpanded) {
    introPlayed = true
    animateIntro()
  } else {
    animateToSection2()
  }
}

function handleScrollUp() {
  if (isWaitlistOpen()) return
  if (onSection2) animateToSection1()
  else if (introExpanded) animateBackToIntro()
}

document.addEventListener('click', (e) => {
  if (animating) return
  if (isWaitlistOpen()) return
  // Ignore clicks on interactive elements (cards, scroll indicator, links)
  if (e.target.closest('.card, .scroll-indicator, .waitlist-modal, a, button, input, textarea, select, label')) return
  handleScrollDown()
})

document.addEventListener('wheel', (e) => {
  if (isWaitlistOpen()) return
  if (e.deltaY > 20) handleScrollDown()
  else if (e.deltaY < -20) handleScrollUp()
}, { passive: true })

let touchStartY = 0
let touchStartTime = 0
document.addEventListener('touchstart', (e) => {
  if (isWaitlistOpen()) return
  touchStartY = e.touches[0].clientY
  touchStartTime = Date.now()
}, { passive: true })
document.addEventListener('touchend', (e) => {
  if (isWaitlistOpen()) return
  const dy = touchStartY - e.changedTouches[0].clientY
  const dt = Date.now() - touchStartTime
  const velocity = Math.abs(dy) / dt // px per ms
  const threshold = isMobileViewport() ? 100 : 50
  if (dy > threshold && velocity > 0.15) handleScrollDown()
  else if (dy < -threshold && velocity > 0.15) handleScrollUp()
}, { passive: true })

scrollIndicator.addEventListener('click', () => {
  if (isWaitlistOpen()) return
  if (!introPlayed) { introPlayed = true; animateIntro() }
  else if (onSection2 || introExpanded) handleScrollUp()
  else animateToSection2()
})
scrollIndicator.addEventListener('keydown', (e) => {
  if (isWaitlistOpen()) return
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (!introPlayed) { introPlayed = true; animateIntro() }
    else if (onSection2 || introExpanded) handleScrollUp()
    else animateToSection2()
  }
})

window.addEventListener('resize', () => { if (!onSection2) renderAll() })

// --- Intro fly-in animation ---
function easeOutQuint(t) {
  return 1 - Math.pow(1 - t, 5)
}

function animateIntro() {
  animating = true

  const visibleIndices = isMobileViewport()
    ? cards.map((c, i) => i).filter(i => finalPositions[i].col === 0)
    : cards.map((_, i) => i)

  // Move right-col cards to their real column before animating
  // Calculate offset between col0 and col1 for positioning
  const col0Rect = columns[0].getBoundingClientRect()
  const col1Rect = columns[1] ? columns[1].getBoundingClientRect() : col0Rect
  const colOffset = col0Rect.left - col1Rect.left // negative value

  visibleIndices.forEach(i => {
    const fp = finalPositions[i]
    if (fp.col === 1) {
      // Move element to correct column
      columns[0].removeChild(cardEls[i])
      columns[1].appendChild(cardEls[i])
      // Start position: offset so it appears at the same left-page spot
      cards[i].x = INTRO_X + colOffset
      cards[i].y = INTRO_Y
      cardEls[i].style.left = cards[i].x + 'px'
      cardEls[i].style.top = cards[i].y + 'px'
      cards[i].col = 1
    }
    // Reveal hidden cards
    cardEls[i].style.opacity = '1'
    cardEls[i].style.pointerEvents = ''
  })

  // Remove overflow:hidden so cards can fly across columns
  columns.forEach(col => { col.style.overflow = 'visible' })

  const startPositions = visibleIndices.map(i => ({ x: cards[i].x, y: cards[i].y }))

  const stagger = 120
  const duration = 1000
  const startTime = performance.now()
  const cardStartTimes = visibleIndices.map((_, order) => startTime + order * stagger)

  function step(now) {
    let anyActive = false

    visibleIndices.forEach((i, order) => {
      const elapsed = now - cardStartTimes[order]
      if (elapsed < 0) { anyActive = true; return }

      const t = Math.min(elapsed / duration, 1)
      const ease = easeOutQuint(t)

      cards[i].x = startPositions[order].x + (finalPositions[i].x - startPositions[order].x) * ease
      cards[i].y = startPositions[order].y + (finalPositions[i].y - startPositions[order].y) * ease
      cardEls[i].style.left = cards[i].x + 'px'
      cardEls[i].style.top = cards[i].y + 'px'

      if (t < 1) anyActive = true
    })

    renderAll()

    if (anyActive) {
      requestAnimationFrame(step)
    } else {
      visibleIndices.forEach(i => {
        cards[i].x = finalPositions[i].x
        cards[i].y = finalPositions[i].y
        cardEls[i].style.left = cards[i].x + 'px'
        cardEls[i].style.top = cards[i].y + 'px'
      })
      columns.forEach(col => { col.style.overflow = '' })
      renderAll()
      introExpanded = true
      animating = false
    }
  }

  requestAnimationFrame(step)
}

function animateBackToIntro() {
  if (animating || !introExpanded || onSection2) return
  animating = true

  const visibleIndices = isMobileViewport()
    ? cards.map((c, i) => i).filter(i => finalPositions[i].col === 0)
    : cards.map((_, i) => i)

  const col0Rect = columns[0].getBoundingClientRect()
  const col1Rect = columns[1] ? columns[1].getBoundingClientRect() : col0Rect
  const colOffset = col0Rect.left - col1Rect.left

  visibleIndices.forEach(i => {
    if (cards[i].col === 1) {
      columns[1].removeChild(cardEls[i])
      columns[0].appendChild(cardEls[i])
      cards[i].x -= colOffset
      cardEls[i].style.left = cards[i].x + 'px'
      cardEls[i].style.top = cards[i].y + 'px'
      cards[i].col = 0
    }
  })

  columns.forEach(col => { col.style.overflow = 'visible' })

  const startPositions = visibleIndices.map(i => ({ x: cards[i].x, y: cards[i].y }))
  const stagger = 90
  const duration = 700
  const startTime = performance.now()
  const cardStartTimes = visibleIndices.map((_, order) => startTime + order * stagger)

  function step(now) {
    let anyActive = false

    visibleIndices.forEach((i, order) => {
      const elapsed = now - cardStartTimes[order]
      if (elapsed < 0) { anyActive = true; return }

      const t = Math.min(elapsed / duration, 1)
      const ease = easeOutQuint(t)

      cards[i].x = startPositions[order].x + (INTRO_X - startPositions[order].x) * ease
      cards[i].y = startPositions[order].y + (INTRO_Y - startPositions[order].y) * ease
      cardEls[i].style.left = cards[i].x + 'px'
      cardEls[i].style.top = cards[i].y + 'px'

      if (t < 1) anyActive = true
    })

    renderAll()

    if (anyActive) {
      requestAnimationFrame(step)
    } else {
      cards.forEach((card, i) => {
        card.x = INTRO_X
        card.y = INTRO_Y
        card.col = 0
        cardEls[i].style.left = INTRO_X + 'px'
        cardEls[i].style.top = INTRO_Y + 'px'
        if (finalPositions[i].col === 1) {
          cardEls[i].style.opacity = '0'
          cardEls[i].style.pointerEvents = 'none'
        } else {
          cardEls[i].style.opacity = '1'
          cardEls[i].style.pointerEvents = ''
        }
        if (cardEls[i].parentElement !== columns[0]) {
          cardEls[i].parentElement.removeChild(cardEls[i])
          columns[0].appendChild(cardEls[i])
        }
      })

      columns.forEach(col => { col.style.overflow = '' })
      renderAll()
      introExpanded = false
      animating = false
    }
  }

  requestAnimationFrame(step)
}

// Wait for both fonts and card images before initial render
const imgPromises = cardEls.map(el => {
  const img = el.querySelector('.card-img')
  if (img && !img.complete) {
    return new Promise(resolve => {
      img.onload = resolve
      img.onerror = resolve
    })
  }
  return Promise.resolve()
})

Promise.all([document.fonts.load(FONT), ...imgPromises]).then(() => {
  preparedText = prepareWithSegments(text, FONT)
  // Resolve dynamic positions (e.g. 'bottom') now that card heights are known
  syncRects()
  const colHeight = columns[0].clientHeight
  finalPositions = finalPositions.map((fp, i) => {
    let y = fp.y
    if (y === 'bottom') {
      y = colHeight - cardEls[i].offsetHeight - 18
    }
    return { ...fp, y }
  })
  setMobileSection2CopyVisible(false)
  setMobileBoardThumbVisibility([0, 1], false)
  renderAll()
})
