export const ridesharingEssay={
 title:'Finding nearby riders with a hexagonal grid',
 subtitle:'My work on a driver-side iOS app, and the geometry behind a smaller, faster search.',
 referenceId:'ride-references',visual:'hex-search',
 sources:[
 {id:'origin',title:'Uber Engineering: H3’s design and origins',url:'https://www.uber.com/blog/h3/'},
 {id:'hexagons',title:'H3: aggregation and hexagonal neighbourhoods',url:'https://h3geo.org/docs/highlights/aggregation/'},
 {id:'sphere',title:'H3: the global grid and its 12 pentagons',url:'https://h3geo.org/docs/core-library/overview/'},
 {id:'coordinates',title:'H3: coordinate systems',url:'https://h3geo.org/docs/core-library/coordsystems/'},
 {id:'conversion',title:'H3: coordinate-to-cell conversion algorithm',url:'https://h3geo.org/docs/core-library/latLngToCellDesc/'},
 {id:'bits',title:'H3: the 64-bit cell-index layout',url:'https://h3geo.org/docs/library/index/cell/'},
 {id:'hierarchy',title:'H3: logical hierarchy and approximate geographic containment',url:'https://h3geo.org/docs/highlights/indexing/'},
 {id:'traversal',title:'H3: neighbouring cells and grid traversal',url:'https://h3geo.org/docs/api/traversal/'},
 {id:'c-api',title:'H3: C indexing API',url:'https://h3geo.org/docs/api/indexing/'},
 {id:'bindings',title:'H3: creating language bindings',url:'https://h3geo.org/docs/core-library/creating-bindings/'},
 {id:'swift',title:'Swift Package Manager: exposing C headers through module maps',url:'https://docs.swift.org/main/documentation/packagemanagerdocs/modulemaps/'},
 {id:'header',title:'H3 source: coordinate types and C declarations',url:'https://github.com/uber/h3/blob/master/src/h3lib/include/h3api.h.in'}
 ],
 sections:[
 {id:'ride-contribution',title:'What I worked on',paragraphs:[
 {text:'I worked on the driver-side iOS app for a ride-sharing platform. I implemented hexagonal spatial tiling and nearby-rider search, with the aim of finding close riders quickly while reducing unnecessary search requests and work on the iPhone. I contributed this functionality within the wider platform team.'},
 {text:'The problem that interested me was how much work a location update should trigger. A moving driver needs useful nearby results, but searching every rider and refreshing everything on each update is an expensive way to find them. Spatial indexing gives the search a smaller starting point: the area around the driver.'},
 {text:'I used H3 for the grid and worked with it from Swift. I like this combination because the spatial model solves the right part of the problem, while Swift can use the existing C implementation instead of recreating its geometry.'}
 ]},
 {id:'ride-grid',title:'Turning a continuous map into a searchable neighbourhood',paragraphs:[
 {text:'I think of the grid as an address system for areas. A latitude and longitude identify a point; an H3 index identifies the cell containing that point at a chosen resolution. Driver and rider positions can then be grouped by cell, giving a nearby search a defined set of buckets to inspect. H3 was developed at Uber and released as an open-source hierarchical spatial index.',sources:['origin']},
 {text:'This changes the shape of the work. Rather than compare the driver with an entire city’s rider locations, a search can retrieve candidates from relevant cells and then examine their individual coordinates. If there are N riders overall and C candidates in the selected neighbourhood, the distance-ranking stage works on C rather than N. That is the useful reduction; cell indexing itself does not guarantee constant-time matching or a fixed latency.'},
 {text:'I keep candidate selection separate from final selection. The cell answers where to look. The rider’s actual location, availability and the product’s matching rules determine whether that candidate is useful.'}
 ]},
 {id:'ride-hexagons',title:'Why I like hexagons for local movement',paragraphs:[
 {text:'A regular hexagonal grid has six edge-sharing neighbours, with the same centre-to-centre distance in the ideal planar lattice. A square grid has a distinction between edge neighbours and more distant diagonal neighbours. Hexagons give local expansion a more uniform shape, and successive neighbourhoods form a useful approximation to a circular search area.',sources:['hexagons']},
 {text:'I find that geometry elegant because the representation matches the question. A driver is looking around their position, not only north, south, east and west. Six comparable local directions give a simple way to expand that neighbourhood. On the Earth, projection distortion means the cells are not perfectly regular or equal-area, so I treat the hexagonal picture as a useful local structure rather than perfect global symmetry.'},
 {text:'A hexagon is still a bucket, not an exact radius. A rider just over a cell boundary can be closer than another rider inside the driver’s own cell. That is why a search must include neighbouring cells and compare actual positions after it has collected candidates.'}
 ]},
 {id:'ride-sphere',title:'The beautiful exception: a sphere cannot be all hexagons',paragraphs:[
 {text:'H3 lays its grid across an icosahedron and projects it onto a sphere. At resolution zero it has 122 base cells: 110 hexagons and 12 pentagons. Those 12 pentagons remain at every resolution. They are necessary to close the grid over a sphere; an everywhere-hexagonal tiling cannot do that.',sources:['sphere']},
 {text:'I like the mathematical reason behind the exception. For a closed spherical tiling where three faces meet at each vertex, Euler’s relation gives V − E + F = 2, while 3V = 2E. If every face is a pentagon or hexagon, edge counting gives 5P + 6H = 2E. Substituting these relations yields P = 12. The twelve pentagons are the curvature the otherwise hexagonal structure needs.'},
 {text:'That is also a practical reminder when writing traversal code. A global grid cannot behave exactly like an infinite flat honeycomb. I would use the library’s supported traversal functions rather than assume every local coordinate operation works unchanged near pentagons or across face boundaries.'}
 ]},
 {id:'ride-coordinate-conversion',title:'How a coordinate becomes a cell',paragraphs:[
 {text:'I describe coordinate-to-cell conversion as geometric quantisation. H3 first determines the relevant icosahedron face and projects the spherical location into that face’s local plane. It scales the local coordinates for the requested resolution, converts them into a normalised hexagonal IJK address, and derives the hierarchy of digits leading back to a base cell. Base-cell lookup and orientation adjustments produce the final index.',sources:['conversion']},
 {text:'The IJK system uses three grid axes spaced 120 degrees apart. H3 combines that local address with an icosahedron face to represent the point within its global grid. Successive resolutions alternate their orientation, which lets the hierarchy refine the grid while retaining the hexagonal arrangement.',sources:['coordinates']},
 {text:'The useful result is deterministic: the same coordinate and resolution identify the same cell. Moving within that cell changes the exact position without changing its area address. Crossing the boundary changes the cell index, making movement between search areas straightforward to detect.'}
 ]},
 {id:'ride-hashing',title:'What “hashing the coordinates” really means',paragraphs:[
 {text:'I sometimes use “spatial hash” as shorthand for bucketing points, but H3 is not a cryptographic hash of a latitude–longitude string. It calculates the containing cell and encodes its hierarchical address. Many coordinates deliberately map to the same cell. That is the purpose of the grouping, not an accidental collision.'},
 {text:'An H3 cell index is packed into a 64-bit integer. Its fields encode the mode, resolution, base cell and up to fifteen three-bit child digits. Cell resolutions run from 0 to 15, and unused child digits use the value 7. The index is commonly displayed in hexadecimal, but the hex in that representation is base-sixteen notation, separate from the six-sided cell geometry.',sources:['bits']},
 {text:'I would use the H3 index itself as the persistent cell identity. A Swift Dictionary may hash that integer internally for lookup, but Swift’s hashValue is not the geographic identifier and should not be stored as one. When exchanging indexes with JavaScript-based services, a hexadecimal string avoids losing integer precision in a floating-point JSON number.'}
 ]},
 {id:'ride-hierarchy',title:'Choosing resolution without confusing hierarchy with boundaries',paragraphs:[
 {text:'H3 uses an aperture-seven hierarchy: a hexagonal parent has seven logical children. The logical parent–child relationship is exact, but the children’s geographic outlines do not fit perfectly inside the parent’s outline. I would therefore distinguish asking for a cell’s logical parent from independently indexing the same coordinate at a coarser resolution.',sources:['hierarchy']},
 {text:'Resolution is a workload decision as much as a map-detail decision. Coarse cells collect more riders in each bucket; fine cells reduce bucket density but require more cells to cover the same physical neighbourhood. I would choose it around rider density, the intended search area and update frequency, rather than always selecting the smallest available cells.'},
 {text:'I also keep the exact coordinate alongside its cell. The cell is useful for grouping and retrieval, while the coordinate remains necessary for final distance calculations and the driver’s map.'}
 ]},
 {id:'ride-neighbours',title:'Searching around the driver',paragraphs:[
 {text:'H3’s gridDisk function collects cells within k adjacency steps of an origin, while gridDistance counts cell-to-cell hops. I would retrieve the origin and a surrounding disk, collect rider candidates from those cells and expand the search when the product needs a wider area. A grid step is not a fixed number of metres or a driving-time estimate.',sources:['traversal']},
 {text:'Away from distortion, a flat hexagonal disk contains 1 + 3k(k + 1) cells: seven at k = 1 and nineteen at k = 2. This gives an intuitive sense of how the neighbourhood grows, but I would allocate C output buffers using H3’s sizing API and handle its errors and zero entries rather than assume a flat-grid count always applies.'},
 {text:'I would not stop at the first occupied cell and call its rider globally nearest. The closest person might be just beyond another boundary, and H3 does not return a sorted nearest-neighbour list. A search needs a defined coverage policy, a distance-based final ranking and a sensible expansion limit.'}
 ]},
 {id:'ride-ranking',title:'Closest on the map and fastest to reach are different',paragraphs:[
 {text:'My nearby-rider work was about finding useful close candidates without unnecessary work. I use distance to explain the final shortlist, but I would distinguish straight-line or great-circle distance from travel time. A bridge, one-way street or divided road can make a geographically close pickup slower to reach than another one.'},
 {text:'For a system that optimises arrival time, I would use H3 to narrow the field, geographic distance for a cheap first ranking and road-network ETA for a small final set when a routing service is available. That keeps the expensive question focused on plausible candidates. It is an approach I would take to routing, rather than attributing a particular routing engine or ETA algorithm to this app.'},
 {text:'Freshness matters too. A nearby coordinate can become irrelevant if the rider has cancelled, moved or already been matched. Spatial indexing reduces the search area; the authoritative service still needs to check the current state and coordinate acceptance.'}
 ]},
 {id:'ride-workload',title:'Keeping both the search and the iPhone’s work bounded',paragraphs:[
 {text:'I worked on the driver app with both request load and iOS workload in mind. The aim was to avoid repeatedly doing broad nearby-rider work when the driver only needed a local set of candidates. Hexagonal tiling provided the spatial structure for that search.'},
 {text:'I would keep changes to cell membership separate from changes to exact location. A driver can move within a cell without requiring the same membership work as a cell transition, while their precise coordinate can still update for matching and display. A neighbourhood cache can be reused when appropriate, but it still needs expiry and refresh rules so staying in the same cell does not freeze new rider requests.'},
 {text:'On iOS, I would bound concurrent requests, cancel obsolete searches and reject late responses from an older driver position. For the map, I would update relevant annotations and draw only the cells needed for the visible region. These are the techniques I consider alongside spatial indexing when keeping location work off the main rendering path.'},
 {text:'I would measure request frequency, candidate counts, search latency and main-thread work together. A faster cell conversion alone does not show that the whole experience has improved; the benefit has to survive data retrieval, ranking and presentation.'}
 ]},
 {id:'ride-swift-c',title:'Why a C library fits naturally into Swift',paragraphs:[
 {text:'H3’s core is written in C, which makes it usable from languages with a C foreign-function interface. In Swift, the C implementation can be compiled or linked into the app and exposed through its headers. The call stays within the native process; it does not need a JavaScript bridge, network round trip or a Swift rewrite of the indexing algorithm.',sources:['bindings']},
 {text:'Swift imports C declarations through Clang modules. A Swift package can expose the library through a C target and its public headers, with a module map defining the import when needed. Once that module is available, Swift can call C functions and work with imported structs and integer types. The packaging still has to supply the correct library build for the iPhone and simulator.',sources:['swift']},
 {text:'The interoperability is direct, but I still pay attention to the API boundary. H3Index is a 64-bit unsigned value. The C LatLng struct expects radians, whereas app map coordinates normally use degrees. Functions that write results need valid output storage, and H3 4.x returns an error status that a Swift wrapper should check.',sources:['header']}
 ],codeLanguage:'Swift · illustrative H3 4.x wrapper',code:`import CH3

enum CellError: Error {
    case invalidCoordinate
    case indexingFailed(H3Error)
}

func cell(latitude: Double, longitude: Double,
          resolution: Int32) throws -> H3Index {
    guard latitude.isFinite, longitude.isFinite,
          (-90...90).contains(latitude),
          (-180...180).contains(longitude) else {
        throw CellError.invalidCoordinate
    }
    var point = LatLng(
        lat: latitude * .pi / 180,
        lng: longitude * .pi / 180
    )
    var result: H3Index = 0
    let status = latLngToCell(&point, resolution, &result)
    guard status == 0 else {
        throw CellError.indexingFailed(status)
    }
    return result
}`},
 {id:'ride-api-boundary',title:'Keeping the Swift boundary small',paragraphs:[
 {text:'The example wraps the modern C latLngToCell call behind a Swift throwing function. CH3 is an example module name. H3 takes the coordinate, resolution and output pointer, and returns zero on success. I would keep that version-specific naming inside the wrapper so the rest of the app deals with coordinates, cells and Swift errors.',sources:['c-api']},
 {text:'Passing &point and &result gives the C call temporary access to Swift-managed storage for that call. I would not retain those pointers after the call returns. For functions returning a neighbourhood into an array, I would allocate the required capacity, use a scoped mutable buffer and check the status before reading it.'},
 {text:'This is the part of interoperability I appreciate: I can keep an idiomatic Swift interface around a mature native library while leaving its geometry in C. It gives me reuse without pretending that units, memory ownership and errors disappear at the language boundary.'}
 ]},
 {id:'ride-takeaway',title:'What I took from the work',paragraphs:[
 {text:'I learned to approach a nearby search as a sequence of smaller questions: which area contains the driver, which neighbouring areas are relevant, which rider candidates are available, and which are actually closest or quickest to reach. Each stage needs a representation suited to its job.'},
 {text:'The beauty of H3 for me is that it connects geometry with ordinary application engineering. A coordinate becomes a compact cell address; that address narrows the work; Swift can call the C implementation directly; and the driver app can spend its effort on a useful local result. My contribution brought those ideas into the iOS side of a team-built ride-sharing product.'}
 ]}
 ]
};
