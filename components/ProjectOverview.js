import {projectOverviews} from '../lib/project-overviews';
export default function ProjectOverview({project}){
 const overview=projectOverviews[project.slug];
 return <div className="project-overview"><section aria-labelledby="overview-need"><h3 id="overview-need">The idea</h3><p>{overview.need}</p></section><section aria-labelledby="overview-delivery"><h3 id="overview-delivery">What I delivered</h3><ul>{overview.delivery.map(item=><li key={item}>{item}</li>)}</ul></section><section aria-labelledby="overview-relevance"><h3 id="overview-relevance">How I can help with your project</h3><p>{overview.relevance}</p></section></div>;
}
