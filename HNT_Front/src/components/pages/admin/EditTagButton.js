import ModalWrapper from "../../parts/ModalWrapper";
import EditIcon from '@mui/icons-material/Edit';

export default function EditTagButton({ Component, props, buttonTitle, Ico }){
    return(<ModalWrapper buttonTitle="Edit" Ico= { EditIcon }>
        <Component { ...props }/>
    </ModalWrapper>)
}

{/* <ModalWrapper buttonTitle="Edit" Ico= { EditIcon }>
        <EditTag tag_id={tag._id} setter={updateATagSetter}/>
    </ModalWrapper> */}