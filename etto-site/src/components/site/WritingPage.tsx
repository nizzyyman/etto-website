import { writingArticle } from '../../content/writingArticle';

export function WritingPage() {
  return (
    <main className="w-full px-5 pb-20 pt-4 md:px-10 md:pb-24">
      <div className="mx-auto w-full max-w-[760px]">
        <article>
          <header className="mb-11">
            <h1
              className="mb-4 text-[#1a1a1a]"
              style={{
                fontFamily: 'ABC Diatype Medium',
                fontWeight: 500,
                fontSize: 'clamp(28px, 4vw, 38px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em'
              }}
            >
              {writingArticle.title}
            </h1>
            <p className="mb-8 max-w-[680px] text-[16px] leading-[1.55] text-[#71717a]">
              {writingArticle.deck}
            </p>
            <div className="h-px w-full bg-[#18181b]" />
          </header>

          <div className="space-y-4 text-[16px] leading-[1.62] text-[#18181b]">
            {writingArticle.paragraphs.slice(0, 3).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <img
              className="my-11 block w-full bg-[#f4f4f5]"
              src={writingArticle.image.src}
              alt={writingArticle.image.alt}
            />

            {writingArticle.paragraphs.slice(3, 5).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <blockquote className="my-16 border-y border-[#d4d4d8] px-4 py-10 text-center italic text-[#3f3f46]">
              <p className="m-0 leading-[1.65]">{writingArticle.quote.text}</p>
              <cite className="mt-4 block not-italic text-[15px] leading-[1.5] text-[#71717a]">
                {writingArticle.quote.source} <em>{writingArticle.quote.sourceTitle}</em>
              </cite>
            </blockquote>

            {writingArticle.paragraphs.slice(5).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
