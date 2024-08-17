import { Link } from 'react-router-dom';

function ButtonLink({ to, children, className }) {
    return (
        <Link to={to}>
            <button className={className}>
                {children}
            </button>
        </Link>
    );
}

export default ButtonLink;