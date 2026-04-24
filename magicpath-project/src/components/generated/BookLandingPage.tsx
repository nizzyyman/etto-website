import React from 'react';
import { motion } from 'framer-motion';
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
const CARD_FAN_DURATION_MS = 950;
const CARD_FADE_DURATION_MS = 550;
const CARD_STAGGER_MS = 100;
const CARD_FAN_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const CARD_FADE_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const WAITLIST_ENDPOINT = 'https://app.loops.so/api/newsletter-form/cm1toonmr00c2yqwb5530z2a0';
const SITE_URL = 'https://etto.ai';
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

const topRowCards: SectionCardItem[] = allCards.slice(0, 6).map((card, index) => ({
  key: `top-${index + 1}`,
  card
}));
const middleLeftCard: SectionCardItem = {
  key: 'middle-left',
  card: allCards[6]
};
const middleRightCard: SectionCardItem = {
  key: 'middle-right',
  card: allCards[7]
};
const bottomRowCards: SectionCardItem[] = allCards.slice(8, 12).concat(allCards.slice(0, 2)).map((card, index) => ({
  key: `bottom-${index + 1}`,
  card
}));
const sectionCardItems: SectionCardItem[] = [...topRowCards, middleLeftCard, middleRightCard, ...bottomRowCards];
const leadCardKey = topRowCards[0].key;
const desktopClockwiseOrder = [
  topRowCards[0].key,
  topRowCards[1].key,
  topRowCards[2].key,
  topRowCards[3].key,
  topRowCards[4].key,
  topRowCards[5].key,
  middleRightCard.key,
  bottomRowCards[5].key,
  bottomRowCards[4].key,
  bottomRowCards[3].key,
  bottomRowCards[2].key,
  bottomRowCards[1].key,
  bottomRowCards[0].key,
  middleLeftCard.key
];
const defaultMotionData: CardMotionData = {
  offsetX: 0,
  offsetY: 0,
  order: 0
};
const secondaryLinks = [{
  label: 'Writing',
  href: `${SITE_URL}/writing/`
}, {
  label: 'Instagram',
  href: 'https://www.instagram.com/etto_inc/',
  external: true
}, {
  label: 'YouTube',
  href: 'https://www.youtube.com/@etto_inc/videos',
  external: true
}];
const boardPreviewItems = [{
  src: 'https://www.etto.ai/images/blazer.jpg',
  label: 'Blazer'
}, {
  src: 'https://www.etto.ai/images/polo.jpg',
  label: 'Polo'
}, {
  src: 'https://www.etto.ai/images/tee.jpg',
  label: 'Tee'
}, {
  src: 'https://www.etto.ai/images/jeans.jpg',
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
  return <div ref={registerCell} data-card-key={tileKey} className="relative">
      <article className="bg-white border border-[#e8e8e8] rounded-[6px] overflow-hidden will-change-transform" style={{
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      transformOrigin: 'left center',
      zIndex: sectionCardItems.length - motionData.order,
      transform,
      opacity,
      transition: ready ? [`transform ${CARD_FAN_DURATION_MS}ms ${CARD_FAN_EASE} ${delay}ms`, `opacity ${CARD_FADE_DURATION_MS}ms ${CARD_FADE_EASE} ${delay}ms`].join(', ') : 'none'
    }}>
        <div className="w-full aspect-[4/5] overflow-hidden bg-[#f4f4f4]">
          <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
        </div>
        <div className="px-2 pt-2 pb-2">
          <div className="flex items-start justify-between gap-1 mb-1">
            <span className="text-[10px] font-bold text-[#1a1a1a] leading-snug">{card.name}</span>
            <span className="text-[10px] font-medium text-[#1a1a1a] whitespace-nowrap shrink-0 ml-1">{card.price}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-1.5">
            {card.tags.map(tag => <span key={tag} className="inline-block text-[9px] leading-none px-1.5 py-0.5 rounded-full bg-[#eaf6e0] text-[#3a6b1a] font-medium">
                {tag}
              </span>)}
          </div>
          <p className="text-[9px] text-[#8c8c8c] leading-relaxed">
            <strong className="font-bold text-[#555]">stylist note:</strong>
            <span> {card.note}</span>
          </p>
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
  const firstInputRef = React.useRef<HTMLInputElement>(null);
  const lastFocusedElementRef = React.useRef<HTMLElement | null>(null);
  const [motionDataByKey, setMotionDataByKey] = React.useState<Record<string, CardMotionData>>({});
  const [cardsReady, setCardsReady] = React.useState(false);
  const [cardsAnimated, setCardsAnimated] = React.useState(false);
  const [hasPassedHero, setHasPassedHero] = React.useState(false);
  const [thirdInView, setThirdInView] = React.useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false);
  const [waitlistState, setWaitlistState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [waitlistError, setWaitlistError] = React.useState('Oops! Something went wrong, please try again.');
  const [formValues, setFormValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });
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
    if (!isWaitlistOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 0);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsWaitlistOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWaitlistOpen]);
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
  const openWaitlist = React.useCallback(() => {
    lastFocusedElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setWaitlistState('idle');
    setWaitlistError('Oops! Something went wrong, please try again.');
    setIsWaitlistOpen(true);
  }, []);
  const closeWaitlist = React.useCallback(() => {
    setIsWaitlistOpen(false);
    lastFocusedElementRef.current?.focus();
  }, []);
  const handleWaitlistInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = event.target;
    setFormValues(current => ({
      ...current,
      [name]: value
    }));
  }, []);
  const handleWaitlistBack = React.useCallback(() => {
    setWaitlistState('idle');
    setWaitlistError('Oops! Something went wrong, please try again.');
    setFormValues({
      firstName: '',
      lastName: '',
      email: '',
      role: ''
    });
    firstInputRef.current?.focus();
  }, []);
  const handleWaitlistSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const timestamp = Date.now();
    const previousTimestamp = localStorage.getItem('loops-form-timestamp');
    if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
      setWaitlistState('error');
      setWaitlistError('Too many signups, please try again in a little while');
      return;
    }
    localStorage.setItem('loops-form-timestamp', String(timestamp));
    setWaitlistState('loading');
    setWaitlistError('Oops! Something went wrong, please try again.');
    const formBody = new URLSearchParams({
      userGroup: '',
      mailingLists: '',
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      role: formValues.role
    }).toString();
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      if (response.ok) {
        setWaitlistState('success');
        setFormValues({
          firstName: '',
          lastName: '',
          email: '',
          role: ''
        });
        return;
      }
      const data = await response.json().catch(() => ({}));
      setWaitlistState('error');
      setWaitlistError(data.message || response.statusText || 'Oops! Something went wrong, please try again.');
    } catch (error) {
      if (error instanceof Error && error.message === 'Failed to fetch') {
        setWaitlistState('error');
        setWaitlistError('Too many signups, please try again in a little while');
        return;
      }
      localStorage.setItem('loops-form-timestamp', '');
      setWaitlistState('error');
      setWaitlistError(error instanceof Error ? error.message : 'Oops! Something went wrong, please try again.');
    }
  }, [formValues]);
  return <div style={{
    fontFamily: 'ABC Diatype Semi-Mono'
  }} className="min-h-screen w-full bg-white text-[#1a1a1a] overflow-x-hidden">
      {/* Navigation / Header */}
      <header className="w-full px-6 pt-5 pb-4 flex items-start justify-between">
        <motion.a custom={0} initial="hidden" animate="visible" variants={navFade} href={`${SITE_URL}/`} className="text-[13px] font-normal tracking-tight text-[#1a1a1a] leading-tight">ETTO</motion.a>

        <motion.div custom={1} initial="hidden" animate="visible" variants={navFade} className="flex flex-col gap-1" style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '20px'
      }}>
          <span className="text-[14px] font-normal text-[#1a1a1a] leading-snug whitespace-nowrap">Etto Systems Inc.</span>
          <a href={`${SITE_URL}/privacy/`} className="text-[13px] text-[#999] leading-snug whitespace-nowrap hover:opacity-60 transition-opacity">Privacy Policy</a>
          <span className="text-[14px] font-normal text-[#1a1a1a] leading-snug whitespace-nowrap" style={{
          display: "none"
        }}>Volume II &nbsp; Number 2</span>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={navFade} className="flex flex-col gap-1 ml-auto mr-24">
          {secondaryLinks.map((link, index) => <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} className={`text-[13px] text-[#1a1a1a] leading-snug hover:opacity-60 transition-opacity${index > 0 ? ' mt-1' : ''}`}>
              {link.label}
            </a>)}
        </motion.div>

        <motion.button custom={3} initial="hidden" animate="visible" variants={navFade} type="button" onClick={openWaitlist} className="flex items-center gap-1 text-[13px] text-[#1a1a1a] whitespace-nowrap cursor-pointer hover:opacity-60 transition-opacity">
          <span>APPLY</span>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-0.5 mt-[-1px]">
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </header>

      {/* Giant Title */}
      <main className="w-full px-5 mt-8 select-none">
        {['The', 'workspace', 'for stylists', 'and CDs'].map((line, i) => <div key={line} className="overflow-hidden">
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

      {/* Grid Section */}
      <section ref={sectionRef} className="mt-10 w-full px-5 pb-20 pt-24 md:mt-14 md:px-10 md:pt-28">
        <div className="max-w-[1280px] mx-auto">

        {/* ── TOP ROW: 6 cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-2">
          {topRowCards.map(item => <ProductCardTile key={item.key} tileKey={item.key} card={item.card} motionData={motionDataByKey[item.key] ?? defaultMotionData} animated={cardsAnimated} ready={cardsReady} registerCell={node => {
          cardRefs.current[item.key] = node;
        }} />)}
        </div>

        {/* ── MIDDLE ROW: 1 card | 4-col H1 | 1 card ── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-2 items-center">

          {/* Left card */}
          <ProductCardTile tileKey={middleLeftCard.key} card={middleLeftCard.card} motionData={motionDataByKey[middleLeftCard.key] ?? defaultMotionData} animated={cardsAnimated} ready={cardsReady} registerCell={node => {
          cardRefs.current[middleLeftCard.key] = node;
        }} />

          {/* Center text — spans 4 columns */}
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
            delay: 0.2,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }} className="col-span-1 md:col-span-4 flex items-center justify-center py-10 md:px-8 md:py-0 lg:px-10">
            <h2 className="w-full max-w-[700px] text-[#1a1a1a] text-center" style={{
              letterSpacing: '-0.025em',
              fontSize: 'clamp(22px, 2.6vw, 38px)',
              fontFamily: 'ABC Diatype Medium',
              fontWeight: 500,
              lineHeight: '1.14',
              margin: '0 auto'
            }}>
              <span>Etto brings references, shopping lists, client context, notes, and decisions into one place.</span>
            </h2>
          </motion.div>

          {/* Right card */}
          <ProductCardTile tileKey={middleRightCard.key} card={middleRightCard.card} motionData={motionDataByKey[middleRightCard.key] ?? defaultMotionData} animated={cardsAnimated} ready={cardsReady} registerCell={node => {
          cardRefs.current[middleRightCard.key] = node;
        }} />

        </div>

        {/* ── BOTTOM ROW: 6 cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {bottomRowCards.map(item => <ProductCardTile key={item.key} tileKey={item.key} card={item.card} motionData={motionDataByKey[item.key] ?? defaultMotionData} animated={cardsAnimated} ready={cardsReady} registerCell={node => {
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
              fontSize: 'clamp(22px, 2.6vw, 38px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05
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
      <footer className="w-full px-6 pt-5 pb-6 flex items-start justify-between" style={{
      position: 'relative'
    }}>
        <div className="text-[13px] font-normal tracking-tight text-[#1a1a1a] leading-tight" style={{
        display: 'none'
      }}>ETTO</div>
        <div className="flex flex-col gap-1" style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '20px',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        translate: '-615.96px 0px'
      }}>
          <span className="text-[14px] font-normal text-[#999999] leading-snug whitespace-nowrap">&copy; 2026 Etto Systems Inc.</span>
          <a href={`${SITE_URL}/privacy/`} className="text-[13px] text-[#1a1a1a] leading-snug whitespace-nowrap hover:opacity-60 transition-opacity">
            Privacy Policy
          </a>
        </div>
        <div className="flex flex-col gap-1 ml-auto mr-24">
          {secondaryLinks.map((link, index) => <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} className={`text-[13px] text-[#1a1a1a] leading-snug hover:opacity-60 transition-opacity${index > 0 ? ' mt-1' : ''}`}>
              {link.label}
            </a>)}
        </div>
        <button type="button" onClick={openWaitlist} className="flex items-center gap-1 text-[13px] text-[#1a1a1a] whitespace-nowrap cursor-pointer hover:opacity-60 transition-opacity">
          <span>APPLY</span>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-0.5 mt-[-1px]">
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </footer>
      {isWaitlistOpen ? <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
          <button type="button" aria-label="Close waitlist form" onClick={closeWaitlist} className="absolute inset-0 bg-black/25 backdrop-blur-[6px]" />
          <div role="dialog" aria-modal="true" aria-labelledby="waitlist-title" className="relative w-full max-w-[420px] rounded-[10px] bg-white px-[34px] pb-[34px] pt-[34px] shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
            <button type="button" aria-label="Close waitlist form" onClick={closeWaitlist} className="absolute right-[14px] top-[14px] text-[18px] leading-none text-[#18181b] hover:opacity-60 transition-opacity">
              &times;
            </button>
            {waitlistState !== 'success' ? <>
                <h2 id="waitlist-title" className="mb-4 px-14 text-center text-[22px] leading-[1.15] text-[#18181b]" style={{
                fontFamily: 'ABC Diatype Medium',
                fontWeight: 500
              }}>
                  Join Waitlist
                </h2>
                <p className="mx-auto mb-[18px] mt-[-4px] max-w-[320px] text-center text-[14px] leading-[1.5] text-[#52525b]">
                  we're currently piloting with stylists, interior designers, and creative directors.
                </p>
              </> : null}
            {waitlistState === 'success' ? <div className="pt-4 text-center text-[14px] leading-[1.55] text-[#18181b]">
                Thank you for your interest in Etto. We'll be in touch.
              </div> : <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-[10px]">
                <input ref={firstInputRef} className="w-full rounded-full border border-[#d4d4d8] px-[14px] py-[11px] text-[14px] text-[#18181b] shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#a1a1aa]" placeholder="First name" required type="text" name="firstName" value={formValues.firstName} onChange={handleWaitlistInputChange} />
                <input className="w-full rounded-full border border-[#d4d4d8] px-[14px] py-[11px] text-[14px] text-[#18181b] shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#a1a1aa]" placeholder="Last name (optional)" type="text" name="lastName" value={formValues.lastName} onChange={handleWaitlistInputChange} />
                <input className="w-full rounded-full border border-[#d4d4d8] px-[14px] py-[11px] text-[14px] text-[#18181b] shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#a1a1aa]" placeholder="you@example.com" required type="email" name="email" value={formValues.email} onChange={handleWaitlistInputChange} />
                <input className="w-full rounded-full border border-[#d4d4d8] px-[14px] py-[11px] text-[14px] text-[#18181b] shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#a1a1aa]" placeholder="What role best describes you?" type="text" name="role" value={formValues.role} onChange={handleWaitlistInputChange} />
                {waitlistState === 'error' ? <p className="mt-1 text-[14px] leading-[1.55] text-[#b91c1c]">
                    {waitlistError}
                  </p> : null}
                <button type="submit" disabled={waitlistState === 'loading'} className="mt-1 flex min-h-[42px] w-full items-center justify-center rounded-full bg-[#18181b] px-[18px] py-[10px] text-[14px] text-white disabled:cursor-default disabled:opacity-80">
                  {waitlistState === 'loading' ? 'Please wait...' : 'Join waitlist'}
                </button>
              </form>}
            {(waitlistState === 'success' || waitlistState === 'error') ? <button type="button" onClick={handleWaitlistBack} className="mt-[10px] text-[14px] text-[#71717a] hover:opacity-60 transition-opacity">
                &larr; Back
              </button> : null}
          </div>
        </div> : null}
    </div>;
};
