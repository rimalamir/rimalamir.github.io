import Experience from '../../components/Experience';
import {portfolio} from '../../lib/portfolio';
export const metadata={alternates:{canonical:'/about/'},title:'About Amir Rimal | Software Developer, Toowoomba',description:'Web, backend and mobile development experience across independent products and commercial team contributions.'};
export default function Page(){return <Experience data={portfolio} personal initialAbout/>}
