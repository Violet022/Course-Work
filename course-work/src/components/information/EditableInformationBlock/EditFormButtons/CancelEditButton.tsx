import { useContext } from 'react';
import { Button } from 'antd';
import { VisibilityContext } from '../../../contexts/VisibilityContext';

const CancelEditButton = () => {
    const visibilityContext = useContext(VisibilityContext)

    const onCancelButtonClick = () => {
        visibilityContext.toggleVisibilitySwitcher()
    }
  
    return (
        <Button type="primary" htmlType="button" danger onClick={onCancelButtonClick}>
            Отмена
        </Button>
    );
};

export default CancelEditButton