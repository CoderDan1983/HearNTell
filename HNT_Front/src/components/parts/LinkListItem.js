import { Link } from 'react-router-dom';
import '../../index.css';
// import ListenerSingleStory from '../pages/listener/ListenerSingleStory';
import BasicMenu from './BasicMenu';
export default function LinkListItem({ to, name, classy="link", PreIco, Ico, IcoArray, _id, menu }){
    // _id && alert("_id is: ", _id);
    console.log('reloading LinkListItem!', name, _id)
    // return(<Link to={ `${path}/${_id}/${path1}` }>
    const url = _id ? `${to}/${_id}` : to;
    // console.log('url is: ', url);
    // alert('url is: ', url);
    // console.log(_id, to);
    // console.log(url);

    //name of tag, cost of tag, highest bidder, number of stories.

    return(<div className={ PreIco ? "storyItemWithPreIco" : "storyItem" }>
        { PreIco && <PreIco /> }
        <Link to={ url }>
            <div className= { classy }>
                { name }
            </div>
        </Link>
        { Ico && <Ico /> }
        { IcoArray && IcoArray.length && IcoArray.map((ico, i)=>{
            return ((!ico.pre && !ico.post) ? 
                <ico.Icon 
                    className = { ico.class ? ico.class : "inherit" } 
                    key = { i } 
                    onClick= { (e) => ico.clickHandler && ico.clickHandler(e, i, ico.info) } 
                /> :
                ico.pre ? 
                <div key = { i } className = { ico.class ? ico.class : "inherit" }>
                    {ico.pre} 
                    <ico.Icon onClick= { (e) => ico.clickHandler && ico.clickHandler(e, i, ico.info) } />
                </div> : 
                <div key = { i } className = { ico.class ? ico.class : "inherit" }>
                    <ico.Icon onClick= { (e) => ico.clickHandler && ico.clickHandler(e, i, ico.info) } />
                    {ico.post}
                </div> 
            );
        })}
        { menu && <BasicMenu menu= { menu } /> }
    </div>)
}

