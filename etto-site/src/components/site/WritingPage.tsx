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
              What is the purpose of intelligence without taste?
            </h1>
            <p className="mb-8 max-w-[680px] text-[16px] leading-[1.55] text-[#71717a]">
              For the machine, elite taste is compression with orientation. And intelligence is brittle without it.
            </p>
            <div className="h-px w-full bg-[#18181b]" />
          </header>

          <div className="space-y-4 text-[16px] leading-[1.62] text-[#18181b]">
            <p>Enough has been written about what taste is. My aim here is to understand what taste means for the machine.</p>

            <p>
              Taste is a form of intelligence for navigating high-dimensional, semantically open domains. In other words,
              the hardest kind of taste is hard because a lot of things are at play at once, there isn't one right answer,
              and what works shifts with context, person, moment, and stance. Styling is one of those domains. So is
              interior design. So is a lot of creative work where the product is judgement itself.
            </p>

            <p>
              At Etto, we are building tools for stylists, interior designers, and other creatives whose work lives in
              these kinds of domains. The following observations assess the gap between applied taste and how AI
              currently understands it. A diagnosis in service to how to think about building products and benchmarks for
              high-dimensional, semantically open creative work.
            </p>

            <img
              className="my-11 block w-full bg-[#f4f4f5]"
              src="/images/semantic-openness.png"
              alt="Matrix comparing semantic openness and dimensionality."
            />

            <p>
              Taste is compression. Elite taste is compression with orientation. Orientation meaning: not "what do people
              like," but "what should be liked." A stance, per se. A who. Taste rewards compression. Even more so, taste
              rewards compression with orientation. But the who is rarely a person alone, it's a person situated. Ye is
              a creative genius in dialogue with himself whose work lands despite being controversial. Nadia Lee Cohen is
              cool because she renders character studies as high-resolution cinematic work that is so recognizable within
              a scene. Law Roach is a master stylist whose work lands because every look is addressed to his client
              situated in a specific scene, in a specific press cycle, all while maintaining their persona.
            </p>

            <p>
              Elite taste is a judgment made legible by the scene it's addressed to. Compression with orientation, then,
              means holding both the specific person and the conversation that person is in.
            </p>

            <blockquote className="my-16 border-y border-[#d4d4d8] px-4 py-10 text-center italic text-[#3f3f46]">
              <p className="m-0 leading-[1.65]">
                “What mattered was not to give in to sensation but precisely to master it. The whole problem of taste in
                the eighteenth century consisted in finding an effective answer to the calls which fancy made on men, and
                the problem was not resolved empirically, but in terms of certain values inseparable from a concept of
                man and of civilization. The man of taste was an aristocrat in spirit...and the judgment of taste was
                aristocratic rather than democratic, for it was not founded upon the likes or dislikes of a majority.”
              </p>
              <cite className="mt-4 block not-italic text-[15px] leading-[1.5] text-[#71717a]">
                From Rémy G. Saisselin's <em>Reflections on the Origins of Aesthetics</em>
              </cite>
            </blockquote>

            <p>
              A talented artist friend of mine was given new work by an existing client, and the entire brief was "just
              make it cool." "Just make it cool" is a compressed brief. Compression is a high form of intelligence. The
              person on the other side of that query has to internalize a large amount of context without being told it.
              A non-compressed version of the brief would spell out the palette, the references, the audience, the
              constraints, the mood, the directions. That is precisely what the brief is outsourcing. They trusted her
              to figure out what "cool" meant here and to make the right choices without needing everything decompressed
              in advance. This is what "taste" does. It absorbs ambiguity and collapses it into judgment.
            </p>

            <p>
              Search, on the other hand, does almost the opposite. You give it a query, and it expands the space into
              options. Taste, instead, compresses. It takes a lot of context and returns an opinionated judgment without
              showing the work. Search and recommendation interfaces start to strain when the query is personal,
              high-stakes, and high-intent all at once. "What style suits me," "does this painting belong in my
              collection," "which pieces from this collection actually belong in my closet." These are compression
              queries. The answer depends on who's asking, and a list of aggregate options across many users isn't the
              same as a judgment call made for one person in one scene.
            </p>

            <p>
              One rough ML analogue is the difference between explicit reasoning and dense latent representation
              (embeddings). Taste often depends less on solving a fully specified problem step by step than on holding a
              large amount of context in compressed form before making a judgment. Reasoning works best when the problem
              is explicit and bounded. Taste is harder because the criteria are not fully specified in advance; they are
              partly implicit, partly social, partly historical, and partly downstream of who is judging.
            </p>

            <p>
              A key breakthrough in modern AI was the generation of contextual embeddings. In pre-transformer NLP,
              "bank" had the same embedding whether it was in the sentence "the river bank" or "the Bank of America." An
              important feature of transformers is that the embeddings they produce are contextual, so "bank" gets a
              different embedding in not just "the river bank" and "the Bank of America," but also "the river bank was
              crowded" and "the river bank was serene."
            </p>

            <p>
              You can trace modern AI as a progression of learning to hold context. First, the meaning of a word depends
              only on the word itself. Then, on the sentence around it. Then, on the specific user asking. Personalized
              reward models push this idea further, as they are addressing another kind of context: a "good" thing for
              an LLM to say depends not only on the situation, but on the individual user in that specific situation.
              Taste needs the model to hold a person the way a stylist might: built up slowly, situated in a scene, and
              carried across time.
            </p>

            <p>
              All this also explains why evaluation breaks so quickly. In semantically open spaces, the issue is not just
              whether an output meets constraints, but whether it expresses the right stance. Whether it feels alive.
              Whether it is coherent for a particular person or scene. Whether the user accepts the answer as great.
            </p>

            <p>Perhaps progress here will look like products that can reliably learn orientation, hold latent context, earn trust, and choose.</p>
          </div>
        </article>
      </div>
    </main>
  );
}
