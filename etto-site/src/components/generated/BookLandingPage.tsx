import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
const CARD_FAN_DURATION_MS = 600;
const CARD_FADE_DURATION_MS = 200;
const CARD_STAGGER_MS = 340;
const CARD_FAN_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
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
const STACK_NUDGE_X = 0;
const STACK_NUDGE_Y = 0;
const STACK_SCALE = 1;
const STACK_ROTATE = 0;
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
  registerCell,
  isMobile
}: {
  tileKey: string;
  card: ProductCard;
  motionData: CardMotionData;
  animated: boolean;
  ready: boolean;
  registerCell: (node: HTMLDivElement | null) => void;
  isMobile: boolean;
}) {
  const scrollRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start 0.95', 'start 0.5']
  });
  const mobileY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const mobileOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const isLead = motionData.order === 0;
  const hiddenTranslateX = isLead ? 0 : motionData.offsetX + STACK_NUDGE_X;
  const hiddenTranslateY = isLead ? 0 : motionData.offsetY + STACK_NUDGE_Y;
  const hiddenScale = isLead ? 1 : STACK_SCALE;
  const hiddenRotate = isLead ? 0 : STACK_ROTATE;
  const transform = !ready ? 'translate(0px, 0px) scale(1) rotate(0deg)' : animated ? 'translate(0px, 0px) scale(1) rotate(0deg)' : `translate(${hiddenTranslateX}px, ${hiddenTranslateY}px) scale(${hiddenScale}) rotate(${hiddenRotate}deg)`;
  const opacity = !ready ? isLead ? 1 : 0 : animated || isLead ? 1 : 0;
  const delay = isLead ? 0 : (motionData.order - 1) * CARD_STAGGER_MS;

  const baseStyle = {
    boxShadow: '0 10px 30px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
    fontFamily: "'ABC Diatype', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    zIndex: sectionCardItems.length - motionData.order
  };
  const articleStyle = isMobile
    ? { ...baseStyle, y: mobileY, opacity: mobileOpacity }
    : {
        ...baseStyle,
        transformOrigin: 'left center',
        transform,
        opacity,
        transition: ready ? [`transform ${CARD_FAN_DURATION_MS}ms ${CARD_FAN_EASE} ${delay}ms`, `opacity ${CARD_FADE_DURATION_MS}ms ${CARD_FADE_EASE} ${delay}ms`].join(', ') : 'none'
      };

  return <div ref={registerCell} data-card-key={tileKey} className="relative h-full">
      <motion.article ref={scrollRef} className="flex h-full w-full flex-row bg-white will-change-transform" style={articleStyle}>
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
      </motion.article>
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
  const [dropStarted, setDropStarted] = React.useState(false);
  const [purchasedVisible, setPurchasedVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [heroTitleSettled, setHeroTitleSettled] = React.useState(false);

  React.useEffect(() => {
    if (!thirdInView) return;
    const dropT = window.setTimeout(() => setDropStarted(true), 400);
    const purchT = window.setTimeout(() => setPurchasedVisible(true), 2700);
    return () => {
      window.clearTimeout(dropT);
      window.clearTimeout(purchT);
    };
  }, [thirdInView]);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const visibleCards = React.useMemo(
    () => (isMobile ? topRowCards.filter((item) => item.card.id !== 'c4') : topRowCards),
    [isMobile]
  );

  const measureCards = React.useCallback(() => {
    if (window.innerWidth < 768) return;
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
  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setHeroTitleSettled(true);
    }, 1450);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const openWaitlist = React.useCallback(() => {
    window.dispatchEvent(new Event('etto:open-waitlist'));
  }, []);

  return <>
      <main className="flex min-h-[calc(100vh-240px)] w-full flex-col justify-end px-5 pb-16 select-none md:min-h-[calc(100vh-80px)] md:justify-end md:pb-16 md:pt-6">
        {['The', 'workspace', 'for stylists'].map((line, i) => <div key={line} className={heroTitleSettled ? 'overflow-visible' : 'overflow-hidden'}>
            <motion.div custom={i} initial="hidden" animate="visible" variants={titleVariants} className="leading-[1.1] text-white md:leading-none" style={{
          fontSize: 'clamp(62px, 12.5vw, 200px)',
          fontFamily: 'ABC Diatype Bold',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          textShadow: '0 7px 14px rgba(0, 0, 0, 0.26), 0 2px 4px rgba(0, 0, 0, 0.14)'
        }}>
              {line}
            </motion.div>
          </div>)}
        <div className="mt-5 overflow-hidden md:mt-7 md:-translate-y-6">
          <motion.button
            type="button"
            onClick={openWaitlist}
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            custom={3}
            className="inline-flex items-center gap-2 text-white transition-opacity hover:opacity-65"
            style={{
              fontFamily: 'ABC Diatype Medium',
              fontWeight: 500,
              fontSize: 'clamp(24px, 2vw, 30px)',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.28)'
            }}
          >
            <span>JOIN WAITLIST</span>
            <svg width="24" height="24" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M4 18L18 4M18 4H8M18 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </main>
      <div ref={heroTriggerRef} aria-hidden="true" className="h-px w-full" />
      <section ref={sectionRef} className="mt-10 w-full px-5 pb-20 pt-16 md:mt-14 md:px-10 md:pb-40 md:pt-28">
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
              Bring references, products, and notes<br />into one place.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {visibleCards.map(item => <ProductCardTile key={item.key} tileKey={item.key} card={item.card} motionData={motionDataByKey[item.key] ?? defaultMotionData} animated={cardsAnimated} ready={cardsReady} isMobile={isMobile} registerCell={node => {
            cardRefs.current[item.key] = node;
          }} />)}
          </div>
        </div>
      </section>
      <section ref={thirdRef} className="w-full px-5 pb-40 pt-20 md:px-10 md:pt-40">
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
                  {boardPreviewItems.map((item, i) => <div key={item.src} className="flex flex-1 flex-col gap-1.5">
                      <div className="aspect-[3/4] overflow-hidden bg-[#f4f4f4]">
                        <motion.img
                          src={item.src}
                          alt={item.alt}
                          className="h-full w-full object-cover object-top"
                          initial={{ y: -600, opacity: 0 }}
                          animate={dropStarted ? { y: 0, opacity: 1 } : { y: -600, opacity: 0 }}
                          transition={{
                            duration: 1.3,
                            delay: i * 0.22,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        />
                      </div>
                      {item.purchased ? (
                        <motion.span
                          className="inline-flex items-center gap-[3px] text-[8px] uppercase tracking-[0.12em] text-[#3a7a1a]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: purchasedVisible ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: i * 0.12 }}
                        >
                          <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M2.5 6.5L5 9L9.5 3.5" stroke="#3a7a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Purchased
                        </motion.span>
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
            delay: 1.95,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1]
          }} className="flex max-w-[520px] flex-1 flex-col gap-5 pt-1 text-left">
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
                Hold client taste and styling decisions in one place.
              </p>
              <p className="text-[15px] leading-relaxed text-[#1a1a1a]">
                Never lose track of what clients love
                <br />
                or what they don't.
              </p>
              <p className="text-[15px] leading-relaxed text-[#1a1a1a]">
                Spend more time creative directing.
              </p>
              <button
                type="button"
                onClick={openWaitlist}
                className="mt-2 inline-flex items-center gap-2 text-[#1a1a1a] transition-opacity hover:opacity-65"
                style={{
                  fontFamily: 'ABC Diatype Medium',
                  fontWeight: 500,
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  letterSpacing: '-0.02em'
                }}
              >
                <span>JOIN WAITLIST</span>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M4 18L18 4M18 4H8M18 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </>;
};
