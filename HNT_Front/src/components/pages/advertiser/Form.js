import '../../../index.css';

export default function Form({ title="Create an Ad", button_name="Create"}){
    return(
        <div>
            {/* <h1>{title} </h1>
            <form id="campaignForm" ref= { formRef }>
                <label htmlFor="Name">Name of Ad: </label>
                <input 
                    id="name" 
                    name="name" 
                    type="text"
                    className="formData" 
                    value = { name } 
                    onChange={ (e) => setName(e.target.value) }
                />

                <label htmlFor="ad_url">Ad URL </label>
                <input
                    id="ad_url" 
                    name="ad_url"
                    type="text"
                    className="formData"
                    value = { audioUrl } 
                    onChange={ (e) => setAudioUrl(e.target.value) }
                />



                <button type="button" onClick={submitFormHandler}>{button_name}</button>
            </form> */}
        </div>
    )
}
