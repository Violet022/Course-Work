import React, { useContext } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form} from 'antd';
import { useAppDispatch } from '../../../../hooks/hooks';
import { VisibilityContext } from '../../../contexts/VisibilityContext';

type PropsType = {
    form: FormInstance,
    updateInfo: () => any
}

const SubmitEditButton:React.FC<PropsType> = (props) => {
    const visibilityContext = useContext(VisibilityContext)
    const [submittable, setSubmittable] = React.useState(true);
    const dispatch = useAppDispatch()
    const values = Form.useWatch([], props.form);

    const updateInfo = () => {
        dispatch(props.updateInfo())
        visibilityContext.toggleVisibilitySwitcher()
    }
  
    React.useEffect(() => {
      props.form.validateFields({ validateOnly: true }).then(
        () => {setSubmittable(true);},
        () => {setSubmittable(false);}
      )
    }, [values]);
  
    return (
        <Button type="primary" htmlType="button" disabled={!submittable} style={{marginRight: 15}}
            onClick={updateInfo}
        >
            Сохранить
        </Button>
    );
};

export default SubmitEditButton