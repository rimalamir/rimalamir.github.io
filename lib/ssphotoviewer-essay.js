export const ssphotoviewerEssay={
  "title": "SSPhotoViewer: building the media viewer I wanted to use",
  "subtitle": "My open-source SwiftUI photo and video viewer, from gesture ownership and visual handoffs to app-owned loading and pagination.",
  "sources": [],
  "visual": "media-handoff",
  "sections": [
    {
      "id": "viewer-motivation",
      "title": "Why I built the viewer I wanted to use",
      "paragraphs": [
        {
          "text": "I built SSPhotoViewer because I wanted opening a photo in a SwiftUI app to feel as considered as opening one in Photos. The open-source viewers I had been using often felt visually out of place, made ordinary gestures awkward, or offered an interaction that was too limited for the product around it. I wanted the richness, responsiveness and intuitive behaviour I enjoyed in a native photo viewer, with an integration I could reuse in my own applications."
        },
        {
          "text": "That motivation shaped the project beyond its feature list. Fullscreen display, paging, pinch-to-zoom, video and swipe-to-dismiss are useful individually, but the experience depends on how they work together. A photo should grow from the thumbnail I touched, stay under my finger during an interactive gesture, and return to the right place. Loading should not turn that journey into a black flash or a sudden change in aspect ratio. I designed and implemented the package around those moments."
        },
        {
          "text": "I own this project, including the interaction design, Swift implementation, public adapter, package structure and documentation. My goal is a reusable media-viewing component with a clear integration boundary: the application keeps its data, permissions and media pipeline, while the viewer coordinates presentation and interaction."
        }
      ]
    },
    {
      "id": "viewer-boundary",
      "title": "A public adapter without taking over the application",
      "paragraphs": [
        {
          "text": "I distribute the library through Swift Package Manager, with iOS 17 as the minimum deployment target and Swift tools version 5.10. The exported library product is SSPhotoViewerAdapter. Behind that facade, an internal SSPhotoViewer target contains the presentation, pager and media implementation. This lets me give consumers an application-facing vocabulary while keeping the implementation behind a narrower public boundary."
        },
        {
          "text": "The main asset contract is ImageViewerAsset. An application supplies a stable string ID, an image or video resource, and optional metadata such as aspect ratio, thumbnail URL and accessibility label. The adapter converts that contract into the internal viewer representation. A chat attachment, a gallery photograph and a timeline item can therefore enter the same viewer without making their repository or domain model part of the package."
        },
        {
          "text": "I support image URLs, video URLs with optional posters, and application-configured AVAsset instances. That last option matters when the application needs to configure resource loading itself. I use SwiftUI for the presentation and interaction structure, with UIKit, AVFoundation and AVKit where image decoding or video playback requires those platform capabilities."
        }
      ]
    },
    {
      "id": "viewer-identity",
      "title": "Identity survives changes in layout and media URLs",
      "paragraphs": [
        {
          "text": "I connect selection, source registration and fullscreen media through stable IDs rather than assuming two arrays share an index. A screen may display a filtered grid while the viewer can page through a broader collection. Those are separate projections of the same media, and an integer position is not a reliable connection between them."
        },
        {
          "text": "The same distinction matters when a signed URL expires or a higher-quality rendition replaces an earlier one. I preserve the item identity while allowing its resource value to change. Reconciliation replaces changed values at their existing positions, reports the replacement and appends genuinely new IDs. The affected page can reset interaction state and restart its media work without confusing that update with a different selected photograph."
        },
        {
          "text": "I keep the active-sequence contract explicit. Appending items and replacing existing values are supported while the viewer is presented. Arbitrary removal or reordering requires dismissing and presenting a new sequence. That boundary avoids pretending that every possible collection mutation has the same predictable transition semantics."
        }
      ]
    },
    {
      "id": "viewer-handoff",
      "title": "Opening is a handoff between three visual owners",
      "paragraphs": [
        {
          "text": "The opening transition is not just a scale animation. I coordinate three possible owners of the visible image: the original thumbnail, a moving preview hero, and the fullscreen media page. The essential rule is that an incoming surface must be ready before the previous surface gives up ownership. Otherwise the user sees a hole, a duplicate or an unloaded rectangle covering a perfectly good thumbnail."
        },
        {
          "text": "I register the exact source visual with a SwiftUI preference that reports its global CGRect. During preparation, that source remains mounted and visible. I wait for both a usable preview and enough information to calculate the final media geometry. Once the hero can render at the source frame, it takes over the visual and I hide only the corresponding source ID. Hiding through opacity preserves layout and continued geometry reporting."
        },
        {
          "text": "The fullscreen page loads behind the hero and takes ownership when it can replace the preview at matching geometry. I use a short opening animation of approximately 0.24 seconds, but duration alone is not what makes the transition work. Readiness and ownership determine whether the animation has something coherent to move between. I also keep preparation UI scoped to the selected source and clear it on completion, cancellation or disappearance."
        }
      ]
    },
    {
      "id": "viewer-geometry",
      "title": "Resolving real geometry before committing to motion",
      "paragraphs": [
        {
          "text": "I treat aspect ratio as optional information rather than requiring every API response to supply dimensions. When the caller provides an aspect ratio, I can use it immediately. Otherwise I resolve geometry from the decoded image or from video-track dimensions with the preferred transform applied. The transform matters because encoded dimensions alone can describe a portrait video incorrectly."
        },
        {
          "text": "A thumbnail is not automatically a trustworthy substitute for the original dimensions. A square grid crop can preview a landscape image, and a poster can have different framing from its video. I expose whether the thumbnail preserves the media aspect ratio so that a cropped preview does not silently become an incorrect destination rectangle."
        },
        {
          "text": "This creates a deliberate tradeoff on a cold presentation: I may wait for geometry before starting the opening movement. I prefer keeping the existing thumbnail visible during that preparation to beginning with a guessed square and changing shape halfway through. The visual can be available before its destination is trustworthy; I model those as separate readiness conditions."
        }
      ]
    },
    {
      "id": "viewer-gestures",
      "title": "Deciding which interaction owns the drag",
      "paragraphs": [
        {
          "text": "I built the pager around explicit interaction states, including idle, horizontal paging and vertical dismissal, together with zoom state associated with each media ID. The difficult part is deciding which interaction should receive a gesture. At normal scale, a horizontal drag can move between items. When zoomed, that same movement should pan the image until its content boundary allows a paging handoff."
        },
        {
          "text": "I use MagnifyGesture for pinch interaction and constrain zoom and pan so the media remains controllable. Double-tap zoom and single-tap chrome visibility also need arbitration: I compose the double-tap recogniser exclusively before the single tap so a double tap does not first trigger the single-tap action. These decisions make familiar gestures cooperate instead of competing for the same touch."
        },
        {
          "text": "For dismissal, I use an interactive drag with a threshold and resistance rather than immediately treating every vertical movement as a close request. The implementation uses a 260-point dismissal threshold and retains the actual interactive backdrop opacity when the drag ends. Preserving that state prevents a visible brightness jump between the finger-driven portion and the finishing animation."
        }
      ]
    },
    {
      "id": "viewer-return",
      "title": "Returning to a source that may have moved",
      "paragraphs": [
        {
          "text": "On dismissal, I capture the media’s current interactive frame, including zoom, pan, drag offset, scale and corner radius. A static return hero renders at that geometry before the fullscreen page relinquishes ownership. The return starts from the picture the user is actually looking at, rather than snapping it back to an idealised fullscreen rectangle first."
        },
        {
          "text": "I then resolve the newest available source frame. The home layout may have scrolled, rotated or reflowed while the viewer was open, so its original presentation rectangle is not necessarily the right destination. Keeping the source mounted and reporting geometry lets me return to the live location when it is available."
        },
        {
          "text": "Lazy layouts make the missing-source case unavoidable: an offscreen cell may no longer exist in the view hierarchy. I expose fallback policies instead of inventing a destination. The integration can prefer the registered source, exit beyond the last visible source, or choose a fixed global rectangle. At the end of the return, I restore the real source only after the viewer is removed, preserving a single visible owner throughout the handoff."
        }
      ]
    },
    {
      "id": "viewer-loading",
      "title": "The host owns image acquisition and caching",
      "paragraphs": [
        {
          "text": "I intentionally keep image networking and cache policy outside the viewer. The host supplies an asynchronous image loader and can optionally provide a synchronous memory-cache lookup to seed the initial visual. Authentication, signed URLs, decoding resolution, disk storage, freshness and retry policy belong to the application that understands the media."
        },
        {
          "text": "The synchronous lookup is a fast memory boundary, not a place to perform blocking disk or network work during rendering. A cached image can make presentation immediate; an uncached resource follows the asynchronous preparation path. If no loader is supplied, URL-backed image surfaces stay as placeholders rather than triggering an implicit package-owned request."
        },
        {
          "text": "This separation also avoids installing a second image cache beside an application’s existing pipeline. It does not mean the viewer has no transport-related behaviour at all: URL-backed video playback uses AVFoundation, while an app-configured AVAsset offers another integration route. I keep those responsibilities distinct so consumers can reason about where loading actually happens."
        }
      ]
    },
    {
      "id": "viewer-video",
      "title": "Video state follows the selected page",
      "paragraphs": [
        {
          "text": "I integrate AVPlayer through an AVPlayerViewController bridge and provide a control surface that can fit the surrounding viewer. Videos begin muted, and a player pauses when its page stops being selected. The lifecycle matters as much as the play button: an adjacent or disappearing page should not continue acting like the active media."
        },
        {
          "text": "Asynchronous preparation can finish after selection has changed. I guard player ownership against the latest selected ID so a stale completion cannot take over the controls. I also derive custom-control state from the live playback context rather than maintaining a second independent play or mute Boolean that can disagree with AVPlayer."
        },
        {
          "text": "Posters provide an immediate static visual when available. For posterless media, I can obtain a frame through AVAssetImageGenerator while respecting cancellation. Actual video geometry comes from the track rather than assuming the poster dimensions are authoritative. On disappearance I pause and release the page’s player state so playback does not outlive its presentation."
        }
      ]
    },
    {
      "id": "viewer-pagination",
      "title": "Pagination has to cooperate with the screen behind it",
      "paragraphs": [
        {
          "text": "I support both viewer-driven pagination and eager loading by the host screen. The viewer can request another page as selection approaches the loaded boundary, while the application’s grid may independently discover that it needs more data. Those paths have to converge on a coherent sequence rather than each maintaining an incompatible idea of the next page."
        },
        {
          "text": "I use monotonic page numbers, with the initial collection treated as page zero, and allow only one active viewer page task at a time. Accepted pages append unique IDs. The application can also advance an explicit pagination cursor when it accepts an eager page; that newer cursor cancels an older viewer pull and prevents stale work from moving pagination backwards."
        },
        {
          "text": "I still leave request coalescing or idempotency to the repository because the grid and viewer can reach the same boundary before a state update propagates. The asynchronous loader returns items and hasMore rather than throwing. A temporary failure can keep hasMore true so a later retry remains possible; false means the sequence is exhausted. Custom chrome receives the current loaded items and pagination state rather than an array captured when presentation began."
        }
      ]
    },
    {
      "id": "viewer-performance",
      "title": "Bounding rendering work without hiding the remaining costs",
      "paragraphs": [
        {
          "text": "I keep the fullscreen page window to the current and adjacent pages and use a lazy horizontal thumbnail strip. This bounds the number of full media page views even when the loaded model contains a much larger collection. It does not make decoded-image memory or video buffering free, so the integration still needs appropriate thumbnail sizes, decoding resolution and cache limits."
        },
        {
          "text": "I maintain identity-to-index lookup state and reconcile incoming items incrementally instead of repeatedly rebuilding the entire collection for strip movement. Stable IDs connect selection and geometry; cancellation prevents old loading work from continuing after it has lost a useful owner. Those choices reduce unnecessary work around interaction, where extra updates are most noticeable."
        },
        {
          "text": "Customisation remains part of the performance contract. I expose typed chrome and video-control contexts so applications can add their own controls, actions and strips. Those builders should use the current context and avoid expensive collection transformations on every update. The package can bound its own page rendering, but it cannot compensate for unlimited work inside a consumer’s custom view."
        }
      ]
    },
    {
      "id": "viewer-testing",
      "title": "What I cover, and what still needs interaction testing",
      "paragraphs": [
        {
          "text": "I maintain XCTest coverage for stable media metadata, thumbnail and poster selection, adapter conversion, configuration boundaries, source-readiness defaults and pagination-cursor behaviour. Reconciliation tests check replacement, duplicate removal and deterministic ID mapping. These are useful contracts to protect as the package evolves because small changes can affect multiple integration styles."
        },
        {
          "text": "Those tests do not by themselves prove that an interactive dismissal feels right or that every cold-cache transition is visually continuous. I separate model and API regression coverage from the integration checks a viewer needs on an iOS Simulator or device: moving sources, unknown dimensions, interrupted gestures, changing selection during loading and large collections."
        },
        {
          "text": "The part of this project I care about most is the connection between API design and the experience on screen. A stable identity contract makes the return animation possible. A clear loading boundary makes readiness predictable. Gesture ownership makes zoom and paging work together. I built SSPhotoViewer to bring those decisions into one reusable component, so adding a media viewer does not mean rebuilding that coordination in every application."
        }
      ]
    }
  ]
};
