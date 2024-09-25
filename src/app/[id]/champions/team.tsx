import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const isBan: boolean = true;

function Team() {
  return (
    <>
      <div className="flex flex-row gap-3 mb-10 mt-10 ml-4">
        <div className="banChamp">
          <FontAwesomeIcon className="iconBan" icon="ban" />
        </div>
        <div className="banChamp">
          <FontAwesomeIcon className="iconBan" icon="ban" />
        </div>
        <div className="banChamp">
          <FontAwesomeIcon className="iconBan" icon="ban" />
        </div>
        <div className="banChamp">
          <FontAwesomeIcon className="iconBan" icon="ban" />
        </div>
        <div className="banChamp">
          <FontAwesomeIcon className="iconBan" icon="ban" />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          {isBan ? (
            <div className="selecChamp">
                <div className="containerSelecChampSeparador up flex items-center">
                    <div className="puntoSelecChampSeparador"></div>
                    <hr className="lineaSelecChampSeparador" />
                </div>
                <div className="separadorAmarillo left">
                </div>
                <div className="blockChamp">
                  <FontAwesomeIcon className="iconBlock" icon="ban" />
                </div>
                <div className="circuloCampeonSeleccionado">
                </div>
                <div className="flex flex-col gap-1 text-[9px] containerNickUsuario">
                  <label>
                    Bloqueo
                  </label>
                  <label>
                    Nick name usuario
                  </label>
                </div>
                <FontAwesomeIcon className="iconArrowSelec" icon="caret-left" />
                <div className="containerContandorUsuario">
                  22
                </div>
                <div className="containerSelecChampSeparador bottom flex items-center">
                    <div className="puntoSelecChampSeparador"></div>
                    <hr className="lineaSelecChampSeparador" />
                </div>
            </div>
          ) : (
            <div className="selecBan">

            </div>
          )}
          <div className="selecChamp"></div>
          <div className="selecChamp"></div>
          <div className="selecChamp"></div>
          <div className="selecChamp"></div>
          <div className="selecChamp"></div>
        </div>
      </div>
    </>
  );
}

export default Team;
