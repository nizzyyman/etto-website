import React from 'react';
import { motion, useInView } from 'framer-motion';
const navFade = {
  hidden: {
    opacity: 0,
    y: -8
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};
const titleVariants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  })
};
const cardReveal = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.055,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  })
};
interface ProductCard {
  id: string;
  name: string;
  price: string;
  image: string;
  tags: string[];
  note: string;
}
const allCards: ProductCard[] = [{
  id: 'c1',
  name: 'A.PRESSE Washed Silk Polo',
  price: '$495',
  image: 'https://www.etto.ai/images/polo.jpg',
  tags: ['textured finish', '100% silk'],
  note: 'layered under your grey sport coat'
}, {
  id: 'c2',
  name: 'Merz b. Schwanen Cotton Tee',
  price: '$85',
  image: 'https://www.etto.ai/images/tee.jpg',
  tags: ['essentials', 'organic cotton'],
  note: 'wider silhouette for you'
}, {
  id: 'c3',
  name: 'orSlow 105 Straight-Leg Jeans',
  price: '$375',
  image: 'https://www.etto.ai/images/jeans.jpg',
  tags: ['13.5oz denim', 'washed black'],
  note: 'a good pair of vintage inspired 90s Levis 501-style jeans'
}, {
  id: 'c4',
  name: 'Comme des Garçons Blazer',
  price: '$1,200',
  image: 'https://www.etto.ai/images/blazer.jpg',
  tags: ['oversized', 'structured'],
  note: 'throw over everything'
}, {
  id: 'c5',
  name: 'Lemaire Relaxed Trouser',
  price: '$420',
  image: 'https://www.etto.ai/images/jeans.jpg',
  tags: ['wool blend', 'tapered'],
  note: 'pair with your white sneakers'
}, {
  id: 'c6',
  name: 'Auralee Cotton Sweater',
  price: '$395',
  image: 'https://www.etto.ai/images/tee.jpg',
  tags: ['cashmere', 'ribbed'],
  note: 'weekend wear'
}, {
  id: 'c7',
  name: 'Jil Sander Linen Shirt',
  price: '$560',
  image: 'https://www.etto.ai/images/polo.jpg',
  tags: ['loose fit', '100% linen'],
  note: 'unbuttoned, untucked — always'
}, {
  id: 'c8',
  name: 'Our Legacy Suede Jacket',
  price: '$890',
  image: 'https://www.etto.ai/images/blazer.jpg',
  tags: ['suede', 'vintage wash'],
  note: 'best piece you\'ll reach for constantly'
}, {
  id: 'c9',
  name: 'Acne Studios Wide Trousers',
  price: '$480',
  image: 'https://www.etto.ai/images/jeans.jpg',
  tags: ['wide leg', 'wool'],
  note: 'wear high-waisted'
}, {
  id: 'c10',
  name: 'Maison Margiela Tabi Derby',
  price: '$1,100',
  image: 'https://www.etto.ai/images/tee.jpg',
  tags: ['leather', 'split toe'],
  note: 'the shoe that anchors any look'
}, {
  id: 'c11',
  name: 'Dries Van Noten Scarf',
  price: '$195',
  image: 'https://www.etto.ai/images/polo.jpg',
  tags: ['printed silk', 'oversized'],
  note: 'loop casually over the shoulder'
}, {
  id: 'c12',
  name: 'Margaret Howell Knit',
  price: '$345',
  image: 'https://www.etto.ai/images/tee.jpg',
  tags: ['merino', 'boxy'],
  note: 'effortless layering piece'
}];

// @component: BookLandingPage
export const BookLandingPage = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-60px'
  });
  return <div style={{
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
  }} className="min-h-screen w-full bg-white text-[#1a1a1a] overflow-x-hidden">
      {/* Navigation / Header */}
      <header className="w-full px-6 pt-5 pb-4 flex items-start justify-between">
        <motion.div custom={0} initial="hidden" animate="visible" variants={navFade} className="text-[13px] font-normal tracking-tight text-[#1a1a1a] leading-tight">ETTO</motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={navFade} className="flex flex-col gap-1" style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '20px'
      }}>
          <span className="text-[14px] font-normal text-[#1a1a1a] leading-snug whitespace-nowrap">Etto Systems Inc.</span>
          <span className="text-[13px] text-[#999] leading-snug whitespace-nowrap">Privacy Policy</span>
          <span className="text-[14px] font-normal text-[#1a1a1a] leading-snug whitespace-nowrap" style={{
          display: "none"
        }}>Volume II &nbsp; Number 2</span>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={navFade} className="flex flex-col gap-1 ml-auto mr-24">
          <span className="text-[13px] text-[#1a1a1a] leading-snug">Writing</span>
          <span className="text-[13px] text-[#1a1a1a] leading-snug mt-1">Instagram</span>
          <span className="text-[13px] text-[#1a1a1a] leading-snug mt-1">Youtube</span>
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={navFade} className="flex items-center gap-1 text-[13px] text-[#1a1a1a] whitespace-nowrap">
          <span>APPLY</span>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-0.5 mt-[-1px]">
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </header>

      {/* Giant Title */}
      <main className="w-full px-5 mt-8 select-none">
        {['The', 'workspace', 'for stylists', 'and CDs'].map((line, i) => <div key={line} className="overflow-hidden">
            <motion.div custom={i} initial="hidden" animate="visible" variants={titleVariants} style={{
          fontSize: 'clamp(80px, 13.5vw, 220px)',
          lineHeight: 1.0,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          color: '#1a1a1a'
        }}>
              {line}
            </motion.div>
          </div>)}
      </main>

      {/* Grid Section */}
      <section ref={sectionRef} className="w-full px-5 md:px-10 pt-16 pb-20 mt-2">
        <div className="max-w-[1280px] mx-auto">

        {/* ── TOP ROW: 6 cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-2">
          {allCards.slice(0, 6).map((card, i) => <motion.article key={card.id} custom={i} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={cardReveal} className="bg-white border border-[#e8e8e8] rounded-[6px] overflow-hidden" style={{
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
              <div className="w-full aspect-[4/5] overflow-hidden bg-[#f4f4f4]">
                <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
              </div>
              <div className="px-2 pt-2 pb-2">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="text-[10px] font-semibold text-[#1a1a1a] leading-snug">{card.name}</span>
                  <span className="text-[10px] font-normal text-[#1a1a1a] whitespace-nowrap shrink-0 ml-1">{card.price}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {card.tags.map(tag => <span key={tag} className="inline-block text-[9px] leading-none px-1.5 py-0.5 rounded-full bg-[#eaf6e0] text-[#3a6b1a] font-normal">
                      {tag}
                    </span>)}
                </div>
                <p className="text-[9px] text-[#888] leading-relaxed">
                  <strong className="font-medium text-[#555]">stylist note:</strong>
                  <span> {card.note}</span>
                </p>
              </div>
            </motion.article>)}
        </div>

        {/* ── MIDDLE ROW: 1 card | 4-col H1 | 1 card ── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-2 items-center">

          {/* Left card */}
          <motion.article key={allCards[6].id} custom={6} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={cardReveal} className="bg-white border border-[#e8e8e8] rounded-[6px] overflow-hidden" style={{
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div className="w-full aspect-[4/5] overflow-hidden bg-[#f4f4f4]">
              <img src={allCards[6].image} alt={allCards[6].name} className="w-full h-full object-cover" />
            </div>
            <div className="px-2 pt-2 pb-2">
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="text-[10px] font-semibold text-[#1a1a1a] leading-snug">{allCards[6].name}</span>
                <span className="text-[10px] font-normal text-[#1a1a1a] whitespace-nowrap shrink-0 ml-1">{allCards[6].price}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-1.5">
                {allCards[6].tags.map(tag => <span key={tag} className="inline-block text-[9px] leading-none px-1.5 py-0.5 rounded-full bg-[#eaf6e0] text-[#3a6b1a] font-normal">
                    {tag}
                  </span>)}
              </div>
              <p className="text-[9px] text-[#888] leading-relaxed">
                <strong className="font-medium text-[#555]">stylist note:</strong>
                <span> {allCards[6].note}</span>
              </p>
            </div>
          </motion.article>

          {/* Center text — spans 4 columns */}
          <motion.div initial={{
            opacity: 0,
            y: 16
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 16
          }} transition={{
            delay: 0.2,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }} className="col-span-1 md:col-span-4 flex items-center justify-center py-8 md:py-0">
            <h2 className="text-[#1a1a1a] font-bold text-center" style={{
              letterSpacing: '-0.025em',
              fontSize: 'clamp(22px, 2.6vw, 38px)',
              fontFamily: 'ABC Diatype Expanded',
              lineHeight: '1.2',
              maxWidth: '100%'
            }}>
              <span>Etto brings references, shopping lists,<br />client context, notes,<br />and decisions into one place.</span>
            </h2>
          </motion.div>

          {/* Right card */}
          <motion.article key={allCards[7].id} custom={7} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={cardReveal} className="bg-white border border-[#e8e8e8] rounded-[6px] overflow-hidden" style={{
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div className="w-full aspect-[4/5] overflow-hidden bg-[#f4f4f4]">
              <img src={allCards[7].image} alt={allCards[7].name} className="w-full h-full object-cover" />
            </div>
            <div className="px-2 pt-2 pb-2">
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="text-[10px] font-semibold text-[#1a1a1a] leading-snug">{allCards[7].name}</span>
                <span className="text-[10px] font-normal text-[#1a1a1a] whitespace-nowrap shrink-0 ml-1">{allCards[7].price}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-1.5">
                {allCards[7].tags.map(tag => <span key={tag} className="inline-block text-[9px] leading-none px-1.5 py-0.5 rounded-full bg-[#eaf6e0] text-[#3a6b1a] font-normal">
                    {tag}
                  </span>)}
              </div>
              <p className="text-[9px] text-[#888] leading-relaxed">
                <strong className="font-medium text-[#555]">stylist note:</strong>
                <span> {allCards[7].note}</span>
              </p>
            </div>
          </motion.article>

        </div>

        {/* ── BOTTOM ROW: 6 cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {allCards.slice(8, 12).concat(allCards.slice(0, 2)).map((card, i) => <motion.article key={`bot-${card.id}`} custom={i + 8} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={cardReveal} className="bg-white border border-[#e8e8e8] rounded-[6px] overflow-hidden" style={{
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
              <div className="w-full aspect-[4/5] overflow-hidden bg-[#f4f4f4]">
                <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
              </div>
              <div className="px-2 pt-2 pb-2">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="text-[10px] font-semibold text-[#1a1a1a] leading-snug">{card.name}</span>
                  <span className="text-[10px] font-normal text-[#1a1a1a] whitespace-nowrap shrink-0 ml-1">{card.price}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {card.tags.map(tag => <span key={tag} className="inline-block text-[9px] leading-none px-1.5 py-0.5 rounded-full bg-[#eaf6e0] text-[#3a6b1a] font-normal">
                      {tag}
                    </span>)}
                </div>
                <p className="text-[9px] text-[#888] leading-relaxed">
                  <strong className="font-medium text-[#555]">stylist note:</strong>
                  <span> {card.note}</span>
                </p>
              </div>
            </motion.article>)}
        </div>

        </div>
      </section>
    </div>;
};