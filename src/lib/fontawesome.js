import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faBan, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Importa los estilos

config.autoAddCss = false; // Evita que Font Awesome añada automáticamente los estilos CSS

library.add(faBan);
library.add(faCaretLeft);