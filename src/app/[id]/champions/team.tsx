import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Team() {
    return (
        <div className="flex flex-row gap-3">
            <div className="banChamp"><FontAwesomeIcon className="iconBan" icon="ban" /></div>
            <div className="banChamp"><FontAwesomeIcon className="iconBan" icon="ban" /></div>
            <div className="banChamp"><FontAwesomeIcon className="iconBan" icon="ban" /></div>
            <div className="banChamp"><FontAwesomeIcon className="iconBan" icon="ban" /></div>
            <div className="banChamp"><FontAwesomeIcon className="iconBan" icon="ban" /></div>
        </div>
    );
}

export default Team;