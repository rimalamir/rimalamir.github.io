export const newsEssay={
  "title": "From scattered headlines to a developing story",
  "subtitle": "How I built K hudai chha: extracting articles, connecting coverage and following a story as it changes.",
  "referenceId": "news-references",
  "sources": [
    {
      "id": "ios-store",
      "title": "K hudai chha — public iPhone listing",
      "url": "https://apps.apple.com/us/app/k-hudai-chha/id6757749449"
    },
    {
      "id": "android-store",
      "title": "K hudai chha — Android listing",
      "url": "https://play.google.com/store/apps/details?id=com.mirayush.khc&hl=en_AU"
    }
  ],
  "pipeline": [
    "RSS feeds",
    "Article extraction",
    "Language & entity analysis",
    "Duplicate check",
    "Sequel / story matching",
    "Story summary",
    "Web & mobile reading"
  ],
  "sections": [
    {
      "id": "news-product",
      "title": "A reading product built around stories",
      "paragraphs": [
        {
          "text": "I built K hudai chha to help readers follow a developing event across several publishers. Instead of presenting a stream of repeated headlines, I group related coverage into stories with short summaries, individual source reports and a timeline of developments.",
          "sources": [
            "ios-store"
          ]
        },
        {
          "text": "I built the mobile application, web interface, backend services, data model and deployment. I used Expo and React Native for iOS and Android, Next.js for the web application, and TypeScript with Hono for the backend. Supabase provides the PostgreSQL data layer and pgvector stores the embeddings used for semantic matching."
        },
        {
          "text": "The fundamental distinction in the system is between an article and a story. An article is a publisher’s individual report, with its own URL, text and publication date. A story is a narrative container that can gather several reports and later developments. That distinction determines the database relationships, the matching pipeline and the reading experience."
        }
      ]
    },
    {
      "id": "news-architecture",
      "title": "Separating collection from the reading experience",
      "paragraphs": [
        {
          "text": "I split the backend into services for RSS retrieval, article extraction, language analysis, embeddings, duplicate detection, story assignment and summary generation. I expose the resulting data through Hono API routes, with mobile and web clients sharing the same backend."
        },
        {
          "text": "I wanted both interfaces to work with the same story membership, source counts and summaries. Processing the news centrally keeps publisher-page extraction and model requests out of the mobile rendering path. The clients request organised content; the ingestion pipeline handles the heavier preparation."
        },
        {
          "text": "The code supports ingestion through a command-line entry point as well as an API endpoint. The command-line script runs the core ingestion service and then a fragment-repair step. This is a practical separation for scheduled work: a batch process can finish its collection and maintenance tasks independently of how long a reader’s API request takes."
        }
      ]
    },
    {
      "id": "news-feeds",
      "title": "Collecting feeds while limiting repeated work",
      "paragraphs": [
        {
          "text": "I store the source catalogue in PostgreSQL and fetch RSS with rss-parser and HTTP requests. I save ETag and Last-Modified values and send them on later requests. When a publisher returns 304 Not Modified, I skip that response instead of downloading and processing the same feed body again."
        },
        {
          "text": "The fetcher also checks item URLs against stored articles, drops older feed entries using a two-day window, and normalises RSS fields into a common item format. It contains publisher-specific handling for inconsistent metadata. That reflects the realities of aggregation: feeds vary in their date formats, image fields and amount of supplied content, even when they all describe themselves as RSS."
        },
        {
          "text": "Feeds are fetched in batches of ten. Selection can be sharded by the UTC hour, with separate handling for local and global feeds and special full runs. The ingestion service then processes queued articles through a pool capped at seven workers. I use these limits to control parallel work. They bound simultaneous network and AI work rather than launching every article at once."
        },
        {
          "text": "There is also an aggressive source-specific shortcut: for selected publishers, finding an already stored item causes the entire feed response to be skipped. This reduces repeat processing, but it can omit new items if a response mixes old and new links. It is a concrete efficiency-versus-completeness tradeoff, and different from an ordinary per-item duplicate filter."
        }
      ]
    },
    {
      "id": "news-extraction",
      "title": "Turning publisher pages into usable article records",
      "paragraphs": [
        {
          "text": "I use RSS to discover articles, then fetch each linked page for fuller content. I load the HTML into JSDOM and apply Mozilla Readability to extract the main text. Page requests have a timeout, and extraction failures fall through to the RSS content instead of holding up the whole batch."
        },
        {
          "text": "When page extraction fails, the parser falls back to content supplied in the RSS item, then its content snippet. Articles with fewer than 100 characters of usable content are skipped. This fallback is important because a news pipeline should not treat successful discovery of a URL as successful extraction of an article. The text must be substantial enough to support the next stages."
        },
        {
          "text": "Images are selected through a hierarchy of metadata: Open Graph, Twitter card metadata and then a sufficiently large image candidate from the page. Feed enrichment can supply an image when the page parser does not. Publication dates are searched in page metadata, time elements and JSON-LD, with RSS dates as a fallback when the extracted value is invalid."
        },
        {
          "text": "Time handling matters for both matching and presentation. The parser applies configured publisher timezone offsets when particular date formats lack an offset, and clamps dates more than 30 minutes into the future. These heuristics stop obvious metadata problems from distorting freshness, but they cannot establish a publisher’s true publication time in every case. The original source URL remains part of the article record so the report retains its provenance."
        }
      ]
    },
    {
      "id": "news-language",
      "title": "Analysing different languages without replacing the source",
      "paragraphs": [
        {
          "text": "For non-English feeds, I prepare an English representation for analysis while preserving the original title and content. My translation helper takes up to 5,000 characters and asks for a concise English summary that preserves proper nouns. I use a non-ASCII check as a lightweight trigger, accepting that it is less precise than a dedicated language detector."
        },
        {
          "text": "The original title and content are stored in the article record. The English representation is used for embedding and analysis. This separates source preservation from the working representation used to compare reports. It also introduces a tradeoff: compressing a long article before semantic matching can lose details that distinguish one event from another. Entity and anchor signals partly address that problem, but do not eliminate it."
        },
        {
          "text": "Article analysis requests structured JSON containing sentiment, salient entities, a newsworthiness score, geographic and category metadata, relationships and event anchors. A deterministic pre-filter runs first for obvious noise. Model-assisted newsworthiness rules then decide which articles continue through ingestion. These are editorial heuristics expressed in code and prompts; their scores should not be presented as objective measures of truth or reliability."
        }
      ]
    },
    {
      "id": "news-entities",
      "title": "Extracting the people, places and event details that matter",
      "paragraphs": [
        {
          "text": "I combine entities supplied by publishers with the salient entities returned by article analysis. Reusing that analysis avoids another model request. I normalise names, check stored aliases and upsert entities by normalised name and type, then link them to their articles with salience values."
        },
        {
          "text": "Name normalisation lowercases text, removes selected honorifics and punctuation, and preserves Latin letters, digits and Devanagari characters. It is useful for matching variations, but it is not complete identity resolution across every spelling or language. Entity overlap uses Jaccard similarity: the number of shared normalised names divided by the size of their union."
        },
        {
          "text": "Anchors provide a different signal. The extractor recognises dates in Gregorian and Nepali calendar formats, romanised Nepali dates, amounts, weights, flight or vehicle identifiers and selected legislative or project phrases. The ingestion service combines anchors from original text, translated text and model analysis, then stores them in article metadata. Their purpose is to recover a specific event when broad semantic resemblance is too weak or too ambiguous."
        }
      ]
    },
    {
      "id": "news-duplicates",
      "title": "Duplicates and related coverage are different decisions",
      "paragraphs": [
        {
          "text": "I check article URLs in memory and PostgreSQL, and enforce uniqueness on the articles table. Application checks avoid unnecessary work; the database constraint catches repeat inserts when workers race. I handle PostgreSQL error 23505 as a duplicate rather than a new processing failure."
        },
        {
          "text": "Semantic duplicate detection then searches stored article embeddings within a 48-hour window using a cosine-similarity threshold of 0.95. A sufficiently close candidate causes the incoming article to be skipped. The purpose is to reduce near-identical text even when the URLs differ. This step precedes story assignment, so not every discovered publisher link is retained as a separate item."
        },
        {
          "text": "Clustering asks a broader question: can different reports belong to the same developing event? Two reports can be useful together without being textual duplicates. That is why duplicate rejection and story matching have distinct thresholds and responsibilities. The distinction also exposes a limitation: an overly permissive duplicate filter can discard independent coverage before the story system has a chance to preserve it."
        }
      ]
    },
    {
      "id": "news-embeddings",
      "title": "Semantic retrieval inside the relational database",
      "paragraphs": [
        {
          "text": "I generate 1,536-dimensional embeddings with OpenAI’s text-embedding-3-small model and store them in pgvector. I cap input at 12,000 characters to bound each request. Embeddings use OpenAI directly; chat completion has separate provider-selection and fallback logic."
        },
        {
          "text": "The backend calls PostgreSQL functions through Supabase RPC for similar-article and similar-story searches. SQL computes cosine similarity as one minus cosine distance, applies a cutoff and threshold, orders by vector distance and limits the candidate count. This keeps candidate retrieval close to the stored data rather than transferring every embedding into the application for comparison."
        },
        {
          "text": "I started with IVFFlat indexes and later moved article and story retrieval to HNSW. I also experimented with separate vectors for a story’s beginning and latest developments, then returned to one stored centroid. The root-plus-tip sampling still contributes to that single representation, without maintaining two independent story vectors."
        }
      ]
    },
    {
      "id": "news-sequels",
      "title": "How sequel handling finds a developing narrative",
      "paragraphs": [
        {
          "text": "I check for sequels before assigning an article to a new story. I gather candidates from recent stories over 30 days, a wider semantic search over 365 days, and anchor matches on articles already linked to stories. I use a 0.55 semantic threshold for recent candidates and 0.50 for historical candidates, then deduplicate the set by story ID."
        },
        {
          "text": "Each candidate receives a combined score: 0.6 times vector similarity plus 0.4 times entity overlap. A matching anchor can add 0.15 to effective vector similarity, capped at one. Scores of at least 0.60 are treated as high confidence and linked directly. Lower-scoring candidates can enter model review when the combined score is at least 0.40 or effective semantic similarity is at least 0.50."
        },
        {
          "text": "In the review path, the model is given the existing story’s title and summary, together with the incoming article’s title and content. The relationship prompt asks whether they describe the same specific narrative, and distinguishes initial reporting, reactions, investigation and outcomes. Shared categories such as politics or economy are explicitly insufficient. A proposed bill followed by its passage is a useful example of continuity; two unrelated floods are not made one story by the word “flood”."
        },
        {
          "text": "An accepted sequel is inserted into the story–article relationship with timeline display enabled. The database link role is normalised to an allowed value such as followup, and story metadata is refreshed. This means sequel handling extends an existing narrative container; it does not generate a fictional continuation or simply concatenate headlines. Its automatic high-confidence branch is still heuristic, so a strong similarity score is not proof that the decision is correct."
        }
      ]
    },
    {
      "id": "news-clustering",
      "title": "Assigning an article when sequel detection finds no match",
      "paragraphs": [
        {
          "text": "If the first sequel pass does not link the article, normal clustering searches similar articles in a 48-hour window. I set 0.82 for the high-confidence vector zone and 0.78 for the lower hybrid zone. Entity overlap adds discrimination in the hybrid range, and candidates are ranked using 70 per cent semantic similarity and 30 per cent entity overlap."
        },
        {
          "text": "The ordinary clustering path verifies even high-confidence candidates with the relationship model. Lower-confidence candidates are deduplicated by story ID and evaluated together in one model request. Generic entities such as Nepal, Kathmandu and government are filtered where possible because they otherwise connect unrelated reporting. There is also a domain-specific NEPSE daily-market rule that can reuse a recent matching market story before the general matching logic."
        },
        {
          "text": "A second long-tail search inside clustering looks up to 365 days back, using a 0.70 retrieval threshold and at most eight candidates. Model-confirmed medium- or high-confidence results attach to the existing story. A low-confidence result instead becomes a parent_story_id on a new story, retaining a possible connection without merging the articles into one container. Otherwise, the system creates a new story."
        },
        {
          "text": "I have two matching paths with different acceptance policies. The first sequel pass can accept a high composite score directly, while ordinary clustering verifies high-confidence vector candidates with the relationship model. I would consolidate those policies in a future revision to make acceptance behaviour more consistent."
        }
      ]
    },
    {
      "id": "news-centroid",
      "title": "Remembering a story’s beginning while following its latest update",
      "paragraphs": [
        {
          "text": "I update a story’s semantic representation from up to three newest and three oldest linked articles. After removing repeated IDs, I fetch their embeddings. I chose this root-plus-tip sample so matching retains the event’s original context while following its latest direction."
        },
        {
          "text": "It then calculates the average of those vectors and selects the real article vector nearest that average. The stored centroid is therefore a representative member of the sample rather than a synthetic average vector. I chose this approach to retain a concrete article representation while balancing early context with recent developments. This is the single-centroid implementation after the separate root/tip-vector experiment was rolled back."
        },
        {
          "text": "A bounded sample also limits the amount of full content and vector data fetched for a story that has accumulated many reports. Statistics such as article count and distinct source count use broader metadata, while expensive content processing uses smaller selected sets. That is a deliberate separation between counting the full narrative and choosing enough context to work on it."
        }
      ]
    },
    {
      "id": "news-summary",
      "title": "Generating a current summary without summarising every article",
      "paragraphs": [
        {
          "text": "I use a different sample for summaries: the latest three articles published within 24 hours, falling back to the three most recent when no recent material exists. I want the matching vector to remember the beginning of an event, but the summary to explain what has just changed."
        },
        {
          "text": "The story analyst first classifies the material into a domain, then applies a domain-specific summarisation prompt, then runs a consistency-checking prompt against the supplied source text. The requested output contains a neutral headline, an overview sentence and up to three short bullet points, with a maximum 80-word crux. The prompt labels the newest source and supplies publication dates so relative words such as “today” have context."
        },
        {
          "text": "The consistency pass can replace the generated title and crux if it finds a mismatch with the source context. That is a model-assisted review step, not independent fact-checking against the world and not a guarantee of accuracy. A model can misunderstand extraction noise, omit nuance or repeat the source’s own error. Retaining article attribution remains essential."
        },
        {
          "text": "The ingestion service collects impacted story IDs and summarises them after worker processing, avoiding a fresh summary for every article on the deferred assignment path. There is an exception: the sequel-link helper also triggers metadata and summary generation immediately, so a sequel can be summarised again in the final batch. Batching reduces repeated work, but the current implementation does not make all summary calls unique per story per run."
        }
      ]
    },
    {
      "id": "news-sql",
      "title": "How SQL expresses the relationship between sources and stories",
      "paragraphs": [
        {
          "text": "I model sources, articles, stories and entities separately. Articles reference their publisher; story_articles stores story membership, and article_entities stores extracted entity links. I use composite primary keys on the link tables and a uniqueness constraint on normalised entity name and type. Foreign keys preserve these relationships as records change."
        },
        {
          "text": "This arrangement allows narrative membership to change without rewriting the original publisher record. An article retains its URL, text, date, image and analysis metadata, while a story holds its title, representative vector and derived aggregate information. JSON metadata carries evolving analytical fields such as anchors, but the central relationships remain explicit database links."
        },
        {
          "text": "The SQL functions provide a database-side boundary for vector retrieval. Standard indexes support date, source and entity lookups, while HNSW supports approximate vector candidate search. Parent-story references preserve a weaker narrative relationship between separate story containers. This combination lets the system ask both relational questions—who published this and which story includes it—and semantic questions about related text."
        },
        {
          "text": "The pipeline spans several database requests and external model calls; it is not one atomic transaction. Article insertion may succeed before entity linking or story linking completes. The worker inserts returned story links immediately to reduce the window in which articles can be left unlinked by a timeout, and maintenance scripts address fragmentation. I treat these as recovery measures: the pipeline can still fail between steps, so repairing partial work remains important."
        }
      ]
    },
    {
      "id": "news-reading",
      "title": "Presenting a timeline rather than an undifferentiated feed",
      "paragraphs": [
        {
          "text": "The story API returns linked articles with publisher attribution and update metadata. The initial story-detail response sorts linked articles by publication time and returns the latest ten; further articles are available through pagination. A reader can move from the current summary into the individual reports that support the narrative rather than having the generated summary replace its sources."
        },
        {
          "text": "The main feed applies freshness-based ranking using article publication dates, with decay and an extra penalty for old material. Its principal query requires at least two distinct sources in stored story metadata. Consequently, a stored article or newly created single-source story is not guaranteed immediate placement in the main feed. Collection, narrative construction and display eligibility are separate stages."
        },
        {
          "text": "I use Expo Router for mobile navigation and shared API services for fetching stories. React Query supports server-state handling across the mobile and web clients. I persist bookmarked stories and followed entities with AsyncStorage so readers keep them between app sessions."
        },
        {
          "text": "Novelty detection exists, but the ordinary link helper currently forces accepted articles to remain visible. The novelty score is not being used there to suppress timeline entries. Near-duplicate rejection still happens earlier, but accepted story membership and timeline hiding are distinct decisions."
        }
      ]
    },
    {
      "id": "news-retrieval",
      "title": "Search and retrieval build on the extracted corpus",
      "paragraphs": [
        {
          "text": "I extended the article corpus with chunking and retrieval-augmented chat. I split content around paragraphs, bound chunk sizes and fall back to fixed-size splitting for oversized passages. Each chunk gets its own embedding and keeps a link to the original article, giving retrieval a smaller unit of evidence than a whole story."
        },
        {
          "text": "The retrieval layer can transform a user question into a standalone search query and uses a SQL hybrid-search function to combine semantic retrieval with keyword matching. Results retain article and source information for answer context. A separate operation handles chunk preparation; the core ingestion path does not automatically chunk every newly ingested article. That distinction matters when explaining which data is ready for chat."
        },
        {
          "text": "This extension uses the same extracted corpus for a different task. Clustering asks whether reports belong together; question answering asks which passages help answer a particular question. Treating the two as separate retrieval problems keeps the story model from becoming a substitute for passage-level evidence."
        }
      ]
    },
    {
      "id": "news-operations",
      "title": "Running and maintaining the pipeline",
      "paragraphs": [
        {
          "text": "I track fetched feeds, processed articles, duplicates, sequels, new stories and errors for each ingestion run. Worker-level error handling lets a failing article be recorded without stopping the whole batch. I use timeouts, bounded concurrency, limited candidate sets and batched queries to keep each run manageable."
        },
        {
          "text": "I added GitHub Actions workflows for ingestion and daily reclustering and cleanup. In my current checkout, the ingestion job is disabled. The CLI remains available for running ingestion and fragment repair together."
        },
        {
          "text": "I also built support for advertising, analytics and device-level features. I keep those product concerns separate from the decisions that match articles and generate summaries."
        }
      ]
    },
    {
      "id": "news-reflection",
      "title": "The engineering decision behind the product",
      "paragraphs": [
        {
          "text": "I chose developing narratives as the organising unit while preserving the articles behind them. Extraction makes the text usable, semantic retrieval finds candidates, entities and anchors add specificity, and relationship analysis decides whether reports belong together. I then generate a short summary so readers can catch up and continue into the source reports."
        },
        {
          "text": "Owning the product meant joining these responsibilities across the backend, database and client applications. It also meant dealing with uneven publisher data, model cost, partial failures and the difference between an appealing feature description and the code that actually runs. K hudai chha demonstrates my work across mobile development, web applications, SQL and vector retrieval, third-party AI integration and content-processing pipelines."
        }
      ]
    }
  ]
};
