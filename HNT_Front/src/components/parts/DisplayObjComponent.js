import '../../index.css';

export default function DisplayObjComponent({ obj, includeL = [], excludeL = [], 
    classy = "", wrapClass = "", propClass = "", valClass = "", added="" }){
    const displayObject = includeL.length ? include(obj, includeL) : exclude(obj, excludeL);
    // const displayArray = Object.keys(displayObject);
    // console.log('hey!!!!!', obj, displayObject, displayArray)
    return(<div className={ classy } id={added}>
        { displayObject.map((property, i)=>{
            const value = obj[property];
            console.log('waaaaaa: ', property, value)
            return (<div key={`${added}_${i}`} className={ wrapClass } id={`wrap_${i}${added}`}>
                <div id={`prop_${i}${added}`}>{ property }:  </div>{' '}
                <div id={`val_${i}${added}`}>{ value }</div>
            </div>)
        })}
    </div>)
}
// className={ propClass } 
// className={ valClass }

function exclude(obj, filter){
    const result = filter.filter((item)=>{
        return obj[item] === undefined; // && arrayForm.push({ key: item, value: obj[item] })
    });

    return result;
}

function include(obj, filter){
    const result = filter.filter((item)=>{
        return obj[item] !== undefined; // && arrayForm.push({ key: item, value: obj[item] })
    });

    return result;
}