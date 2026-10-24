export const commerceSources=[
  {
    "id": "storage",
    "title": "Microsoft Azure Architecture Center: storage and data in multitenant solutions",
    "url": "https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/approaches/storage-data"
  },
  {
    "id": "silo",
    "title": "AWS SaaS Tenant Isolation Strategies: silo isolation",
    "url": "https://docs.aws.amazon.com/whitepapers/latest/saas-tenant-isolation-strategies/silo-isolation.html"
  },
  {
    "id": "pool",
    "title": "AWS SaaS Tenant Isolation Strategies: pool isolation",
    "url": "https://docs.aws.amazon.com/whitepapers/latest/saas-tenant-isolation-strategies/pool-isolation.html"
  },
  {
    "id": "rls",
    "title": "PostgreSQL documentation: row security policies",
    "url": "https://www.postgresql.org/docs/current/ddl-rowsecurity.html"
  },
  {
    "id": "coupons",
    "title": "Stripe API reference: the Coupon object",
    "url": "https://docs.stripe.com/api/coupons/object"
  },
  {
    "id": "transactions",
    "title": "Ruby on Rails API: Active Record transactions",
    "url": "https://api.rubyonrails.org/classes/ActiveRecord/Transactions/ClassMethods.html"
  },
  {
    "id": "locks",
    "title": "PostgreSQL documentation: explicit locking",
    "url": "https://www.postgresql.org/docs/current/explicit-locking.html"
  },
  {
    "id": "retries",
    "title": "Stripe API reference: idempotent requests",
    "url": "https://docs.stripe.com/api/idempotent_requests"
  },
  {
    "id": "neighbors",
    "title": "Microsoft Azure Architecture Center: noisy neighbor antipattern",
    "url": "https://learn.microsoft.com/en-us/azure/architecture/antipatterns/noisy-neighbor/noisy-neighbor"
  }
];
export const commerceEssay={
  "title": "Shared software, distinct businesses",
  "subtitle": "Inside a multi-tenant platform connecting branded stores, representative-led selling, recurring orders and the rules behind checkout.",
  "sections": [
    {
      "id": "commerce-context",
      "title": "One platform, many commercial contexts",
      "paragraphs": [
        {
          "text": "I worked on a multi-tenant commerce platform for brands selling through online storefronts and representative networks. A platform of this kind brings together decisions that customers experience as a single purchase. A product has a price, a basket has a total, and a promotion may change what the customer pays. When the same software serves several businesses, those familiar actions take on another dimension: every decision also belongs to a particular commercial context. A discount that is valid for one merchant cannot quietly become valid for another. The platform has to preserve that distinction while retaining the advantages of shared software."
        },
        {
          "text": "My work on this team-built platform was backend engineering in Ruby on Rails, using PostgreSQL and APIs. I contributed to subscriptions, payments, product and variant inventory with country-specific management, and user management/CRM. I also owned a rule-based coupon feature covering eligibility, validation, discount calculation and checkout integration. That feature provides a practical starting point for examining multi-tenancy: a small interaction at the checkout can depend on boundaries and rules that extend through the application."
        },
        {
          "text": "I see multi-tenant commerce as shared software with a precise understanding of whose business each operation serves. Reusing an application is valuable only if its behaviour remains trustworthy for each tenant. A coupon illustrates this relationship particularly well, because it combines commercial policy, financial calculation and a customer-visible result."
        }
      ]
    },
    {
      "id": "commerce-contribution",
      "title": "My contribution across the commerce lifecycle",
      "paragraphs": [
        {
          "text": "I contributed to several connected areas of the platform: subscriptions, payments, inventory management and user management/CRM. My inventory work included products, product variants and country-specific management. Within the same team delivery, I owned the rule-based coupon feature, covering eligibility, validation, discount calculation and checkout integration. This combination represents both breadth across the platform and focused responsibility for a complete business feature."
        },
        {
          "text": "Subscriptions and payments are central to the continuing commercial relationship between a business and its customers. Contributing to both gave my work a broader setting than a single purchase interaction. A subscription represents an ongoing arrangement, while payment behaviour connects that arrangement with a financial transaction. I contributed within the team responsible for these wider commerce workflows."
        },
        {
          "text": "In inventory management, I worked across the product, its variants and the countries in which it was managed. These are related levels of a commerce system rather than interchangeable labels. A product describes the offering, a variant identifies a particular version, and the country context adds a market-specific dimension. My contribution included work across these areas."
        },
        {
          "text": "I also contributed to user management and CRM. That work places customer and user records alongside the platform’s commercial workflows, where a purchase or subscription belongs to an ongoing relationship. Together, these contributions show experience working across the business domains of an established commerce product. The platform remained a team delivery; my coupon ownership is the more specific feature-level responsibility within that broader contribution."
        }
      ]
    },
    {
      "id": "commerce-product",
      "title": "The product behind the architecture",
      "paragraphs": [
        {
          "text": "The platform supports businesses that sell through both their own online stores and networks of representatives. It brings branded storefronts, product variants, bundles, subscriptions and a single-page checkout into a connected commerce service. Representatives can share a personalised route into the brand’s store, allowing the purchase journey to retain the relationship that introduced the customer. The result is a platform spanning direct purchases and person-led selling."
        },
        {
          "text": "Its current storefront tools include visual page editing and developer-editable themes. Product offers can combine one-time purchases, subscription pricing, bundles and discounts. Customer subscription controls include pausing, skipping and rescheduling deliveries. These capabilities make the buying experience configurable without reducing every business to an identical offer. My contributions spanned subscriptions, payments, inventory management and CRM, alongside coupon behaviour and checkout integration."
        },
        {
          "text": "I think about this platform as a connected commerce system. A purchase links a brand’s catalogue, the customer’s buying choice and the person who introduced the sale. The engineering challenge is to preserve those relationships through checkout, recurring orders and business administration."
        }
      ]
    },
    {
      "id": "commerce-relationships",
      "title": "The relationship continues beyond the order",
      "paragraphs": [
        {
          "text": "Representatives use product and content sharing, personalised links, contacts, orders, messaging and activity feeds. Representatives can see customer engagement and follow-up opportunities, while portal views can vary by role and market. Sales attribution connects visits and purchases to the representative relationship. These features explain why the product needs to understand more than a transaction total: it also needs to retain who introduced the customer and how the relationship develops."
        },
        {
          "text": "Recurring commerce adds another lifecycle. The payment tools handle renewal processing, classification of failed payments, retries where appropriate and customer self-service for updating payment details or resolving a missed order. Operational views help teams distinguish collected renewals from failures needing attention. The platform therefore supports work after the first successful checkout, when retaining an existing customer can depend on a clear recovery experience."
        },
        {
          "text": "I contributed to subscriptions, payments and user management/CRM as part of this connected product. Working across those areas meant thinking beyond the initial order to the continuing relationship between a business and its customers."
        }
      ]
    },
    {
      "id": "commerce-markets",
      "title": "Different markets within a connected operating model",
      "paragraphs": [
        {
          "text": "The platform supports country-specific catalogue availability, price books, languages, currencies, tax presentation, payment options and warehouse assignments. It also supports market-specific agreements at checkout. A business can adapt its commercial presentation for different countries while retaining a connected catalogue and administration experience."
        },
        {
          "text": "The platform also has integration tools for connecting external systems through APIs, webhooks and callbacks. Those extension points allow commerce events and selected decisions to interact with other business software. In a platform of this kind, integration is part of the product’s usefulness: a store rarely exists independently of the systems responsible for fulfilment, customer relationships and business administration."
        },
        {
          "text": "The platform has since added AI-assisted page creation and operational analysis. My work on it covered the commerce backend: subscriptions, payments, inventory, CRM and coupons."
        },
        {
          "text": "Taken together, these capabilities give the architectural discussion a practical setting. The system must accommodate different businesses and different markets, while the individual buyer still expects a comprehensible purchase. My inventory-management contribution included products, variants and country-specific management. Alongside subscriptions, payments and CRM, this work connected me with the platform’s broader commerce responsibilities. Coupon ownership added a focused area of responsibility: deciding whether an offer applied, calculating its effect and connecting that decision to checkout."
        }
      ]
    },
    {
      "id": "commerce-isolation",
      "title": "Sharing an application without sharing authority",
      "paragraphs": [
        {
          "text": "A tenant is the organisational boundary within which a service operates for a customer business. How much infrastructure tenants share is a separate architectural choice. AWS describes siloed environments with dedicated resources and pooled environments with shared resources. Dedicated environments offer a clearer infrastructure boundary but add operational overhead; pooled environments support a unified operating model while requiring careful isolation within shared services.",
          "sources": [
            "silo",
            "pool"
          ]
        },
        {
          "text": "Data architecture introduces further choices: shared stores, separate databases and combinations between those approaches. Microsoft’s guidance frames the decision around isolation, cost, scale and operational requirements, including backup, restoration and schema changes. There is no universally correct database layout. A design that simplifies deployment can make a single tenant’s recovery harder, while separate stores introduce coordination work of their own.",
          "sources": [
            "storage"
          ]
        },
        {
          "text": "For an illustrative commerce example, imagine two merchants both advertising a code called WELCOME. The visible text is the same, but the intended offer belongs to a different business in each case. Resolving the code without its merchant context would leave an essential part of its meaning unspecified. The same reasoning applies to customers, baskets and administrative actions: an identifier becomes useful only within the authority that is allowed to act on it."
        }
      ]
    },
    {
      "id": "commerce-data",
      "title": "Tenant context is part of the meaning of data",
      "paragraphs": [
        {
          "text": "When I reason about a shared platform, I ask what makes a record belong to a business. It is not enough for a page to display the correct merchant name. A request that reaches a backend service must operate on records within the authorised context. An application can be visually convincing while still making a wrong decision about ownership. For that reason, tenant isolation has to be considered wherever data is read or changed."
        },
        {
          "text": "PostgreSQL offers row-level security, which can restrict the rows available for reads and modifications. Once enabled, a table with no applicable policy uses a default-deny rule. However, table owners normally bypass policies, as do superusers and roles with BYPASSRLS; this makes the application’s database role part of the security design. I would consider row-level security as an additional isolation layer when the application and database roles are designed for it.",
          "sources": [
            "rls"
          ]
        },
        {
          "text": "In a design review, I would carry the same ownership question into background work and cached results. A queued operation still needs enough trusted context to act for the correct business. A cached promotion result should not be reusable in another business’s checkout simply because the visible code matches. These are extensions of the WELCOME example: context must survive the movement of work through the system."
        }
      ]
    },
    {
      "id": "commerce-rules",
      "title": "A coupon is a business decision before it is arithmetic",
      "paragraphs": [
        {
          "text": "The customer’s action is simple: enter a code and ask for a discount. The application’s task is more precise. It must establish whether the offer belongs in this transaction, determine whether its conditions are satisfied and calculate the resulting adjustment. I owned those responsibilities and their connection to checkout. The significance of the work lies in keeping them consistent as parts of one feature."
        },
        {
          "text": "Promotion APIs show why “coupon” covers more than a single percentage. Stripe’s Coupon object, for example, describes percentage and fixed-amount discounts, currency, a redemption deadline and a maximum redemption count. These fields illustrate the kinds of business meaning that promotion software can represent.",
          "sources": [
            "coupons"
          ]
        },
        {
          "text": "Consider a hypothetical offer of ten per cent off an eligible subtotal of 120 dollars. The arithmetic produces a 12-dollar discount, but that answer is useful only after the eligible subtotal has been defined. If only part of the basket qualifies, applying the same percentage to the whole basket changes the business promise. The important requirement is therefore a shared definition of the amount being discounted, followed by an explicit calculation and an understandable checkout result."
        },
        {
          "text": "That distinction also shapes how I would discuss requirements with a product team. “Support discount codes” leaves room for several incompatible interpretations. Questions about eligibility, the calculation base, failure messages and the point at which a discount becomes final help turn a broad request into behaviour that can be reviewed. Clear rules make the software easier to explain to customers and easier for a team to change."
        }
      ]
    },
    {
      "id": "commerce-checkout",
      "title": "Checkout is where separate decisions must agree",
      "paragraphs": [
        {
          "text": "A promotion is not complete when a service can return a number. Its result must become part of the purchase the customer is actually making. If a basket changes after an initial eligibility check, the previously calculated discount may no longer describe the transaction. As a general design principle, the final checkout decision should be based on authoritative current inputs rather than trusting a value supplied by the browser."
        },
        {
          "text": "Database transactions help when several writes must succeed together. Rails documents Active Record transactions as atomic groups of SQL statements, and notes that they operate on a single database connection. That boundary matters: wrapping local writes in a transaction does not automatically make an external payment request atomic with the database. Integration design must account for the possibility that one system succeeds while another is still uncertain.",
          "sources": [
            "transactions"
          ]
        },
        {
          "text": "For a hypothetical promotion flow, recording an order and recording the associated redemption should leave a coherent account of what happened. The exact arrangement depends on the business rules and payment flow. The architectural question is whether a failure can create contradictory records or leave the customer with a total that the system cannot explain."
        }
      ]
    },
    {
      "id": "commerce-concurrency",
      "title": "Time, concurrency and the meaning of “once”",
      "paragraphs": [
        {
          "text": "Rules become more demanding when requests overlap. Suppose a hypothetical promotion has one redemption remaining and two customers reach the final step at nearly the same time. Both requests might read the same available count before either records its use. Checking a condition and changing the state are separate actions unless the implementation deliberately coordinates them. A rule that works in a single request can therefore fail under concurrency."
        },
        {
          "text": "PostgreSQL documents row-level locks such as SELECT FOR UPDATE, which can block competing writers or lockers until a transaction ends. Locking is one possible tool for coordinating access to contested state. It also carries tradeoffs: transactions can wait, and inconsistent lock acquisition can lead to deadlocks. Choosing an approach requires understanding which records contend and how failures will be handled.",
          "sources": [
            "locks"
          ]
        },
        {
          "text": "Repeated requests raise a related but distinct problem. A customer may submit again after a timeout because the first result is unknown. Stripe’s idempotency documentation illustrates a public API technique for retrying an operation without accidentally performing it twice: repeated requests use the same key to identify the operation. This does not replace concurrency control over a shared redemption limit; it addresses repeated attempts at the same operation.",
          "sources": [
            "retries"
          ]
        },
        {
          "text": "The distinction is useful because “once” can refer to different things. Once per request attempt, once per order and once across the remaining allowance are different requirements. A dependable design makes those meanings explicit before selecting a mechanism. Otherwise, a local safeguard can appear to solve a problem while leaving the actual business constraint unprotected."
        }
      ]
    },
    {
      "id": "commerce-operations",
      "title": "A shared platform also shares operational pressure",
      "paragraphs": [
        {
          "text": "Isolation includes the experience of using the service, not just access to its records. Microsoft describes the noisy neighbor problem: one tenant’s demand can degrade another tenant’s performance when they compete for shared resources. Its guidance includes monitoring tenant-level usage, governing resource consumption and separating or scheduling expensive work. This makes performance fairness part of operating a multi-tenant product.",
          "sources": [
            "neighbors"
          ]
        },
        {
          "text": "In an illustrative commerce service, a large administrative report and a small checkout request may compete for capacity despite serving very different purposes. The report can often tolerate delay; the customer waiting to purchase has a different expectation. That suggests a useful design question: which work needs an immediate response, and which work can be limited, deferred or separated? The answer should follow the product’s needs rather than a preference for architectural complexity."
        },
        {
          "text": "Observability should help a team understand those differences. A platform-wide average can conceal the fact that one business is experiencing slow checkout while others are unaffected. Tenant-aware operational measurements can make investigation more precise, provided access to those measurements and their contents is controlled."
        }
      ]
    },
    {
      "id": "commerce-verification",
      "title": "Testing the promise, not only the successful path",
      "paragraphs": [
        {
          "text": "I would test this kind of feature by following the business promise through the application. A valid promotion should produce the intended adjustment; an invalid one should leave an understandable result. Boundary cases deserve deliberate attention: an expiry instant, an empty eligible subtotal, a changed basket or two businesses using the same visible code. These cases reveal whether the rules are explicit enough to survive conditions beyond a straightforward demonstration."
        },
        {
          "text": "I would also distinguish tests of calculation from tests of isolation and state changes. A percentage calculation can be correct while it is applied to the wrong tenant’s basket. A redemption check can be correct in isolation while overlapping requests exceed a shared limit. An API response can look successful while the stored order tells a different story. Each test should address a particular promise rather than assume one successful response proves the entire feature."
        },
        {
          "text": "My experience includes contributions to subscriptions, payments, product and variant inventory across countries, and user management/CRM, together with ownership of coupon eligibility, validation, discount calculation and checkout integration within the wider team’s delivery."
        }
      ]
    },
    {
      "id": "commerce-reflection",
      "title": "What the feature says about backend engineering",
      "paragraphs": [
        {
          "text": "The value of this work is the connection between a business requirement and the behaviour of a working product. I contributed within an existing commercial platform, contributing across subscriptions, payments, inventory management and CRM, and owning a coupon feature with several linked responsibilities. That is a different scope from owning the whole platform, but it is substantial: the feature needed to make sense as business logic and as part of a customer-facing transaction."
        },
        {
          "text": "The research provides a broader vocabulary for understanding that responsibility. Isolation asks whose rules apply. Calculation asks what those rules mean numerically. Transactions and concurrency ask whether the meaning survives competing work and partial failure. Operations ask whether it remains usable when businesses share resources. Together, these questions explain why multi-tenant commerce is an engineering problem that reaches beyond assembling screens and endpoints."
        },
        {
          "text": "For me, the enduring lesson is to follow a decision all the way to its consequence. A discount is a promise made visible in a total. Building the backend behaviour behind that promise means understanding its context, expressing it consistently and integrating it with the rest of the purchase. That is the practical experience this project brings to my work on APIs, relational data and business applications."
        }
      ]
    }
  ]
};
