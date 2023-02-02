import { MouseEventHandler, ReactChild } from 'react';
import ReactDOM from 'react-dom';

const Modal = (props: {
    onDismiss: MouseEventHandler<HTMLDivElement> | undefined;
    title: string;
    content: string | undefined;
    actions: ReactChild | null | undefined;
}) => {
    return ReactDOM.createPortal(
        <div
            onClick={props.onDismiss}
            className='ui dimmer modals visible active'
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='ui standard modal visible active'
            >
                <div className='header'>{props.title}</div>
                <div className='content'>{props.content}</div>
                <div className='actions'>{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')!
    );
};

export default Modal;
