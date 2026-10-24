import Experience from '../../components/Experience';
import {portfolio} from '../../lib/portfolio';
export const metadata={alternates:{canonical:'/work/'},title:'Software Projects | Amir Rimal',description:'Nine software project studies across web applications, commerce, mobile and open source.'};
export default function Page(){return <Experience data={portfolio} personal/>}
