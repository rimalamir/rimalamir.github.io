import Experience from '../../components/Experience';
import {portfolio} from '../../lib/portfolio';
export const metadata={alternates:{canonical:'/blog/'},title:'AI & Software Engineering Notes | Amir Rimal',description:'Writing about AI, application development and practical engineering by Amir Rimal.'};
export default function Blog(){return <Experience data={portfolio} personal initialNotes/>;}
