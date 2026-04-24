import React from 'react';
import { motion } from 'framer-motion';
import greenEllipse from '../../assets/green-ellipse.svg';
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
  brand: string;
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
  name: 'Giorgio Armani Long Sleeve Shirt',
  brand: 'Giorgio Armani',
  price: '$40.00',
  image: '/images/products/armani-long-sleeve.jpg',
  tags: ['navy', 'point collar', 'relaxed fit'],
  note: 'looks like silk but feels like cotton. great with grey or black pants.'
}, {
  id: 'c2',
  name: 'Japanese Denim Ford Standard Jean',
  brand: 'Buck Mason',
  price: '$198',
  image: '/images/products/buck-mason-ford.jpg',
  tags: ['dark indigo', 'button fly', 'straight-leg'],
  note: 'buy these in black and indigo. inseam 30.'
}, {
  id: 'c3',
  name: 'Kartik Research Silk Plaid Print Dress Shirt',
  brand: 'Kartik Research',
  price: '$295.00',
  image: '/images/products/kartik-research.webp',
  tags: ['silk', 'sheer', 'blue/brown plaid'],
  note: "sheer silk for humid summer. loose 52' chest would make it roomy/oversized."
}, {
  id: 'c4',
  name: 'Dolce & Gabbana Linen Dress Shirt',
  brand: 'Dolce & Gabbana',
  price: '$108.00',
  image: '/images/products/dolce-gabbana-linen.jpg',
  tags: ['black linen', 'semi-sheer', 'long sleeve'],
  note: 'longer sleeve on you than the black Ralph Lauren.'
}, {
  id: 'c5',
  name: 'OrSlow 105 Straight-Leg Jeans',
  brand: 'OrSlow',
  price: '$300',
  image: '/images/products/orslow-105.jpg',
  tags: ['washed black', 'straight-leg', 'vintage 501-style'],
  note: "best vintage-inspired 90s Levi's 501 on the market."
}, {
  id: 'c6',
  name: 'Giorgio Armani Short Sleeve Shirt',
  brand: 'Giorgio Armani',
  price: '$135.00',
  image: '/images/products/armani-short-sleeve.jpg',
  tags: ['modal jersey', 'half-placket', 'black'],
  note: "looks like sheer linen but it's modal. older Armani is elite."
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
  src: '/images/products/armani-long-sleeve.jpg',
  alt: 'Giorgio Armani Long Sleeve Shirt',
  purchased: true
}, {
  src: '/images/products/kartik-research.webp',
  alt: 'Kartik Research Silk Plaid Shirt',
  purchased: false
}, {
  src: '/images/products/dolce-gabbana-linen.jpg',
  alt: 'Dolce & Gabbana Linen Dress Shirt',
  purchased: true
}, {
  src: '/images/products/orslow-105.jpg',
  alt: 'OrSlow 105 Straight-Leg Jeans',
  purchased: false
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
            <span className="text-[7px] uppercase tracking-[0.18em] text-[#9e9e9e]">
              {card.brand}
            </span>
          </div>
          <h3 className="mt-2.5 leading-tight text-[#1a1a1a]" style={{
            fontFamily: 'ABC Diatype Medium',
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '-0.01em'
          }}>
            {card.name}
          </h3>
          <div className="my-2 h-px" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />
          <p className="text-[#1a1a1a]" style={{
            fontFamily: 'ABC Diatype Medium',
            fontWeight: 500,
            fontSize: '10px'
          }}>
            {card.price}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-1 text-[7px] lowercase leading-none text-[#6b6b6b]"
                style={{
                  background: 'linear-gradient(180deg, #fafafa 0%, #e4e4e4 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.06)',
                  letterSpacing: '0.02em'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-3">
            <p className="mb-1.5 text-[7px] uppercase tracking-[0.18em] text-[#9e9e9e]">
              Stylist Notes
            </p>
            <div className="mb-1.5 h-px" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }} />
            <p className="text-[9px] leading-[1.55] text-[#1a1a1a]">
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
      <main className="flex min-h-[calc(100vh-240px)] w-full flex-col justify-end px-5 pb-24 select-none md:block md:min-h-[calc(100vh-80px)] md:pb-0 md:pt-8">
        {['The', 'workspace', 'for stylists'].map((line, i) => <div key={line} className="overflow-hidden">
            <motion.div custom={i} initial="hidden" animate="visible" variants={titleVariants} className="text-white md:text-[#1a1a1a]" style={{
          fontSize: 'clamp(68px, 13.5vw, 220px)',
          lineHeight: 1.0,
          fontFamily: 'ABC Diatype Bold',
          fontWeight: 700,
          letterSpacing: '-0.01em'
        }}>
              {line}
            </motion.div>
          </div>)}
      </main>
      <div ref={heroTriggerRef} aria-hidden="true" className="h-px w-full" />
      <section ref={sectionRef} className="mt-10 w-full px-5 pb-20 pt-16 md:mt-14 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-10 md:mb-14">
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
          </div>

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
          }} className="w-full shrink-0 md:max-w-[480px]">
              <div className="w-full text-[#1a1a1a]" style={{
              fontFamily: "'ABC Diatype', 'Helvetica Neue', Helvetica, Arial, sans-serif"
            }}>
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#aaa]">BOARD 003</span>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#aaa]">CORY</span>
                </div>
                <div className="mb-5 h-px bg-[#1a1a1a]" />
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="text-[13px] tracking-[-0.01em] text-[#1a1a1a]" style={{ fontFamily: 'ABC Diatype Medium', fontWeight: 500 }}>Spring Edit</span>
                  <span className="text-[9px] uppercase tracking-[0.12em] text-[#aaa]">18 ITEMS</span>
                </div>
                <p className="mb-5 text-[10px] tracking-[0.01em] text-[#aaa]">Last updated 2h ago</p>
                <div className="flex gap-2">
                  {boardPreviewItems.map(item => <div key={item.src} className="flex flex-1 flex-col gap-1.5">
                      <div className="aspect-[3/4] overflow-hidden bg-[#f4f4f4]">
                        <img src={item.src} alt={item.alt} className="h-full w-full object-cover object-top" />
                      </div>
                      {item.purchased ? (
                        <span className="inline-flex items-center gap-[3px] text-[8px] uppercase tracking-[0.12em] text-[#3a7a1a]">
                          <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M2.5 6.5L5 9L9.5 3.5" stroke="#3a7a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Purchased
                        </span>
                      ) : (
                        <span className="h-[10px]" aria-hidden="true" />
                      )}
                    </div>)}
                </div>
                <div className="mb-3 mt-5 h-px bg-[#e8e8e8]" />
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.14em] text-[#aaa]">9 COMMENTS</span>
                  <span className="inline-flex items-center gap-[5px] text-[9px] uppercase tracking-[0.12em] text-[#1a1a1a]">
                    <img src={greenEllipse} alt="" aria-hidden="true" className="h-[10px] w-[10px]" />
                    Live
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
