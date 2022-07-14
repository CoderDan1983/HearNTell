import ModalWrapper from "./ModalWrapper";

//* cProps are the props passed to the Component!
export default function ModalComponent({ Component, cProps: componentProps, buttonTitle, Ico, className }){
    // console.log('got to ModalComponent: ', Component, componentProps, buttonTitle, Ico)
    return(<ModalWrapper buttonTitle= { buttonTitle } Ico= { Ico } className= { className }>
        <Component { ...componentProps }/>
    </ModalWrapper>)
}