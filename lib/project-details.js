import {ssphotoviewerEssay} from './ssphotoviewer-essay';
import {kutuliEssay} from './kutuli-essay';
import {ridesharingEssay} from './ridesharing-essay';
import {newsEssay} from './news-essay';
import {commerceEssay} from './commerce-essay';
export const details={
 "ridesharing-driver":{essay:ridesharingEssay},
  "clinical-workflows": {
    "context": [
      "I helped build the back-office platform for a children’s virtual dental-care service. Families start with an online assessment, submitting photographs and background information for a clinician to review. The service connects that first evaluation with a personalised care plan and continuing support.",
      "The care journey includes app-based instructions, virtual check-ins, progress tracking and photo or video submissions. My work focused on the operational platform behind that experience, alongside improvements to the website."
    ],
    "workflow": [
      "A parent completes an assessment and submits information about their child. The clinician reviews the case and communicates the next steps. Families continue to submit progress reports and photographs, with care coordinators supporting them alongside the assigned clinician.",
      "I worked on the back office supporting patient-related administration. I translated operational requirements into application behaviour, helping the team connect the information arriving from families with the work needed to support their care."
    ],
    "contribution": [
      "As team lead, I helped architect and deliver the platform, planned sprints, broke requirements into implementation tasks and reviewed code. I coordinated engineering delivery while contributing to the application itself.",
      "I also improved the website’s SEO and raised its Lighthouse score from 20 to 70+. That work connected the service’s web presence with the operational platform: helping families find the service while supporting the team delivering it."
    ],
    "engineering": [
      "I worked across web applications, backend behaviour, relational data and API integration. I focused on making the requirements clear enough to implement, review and deliver as a team.",
      "This project brought together technical leadership, application delivery and website improvement. I learned to keep the operational needs of a care team in view while also improving the quality of the website customers encounter first."
    ]
  },
  "commerce-platform": {
    essay:commerceEssay,
    "context": [
      "I contributed to a multi-tenant commerce platform serving brands through online storefronts and representative networks. My work covered subscriptions, payments, inventory management and user management/CRM.",
      "I owned the coupon feature, including eligibility, validation, discount calculation and checkout integration. That gave me a focused area of responsibility within the team’s wider platform delivery."
    ],
    "workflow": [
      "The platform connects storefronts, recurring purchases, payments and customer records. My inventory work included products, variants and country-specific management.",
      "I connected the coupon rules with checkout so that eligibility, validation and calculation formed one coherent feature."
    ],
    "contribution": [
      "I worked as a Ruby on Rails developer using PostgreSQL and APIs. I contributed across several commerce domains and owned the coupon feature through its business behaviour and checkout integration."
    ],
    "engineering": [
      "I learned to follow a business decision through its effect on the customer. A promotion needs clear rules and a consistent result at checkout, while the wider platform needs to keep each business’s context distinct."
    ]
  },
  "delivery-mobile": {
    "context": [
      "I worked on an established food-delivery application as an iOS engineer within an agency team. My work included migrating its Objective-C implementation to Swift.",
      "I joined an existing product with behaviour customers already knew. I needed to understand that behaviour while changing the code that supported it."
    ],
    "workflow": [
      "Customers use the mobile app to access a food-delivery service. I worked on the native iOS application and its language migration.",
      "I approached the migration by reading the existing implementation and carrying its product behaviour into Swift. Working within an established app required attention to how its screens and interactions fit together."
    ],
    "contribution": [
      "I contributed to native iOS development and the migration from Objective-C to Swift as part of the delivery team.",
      "The work strengthened my ability to improve a functioning application while retaining the context of the existing product."
    ],
    "engineering": [
      "I worked with Swift, Objective-C and UIKit. Moving between the two languages meant understanding the existing code rather than treating the migration as a fresh application.",
      "I bring that experience to other established products: learning how they work, identifying what needs to change and improving their technical foundation."
    ]
  },
  "retail-mobile": {
    "context": [
      "I developed and maintained parts of an iOS shopping application for a retail business as part of an agency team.",
      "The app connected customers with the retailer’s shopping service. I worked within the existing product and its ongoing development needs."
    ],
    "workflow": [
      "Customers used the app as a native mobile interface to the retail service. I worked on the iOS experience within the wider team delivery.",
      "I needed to understand how the application was organised before changing it, and consider each interaction as part of the whole product."
    ],
    "contribution": [
      "I contributed to the development and maintenance of the iOS application.",
      "Working on an existing shopping product gave me practical experience with ongoing commercial application development."
    ],
    "engineering": [
      "My work focused on native iOS development and application maintenance.",
      "This experience complements my backend and web work: I have worked on customer-facing software from the mobile side as well as the service side."
    ]
  },
  "news-aggregation": {
    essay:newsEssay,
    "context": [
      "I built K hudai chha to organise reporting from multiple publishers into developing stories. I created its mobile and web interfaces, backend services and deployment."
    ],
    "workflow": [
      "I collect feeds, extract article text and use embeddings, entities and event anchors to group reports and link follow-ups. I generate story summaries while retaining individual source reports."
    ],
    "contribution": [
      "I own the product and built across the application, data model and processing pipeline."
    ],
    "engineering": [
      "I used React Native and Expo for mobile, Next.js for the web application, TypeScript and Hono for the backend, and PostgreSQL with pgvector for data and semantic retrieval."
    ]
  },
  "kutuli": {
    essay:kutuliEssay,
    "context": [
      "I built Kutuli as an independent communication application, bringing mobile and web interfaces together with backend services, real-time interactions and subscriptions.",
      "I coordinated the product and engineering work across those parts of the application."
    ],
    "workflow": [
      "I connected the communication experience with real-time services and a shared backend. Subscription functionality supports the product alongside its core interactions.",
      "I needed the interface, service behaviour and subscription tooling to fit into a coherent application."
    ],
    "contribution": [
      "I developed the application and coordinated its backend and subscription integrations.",
      "Building the product gave me responsibility for how its visible features and supporting services worked together."
    ],
    "engineering": [
      "I used React Native, Next.js and Supabase, with RevenueCat for subscription-related functionality.",
      "I learned to move between application development and service integration as the product required, keeping each integration connected to the experience I wanted to deliver."
    ]
  },
  "tempora": {
    "context": [
      "I built Tempora for information I need briefly but do not want to keep in my everyday contacts or photo library. A short-term contact should still be recognisable when they call, without becoming another permanent entry in the address book.",
      "I had the same problem with temporary photos: semester exam notes, a classroom whiteboard, a parking-space reference or a screenshot needed for a short task. I wanted to keep those useful images separate from the photos I actually want to keep."
    ],
    "workflow": [
      "I built around two uses: keeping short-term contacts available for caller identification, and organising temporary images outside the collection of lasting memories. I used React Native alongside native iOS extension APIs.",
      "I used Call Directory APIs for caller-identification integration and Share Extension for bringing content into the app from other iOS experiences. These features needed native integration alongside the cross-platform interface."
    ],
    "contribution": [
      "I developed the application and its native iOS integrations.",
      "The project gave me a practical reason to move between React Native and platform-specific engineering."
    ],
    "engineering": [
      "I used React Native for the application and native iOS extensions for system integration.",
      "I choose the implementation approach around the feature: a shared framework for the application, with native code where the operating system requires it."
    ]
  },
  "commitments": {
    "context": [
      "I built IfI / Commitments as an independent social-accountability product, connecting user commitments with supporting application workflows.",
      "I worked across the mobile interface, backend services and deployment."
    ],
    "workflow": [
      "The app organises interactions around commitments and the workflows that support them. I connected the mobile experience with the backend services needed to carry out those actions.",
      "I approached the product as a set of connected behaviours rather than a collection of isolated screens."
    ],
    "contribution": [
      "I created the product across its mobile application, backend and deployment.",
      "I translated the concept into application behaviour and connected the components needed to support it."
    ],
    "engineering": [
      "I used React Native, Node.js, Supabase and Vercel.",
      "The project strengthened my ability to move between mobile and backend work while keeping the user’s workflow at the centre of the implementation."
    ]
  },
  "ssphotoviewer": {
    essay:ssphotoviewerEssay,
    "context": [
      "I created and maintain SSPhotoViewer, an MIT-licensed SwiftUI photo and video viewer. It supports fullscreen presentation, paging, zoom, interactive dismissal, source-aware transitions and video playback.",
      "I designed it for applications that already have their own media sources and image-loading strategy. The host app owns that data flow; the package handles the viewing interaction."
    ],
    "workflow": [
      "An application connects its media through a protocol-based adapter. I use that boundary to support fullscreen transitions, paging, zoom, playback and dismissal back to the appropriate source.",
      "I also added asynchronous pagination and a bounded visible-page window so the viewer can work within the host application’s data flow and rendering budget."
    ],
    "contribution": [
      "I created and maintain the package, including its interaction design, adapter API, documentation and regression coverage.",
      "I focused on making the integration boundary clear: what the viewer handles, what the host application handles and how the two communicate."
    ],
    "engineering": [
      "I built the viewer with Swift and SwiftUI, using AVFoundation for media playback and Swift Package Manager for distribution. I maintain regression coverage with XCTest.",
      "Designing a reusable package pushed me to think beyond a single screen. I needed an API that other applications could integrate without handing over their whole interface or image-loading architecture."
    ]
  }
};
