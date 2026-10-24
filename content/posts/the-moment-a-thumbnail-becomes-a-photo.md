---
title: The moment a thumbnail becomes a photo
date: 2026-10-24
description: What building SSPhotoViewer taught me about the small transitions that make an interface feel natural.
tags: SwiftUI, iOS, Open source, Interaction design
draft: false
---

I started building SSPhotoViewer because I wanted a photo viewer I would enjoy using in my own SwiftUI apps. I wanted the richness and responsiveness I liked in Photos: familiar gestures, a convincing fullscreen transition, and a return journey that felt connected to the image I originally tapped.

The interesting work started in the space between those features.

A thumbnail can be perfectly visible while the full image is still loading. A photograph can have a different aspect ratio from its square preview. A grid can move while the viewer is open. Each detail is small on its own, but together they decide whether opening a photo feels natural or slightly broken.

## Animation needs something ready to animate

My first principle became simple: keep the existing visual until its replacement can take over.

For an opening transition, I think about three surfaces:

1. The thumbnail in the original screen.
2. A preview that moves between the thumbnail and fullscreen geometry.
3. The fullscreen media page.

The thumbnail remains visible while the preview prepares. Once the preview can render at the source frame, it takes ownership of the image. The fullscreen page then replaces it when the media is ready at matching geometry.

**The animation is only one part of the transition. Readiness decides whether the transition has anything coherent to connect.**

A beautifully timed movement still looks wrong if it begins with an empty rectangle.

## Identity matters more than position

An image can appear in a grid, a conversation and a fullscreen sequence. Its array index can be different in every place.

I connect those representations through a stable media ID. The viewer can use that identity to find the selected item and its registered source, even when the screen and the viewer use different collections.

A small conceptual example captures the distinction:

```swift
// Keep identity stable when a media URL changes.
let selectedMediaID = "photo-42"

// A grid position describes this particular layout.
let gridIndex = 7
```

The URL can change when an authorised resource is refreshed. The grid position can change when a layout changes. Neither should silently turn the selected photograph into a different item.

## The return journey deserves equal attention

Dismissal has its own set of questions. Where is the source now? Is its cell still mounted? Has the user zoomed or dragged the image away from its original fullscreen position?

I capture the current interactive geometry and start the return from there. When the original source is still available, I use its latest reported frame rather than assuming it stayed where it was when presentation began.

Lazy layouts also make missing sources a normal case. If a cell is no longer mounted, the viewer needs an explicit fallback. Trying to animate toward a rectangle that no longer represents a visible source does not make the experience more convincing.

## A reusable component needs boundaries

I keep image acquisition and cache policy in the host application. That application already understands authentication, signed URLs, image resolution and its own repository. The viewer receives an image loader and concentrates on presentation and interaction.

This boundary makes the package easier to fit into different products. It also makes the responsibility clearer when something is slow: preparing the media and presenting the media are connected, but they are different jobs.

The same thinking applies to gestures. Paging, panning a zoomed image and dragging to dismiss cannot all own the same movement at once. The viewer has to decide which interaction is active and when another one can take over.

## What I keep coming back to

Building this library has made me pay closer attention to continuity. Does the picture stay visible? Does it remain attached to the gesture? Does it return to a meaningful place?

Those are practical engineering questions, expressed through the interface. Answering them has involved state, geometry, cancellation and API design as much as animation curves.

That is the kind of work I enjoy: making the implementation careful enough that using the result feels straightforward.

[Explore SSPhotoViewer and the technical walkthrough →](/work/ssphotoviewer/)
