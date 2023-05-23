import Button from "../Button/Button"
import SecondaryButton from "../Button/SecondaryButton"
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ControlledCheckbox from "../Others/ControlledCheckbox";
import Link from "next/link";


// export function FilterCompo({categoryTitle, categoryContent}){

//     const checkboxes = categoryContent.map(value => {
//         return (
//             <FormControlLabel 
//                 label={value} 
//                 control={
//                     <ControlledCheckbox 
//                         name={categoryTitle} 
//                         label={value}
//                     />
//                 }

//             />
//         )
//     })

//     return (
//         <div>
//             <Accordion>
//                 <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1a-content"
//                 id="panel1a-header"
//                 >
//                 <Typography>{categoryTitle}</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     {checkboxes}
//                 </AccordionDetails>
//             </Accordion>
//         </div>
//     )
// }

export function Compo({category, categoryTitle, categoryContent}){
    const links = categoryContent.map(value => {
        return (
            <div 
                key={value}
                className="mb-2 ml-4">
                <Link href={`/${category}/${value.toLowerCase()}`} >
                    {value}
                </Link>
            </div>
        )
    })
    return (
        <div>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>{categoryTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {links}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export function FiltersCompo(props){

    return(
        <aside className='relative bg-white text-black'>
            <div className='sticky top-24 w-full sm:w-[80%] my-8'>
                <div className="text-xl font-bold">Filters</div>
                <div className="mt-4">
                    <Compo 
                        category={props.category}
                        categoryTitle="Prices" 
                        categoryContent={['under 499', 'under 999', 'under 1499']} />
                    <Compo
                        category={props.category}
                        categoryTitle="Sleeve"
                        categoryContent={['FullSleeve', 'Halfsleeve', 'sleeveless']} />
                    <Compo 
                        category={props.category}
                        categoryTitle="Design" 
                        categoryContent={['Printed', 'Solid']} />
                    <Compo 
                        category={props.category}
                        categoryTitle="Fit" 
                        categoryContent={['oversize', 'fit']} />
                </div>
            </div>
        </aside>
    )
}
