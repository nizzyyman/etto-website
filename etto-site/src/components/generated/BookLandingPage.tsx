import React from 'react';
import { motion } from 'framer-motion';
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
const CARD_FAN_DURATION_MS = 950;
const CARD_FADE_DURATION_MS = 550;
const CARD_STAGGER_MS = 100;
const CARD_FAN_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const CARD_FADE_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
interface ProductCard {
  id: string;
  name: string;
  price: string;
  image: string;
  tags: string[];
  note: string;
}
interface SectionCardItem {
  key: string;
  card: ProductCard;
}
interface CardMotionData {
  offsetX: number;
  offsetY: number;
  order: number;
}
const STACK_NUDGE_X = 3;
const STACK_NUDGE_Y = 2;
const STACK_SCALE = 0.94;
const STACK_ROTATE = -1.5;
const allCards: ProductCard[] = [{
  id: 'c1',
  name: 'A.PRESSE Washed Silk Polo',
  price: '$495',
  image: '/images/polo.jpg',
  tags: ['textured finish', '100% silk'],
  note: 'layered under your grey sport coat'
}, {
  id: 'c2',
  name: 'Merz b. Schwanen Cotton Tee',
  price: '$85',
  image: '/images/tee.jpg',
  tags: ['essentials', 'organic cotton'],
  note: 'wider silhouette for you'
}, {
  id: 'c3',
  name: 'orSlow 105 Straight-Leg Jeans',
  price: '$375',
  image: '/images/jeans.jpg',
  tags: ['13.5oz denim', 'washed black'],
  note: 'a good pair of vintage inspired 90s Levis 501-style jeans'
}, {
  id: 'c4',
  name: 'Comme des Garçons Blazer',
  price: '$1,200',
  image: '/images/blazer.jpg',
  tags: ['oversized', 'structured'],
  note: 'throw over everything'
}, {
  id: 'c5',
  name: 'Lemaire Relaxed Trouser',
  price: '$420',
  image: '/images/jeans.jpg',
  tags: ['wool blend', 'tapered'],
  note: 'pair with your white sneakers'
}, {
  id: 'c6',
  name: 'Auralee Cotton Sweater',
  price: '$395',
  image: '/images/tee.jpg',
  tags: ['cashmere', 'ribbed'],
  note: 'weekend wear'
}, {
  id: 'c7',
  name: 'Jil Sander Linen Shirt',
  price: '$560',
  image: '/images/polo.jpg',
  tags: ['loose fit', '100% linen'],
  note: 'unbuttoned, untucked — always'
}, {
  id: 'c8',
  name: 'Our Legacy Suede Jacket',
  price: '$890',
  image: '/images/blazer.jpg',
  tags: ['suede', 'vintage wash'],
  note: 'best piece you\'ll reach for constantly'
}, {
  id: 'c9',
  name: 'Acne Studios Wide Trousers',
  price: '$480',
  image: '/images/jeans.jpg',
  tags: ['wide leg', 'wool'],
  note: 'wear high-waisted'
}, {
  id: 'c10',
  name: 'Maison Margiela Tabi Derby',
  price: '$1,100',
  image: '/images/tee.jpg',
  tags: ['leather', 'split toe'],
  note: 'the shoe that anchors any look'
}, {
  id: 'c11',
  name: 'Dries Van Noten Scarf',
  price: '$195',
  image: '/images/polo.jpg',
  tags: ['printed silk', 'oversized'],
  note: 'loop casually over the shoulder'
}, {
  id: 'c12',
  name: 'Margaret Howell Knit',
  price: '$345',
  image: '/images/tee.jpg',
  tags: ['merino', 'boxy'],
  note: 'effortless layering piece'
}];

const topRowCards: SectionCardItem[] = allCards.slice(0, 6).map((card, index) => ({
  key: `top-${index + 1}`,
  card
}));
const sectionCardItems: SectionCardItem[] = [...topRowCards];
const desktopClockwiseOrder = topRowCards.map((item) => item.key);
const defaultMotionData: CardMotionData = {
  offsetX: 0,
  offsetY: 0,
  order: 0
};
const boardPreviewItems = [{
  src: '/images/blazer.jpg',
  label: 'Blazer'
}, {
  src: '/images/polo.jpg',
  label: 'Polo'
}, {
  src: '/images/tee.jpg',
  label: 'Tee'
}, {
  src: '/images/jeans.jpg',
  label: 'Jeans'
}];

function ProductCardTile({
  tileKey,
  card,
  motionData,
  animated,
  ready,
  registerCell
}: {
  tileKey: string;
  card: ProductCard;
  motionData: CardMotionData;
  animated: boolean;
  ready: boolean;
  registerCell: (node: HTMLDivElement | null) => void;
}) {
  const isLead = motionData.order === 0;
  const hiddenTranslateX = isLead ? 0 : motionData.offsetX + STACK_NUDGE_X;
  const hiddenTranslateY = isLead ? 0 : motionData.offsetY + STACK_NUDGE_Y;
  const hiddenScale = isLead ? 1 : STACK_SCALE;
  const hiddenRotate = isLead ? 0 : STACK_ROTATE;
  const transform = !ready ? 'translate(0px, 0px) scale(1) rotate(0deg)' : animated ? 'translate(0px, 0px) scale(1) rotate(0deg)' : `translate(${hiddenTranslateX}px, ${hiddenTranslateY}px) scale(${hiddenScale}) rotate(${hiddenRotate}deg)`;
  const opacity = !ready ? isLead ? 1 : 0 : animated || isLead ? 1 : 0;
  const delay = isLead ? 0 : (motionData.order - 1) * CARD_STAGGER_MS;
  return <div ref={registerCell} data-card-key={tileKey} className="relative h-full">
      <article className="flex h-full w-full flex-row bg-white will-change-transform" style={{
      boxShadow: '0 10px 30px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
      border: '1px solid rgba(0,0,0,0.08)',
      fontFamily: "'ABC Diatype', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      transformOrigin: 'left center',
      zIndex: sectionCardItems.length - motionData.order,
      transform,
      opacity,
      transition: ready ? [`transform ${CARD_FAN_DURATION_MS}ms ${CARD_FAN_EASE} ${delay}ms`, `opacity ${CARD_FADE_DURATION_MS}ms ${CARD_FADE_EASE} ${delay}ms`].join(', ') : 'none'
    }}>
        <div className="w-[48%] flex-shrink-0 p-2">
          <div className="h-full w-full overflow-hidden bg-[#ece9e2]">
            <img src={card.image} alt={card.name} className="block h-full w-full object-cover object-top" />
          </div>
        </div>
        <div className="flex w-[52%] flex-col px-3 py-3">
          <div className="flex justify-end">
            <span className="text-[7px] uppercase tracking-[0.18em]" style={{ color: 'rgba(0,0,0,0.38)' }}>
              Spring Edit 2026
            </span>
          </div>
          <h3 className="mt-2.5 leading-tight text-[#111]" style={{
            fontFamily: 'ABC Diatype Medium',
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '-0.01em'
          }}>
            {card.name}
          </h3>
          <div className="my-2 h-px" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />
          <p className="text-[#111]" style={{
            fontFamily: 'ABC Diatype Medium',
            fontWeight: 500,
            fontSize: '12px'
          }}>
            {card.price}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-1.5 py-0.5 text-[7px] uppercase leading-none"
                style={{
                  color: 'rgba(0,0,0,0.65)',
                  border: '1px solid rgba(0,0,0,0.2)',
                  letterSpacing: '0.1em'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-3">
            <p className="mb-1.5 text-[7px] uppercase tracking-[0.18em]" style={{ color: 'rgba(0,0,0,0.38)' }}>
              Stylist Notes
            </p>
            <div className="mb-1.5 h-px" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }} />
            <p className="text-[9px] leading-[1.55]" style={{ color: 'rgba(0,0,0,0.62)' }}>
              {card.note}
            </p>
          </div>
        </div>
      </article>
    </div>;
}

// @component: BookLandingPage
export const BookLandingPage = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const thirdRef = React.useRef<HTMLElement>(null);
  const heroTriggerRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const [motionDataByKey, setMotionDataByKey] = React.useState<Record<string, CardMotionData>>({});
  const [cardsReady, setCardsReady] = React.useState(false);
  const [cardsAnimated, setCardsAnimated] = React.useState(false);
  const [hasPassedHero, setHasPassedHero] = React.useState(false);
  const [thirdInView, setThirdInView] = React.useState(false);

  const measureCards = React.useCallback(() => {
    const sequence = window.innerWidth >= 768 ? desktopClockwiseOrder : sectionCardItems.map(item => item.key);
    const orderByKey = new Map(sequence.map((key, index) => [key, index]));
    const rectsByKey = sectionCardItems.reduce<Record<string, DOMRect>>((acc, item) => {
      const cell = cardRefs.current[item.key];
      if (cell) acc[item.key] = cell.getBoundingClientRect();
      return acc;
    }, {});
    if (Object.keys(rectsByKey).length !== sectionCardItems.length) return;
    setMotionDataByKey(sequence.reduce<Record<string, CardMotionData>>((acc, key, index) => {
      const currentRect = rectsByKey[key];
      const previousRect = index === 0 ? currentRect : rectsByKey[sequence[index - 1]];
      acc[key] = {
        offsetX: previousRect.left - currentRect.left,
        offsetY: previousRect.top - currentRect.top,
        order: orderByKey.get(key) ?? index
      };
      return acc;
    }, {}));
    setCardsReady(true);
  }, []);
  React.useLayoutEffect(() => {
    measureCards();
    const resizeObserver = new ResizeObserver(() => {
      measureCards();
    });
    if (sectionRef.current) resizeObserver.observe(sectionRef.current);
    window.addEventListener('resize', measureCards);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureCards);
    };
  }, [measureCards]);
  React.useEffect(() => {
    if (hasPassedHero) return;
    const checkTrigger = () => {
      const marker = heroTriggerRef.current;
      if (!marker) return;
      const threshold = window.innerHeight * 0.22;
      if (marker.getBoundingClientRect().top <= threshold) {
        setHasPassedHero(true);
      }
    };
    checkTrigger();
    window.addEventListener('scroll', checkTrigger, { passive: true });
    window.addEventListener('resize', checkTrigger);
    return () => {
      window.removeEventListener('scroll', checkTrigger);
      window.removeEventListener('resize', checkTrigger);
    };
  }, [hasPassedHero]);
  React.useEffect(() => {
    if (!hasPassedHero || !cardsReady) return;
    const timeoutId = window.setTimeout(() => {
      setCardsAnimated(true);
    }, 80);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [hasPassedHero, cardsReady]);
  React.useEffect(() => {
    const section = thirdRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setThirdInView(true);
        observer.disconnect();
      }
    }, {
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.2
    });
    observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, []);
  return <>
      <main className="mt-8 w-full px-5 select-none">
        {['The', 'workspace', 'for stylists'].map((line, i) => <div key={line} className="overflow-hidden">
            <motion.div custom={i} initial="hidden" animate="visible" variants={titleVariants} style={{
          fontSize: 'clamp(80px, 13.5vw, 220px)',
          lineHeight: 1.0,
          fontFamily: 'ABC Diatype Bold',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          color: '#1a1a1a'
        }}>
              {line}
            </motion.div>
          </div>)}
      </main>
      <div ref={heroTriggerRef} aria-hidden="true" className="h-px w-full" />
      <section ref={sectionRef} className="mt-10 w-full px-5 pb-20 pt-24 md:mt-14 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[980px]">
          <motion.div initial={{
            opacity: 0,
            y: 16
          }} animate={hasPassedHero ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 16
          }} transition={{
            delay: 0.1,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }} className="mb-10 md:mb-14">
            <p className="mb-4 text-[11px] uppercase tracking-[0.14em] text-[#999]">
              Save anything with a single click
            </p>
            <h2 className="text-[#1a1a1a]" style={{
              fontFamily: 'ABC Diatype Medium',
              fontWeight: 500,
              fontSize: 'clamp(32px, 2.6vw, 42px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05
            }}>
              Bring references, notes,<br />and client decisions into one place.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {topRowCards.map(item => <ProductCardTile key={item.key} tileKey={item.key} card={item.card} motionData={motionDataByKey[item.key] ?? defaultMotionData} animated={cardsAnimated} ready={cardsReady} registerCell={node => {
            cardRefs.current[item.key] = node;
          }} />)}
          </div>
        </div>
      </section>
      <section ref={thirdRef} className="w-full px-5 pb-40 pt-20 md:px-10">
        <div className="mx-auto max-w-[980px]">
          <div className="flex flex-col items-start gap-12 md:flex-row md:items-start md:gap-24">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={thirdInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }} transition={{
            delay: 0.15,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }} className="w-full shrink-0 md:max-w-[360px]">
              <div className="w-full text-[#1a1a1a]" style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
            }}>
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#aaa]">BOARD 003</span>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#aaa]">CORY E.</span>
                </div>
                <div className="mb-5 h-px bg-[#1a1a1a]" />
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-bold tracking-[-0.01em] text-[#1a1a1a]">Spring Edit</span>
                  <span className="text-[9px] uppercase tracking-[0.12em] text-[#aaa]">18 ITEMS</span>
                </div>
                <p className="mb-5 text-[10px] tracking-[0.01em] text-[#aaa]">Last updated 2h ago</p>
                <div className="flex gap-2">
                  {boardPreviewItems.map(item => <div key={item.label} className="flex flex-1 flex-col gap-1.5">
                      <div className="aspect-[3/4] overflow-hidden bg-[#f4f4f4]">
                        <img src={item.src} alt={item.label} className="h-full w-full object-cover" />
                      </div>
                      <span className="text-[8px] uppercase tracking-[0.12em] text-[#bbb]">
                        {item.label}
                      </span>
                    </div>)}
                </div>
                <div className="mb-3 mt-5 h-px bg-[#e8e8e8]" />
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.14em] text-[#aaa]">9 COMMENTS</span>
                  <span className="inline-flex items-center gap-[5px] text-[9px] uppercase tracking-[0.12em] text-[#1a1a1a]">
                    <span className="inline-block h-[5px] w-[5px] rounded-full bg-[#5ec940]" />
                    Active
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 24
          }} animate={thirdInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 24
          }} transition={{
            delay: 0.22,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1]
          }} className="flex max-w-[520px] flex-1 flex-col gap-8 pt-1 text-left">
              <h2 className="text-[#1a1a1a]" style={{
              fontFamily: 'ABC Diatype Medium',
              fontWeight: 500,
              fontSize: 'clamp(32px, 2.6vw, 42px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1
            }}>
                Curate.
                <br />
                Annotate.
                <br />
                Communicate.
              </h2>
              <p className="text-[15px] leading-relaxed text-[#1a1a1a]">
                Etto brings references, client context, notes, and decisions into one place.
              </p>
              <p className="text-[15px] leading-relaxed text-[#1a1a1a]">
                Never lose track of what clients love
                <br />
                or what they don't.
              </p>
              <p className="text-[15px] leading-relaxed text-[#1a1a1a]">
                Spend more time styling and creative directing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>;
};
