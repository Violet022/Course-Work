import { useContext } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form} from 'antd';
import { VisibilityContext } from '../../../contexts/VisibilityContext';

const CancelEditButton = () => {
    const visibilityContext = useContext(VisibilityContext)

    const onCancelButtonClick = () => {
        visibilityContext.toggleSwitcher()
    }
  
    return (
        <Button type="primary" htmlType="button" danger onClick={onCancelButtonClick}>
            Отмена
        </Button>
    );
};

export default CancelEditButton