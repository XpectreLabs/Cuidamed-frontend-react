import React from 'react'
import {
    Grid,
    Button
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import {
    CarpDigestivo,
    CarpEndocrino,
    CarpMuscular,
    CarpNervioso,
    CarpOseo,
    CarpPiel,
    CarpRespiratorio,
    CarpSanguineo,
    CarpSexual,
    CarpUrinario,

} from '../../images/icons/icons';

// {carpetaSistemas.map((sistema, index) => (
//     <Grid.Row key={index}>
//         <Grid.Column width={3} >
//             <div className="carpeta">
//                 {sistema.svgFirst}
//                 <Grid.Row>
//                     <Button>Incompleto</Button>
//                     <Button>Editar</Button>
//                 </Grid.Row>
//                 <Grid.Row>
//                     <p>{sistema.nameFirst}</p>
//                 </Grid.Row>
//             </div>
//         </Grid.Column>
//         <Grid.Column width={3} >
//             <div className="carpeta">
//                 {sistema.svgSecond}
//                 <Grid.Row>
//                     <Button>Incompleto</Button>
//                     <Button>Editar</Button>
//                 </Grid.Row>
//                 <Grid.Row>
//                     <p>{sistema.nameSecond}</p>
//                 </Grid.Row>
//             </div>
//         </Grid.Column>
//         <Grid.Column width={3} >
//             <div className="carpeta">
//                 {sistema.svgThird}
//                 <Grid.Row>
//                     <Button>Incompleto</Button>
//                     <Button>Editar</Button>
//                 </Grid.Row>
//                 <Grid.Row>
//                     <p>{sistema.nameThird}</p>
//                 </Grid.Row>
//             </div>
//         </Grid.Column>
//         <Grid.Column width={3} >
//             <div className="carpeta">
//                 {sistema.svgFourth}
//                 <Grid.Row>
//                     <Button>Incompleto</Button>
//                     <Button>Editar</Button>
//                 </Grid.Row>
//                 <Grid.Row>
//                     <p>{sistema.nameFourth}</p>
//                 </Grid.Row>
//             </div>
//         </Grid.Column>
//     </Grid.Row>
//     ))}

export default function Sistemas() {
    return (
        <div>
            <Grid className="carpeta-enfermedades" centered>
                <Grid.Row>
                    <h1 className="title-diseas">Historial Médico</h1>
                </Grid.Row>
                <Grid.Row className="subtitle-diseas">
                    <h3>Enfermedades de:</h3>
                </Grid.Row>
                <Grid.Row className="row-carpetas">
                    <Grid.Column width={3}>
                        <div className="carpeta">
                            <Link
                                to={{
                                    pathname: "/lista-enfermedades",
                                    state: { humanSystem: 'óseo' }
                                }}
                            >
                                <CarpOseo />
                            </Link>
                            <Grid.Row>
                                <Button>Incompleto</Button>
                                <Button>Editar</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Sistema óseo</p>
                            </Grid.Row>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div className="carpeta">
                            <Link
                                to={{
                                    pathname: "/lista-enfermedades",
                                    state: { humanSystem: "muscular" }
                                }}
                            >
                                <CarpMuscular />
                            </Link>
                            <Grid.Row>
                                <Button>Incompleto</Button>
                                <Button>Editar</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Sistema muscular</p>
                            </Grid.Row>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div className="carpeta">
                            <Link
                                to={{
                                    pathname: "/lista-enfermedades",
                                    state: { humanSystem: 'digestivo' }
                                }}
                            >
                                <CarpDigestivo />
                            </Link>
                            <Grid.Row>
                                <Button>Incompleto</Button>
                                <Button>Editar</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Sistema digestivo</p>
                            </Grid.Row>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div className="carpeta">
                            <Link
                                to={{
                                    pathname: "/lista-enfermedades",
                                    state: { humanSystem: 'circulatorio' }
                                }}
                            >
                                <CarpSanguineo />
                            </Link>
                            <Grid.Row>
                                <Button>Incompleto</Button>
                                <Button>Editar</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Sistema circulatorio</p>
                            </Grid.Row>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="row-carpetas">
                    <Grid.Column width={3}>
                        <div className="carpeta">
                            <Link
                                to={{
                                    pathname: "/lista-enfermedades",
                                    state: { humanSystem: 'urinario' }
                                }}
                            >
                                <CarpUrinario />
                            </Link>
                            <Grid.Row>
                                <Button>Incompleto</Button>
                                <Button>Editar</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Sistema urinario</p>
                            </Grid.Row>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div className="carpeta">
                            <Link
                                to={{
                                    pathname: "/lista-enfermedades",
                                    state: { humanSystem: 'nervioso' }
                                }}
                            >
                                <CarpNervioso />
                            </Link>
                            <Grid.Row>
                                <Button>Incompleto</Button>
                                <Button>Editar</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Sistema nervioso</p>
                            </Grid.Row>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div className="carpeta">
                            <Link
                                to={{
                                    pathname: "/lista-enfermedades",
                                    state: { humanSystem: 'reproductivo' }
                                }}
                            >
                                <CarpSexual />
                            </Link>
                            <Grid.Row>
                                <Button>Incompleto</Button>
                                <Button>Editar</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Sistema reproductivo</p>
                            </Grid.Row>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div className="carpeta">
                            <Link
                                to={{
                                    pathname: "/lista-enfermedades",
                                    state: { humanSystem: 'endocrino' }
                                }}
                            >
                                <CarpEndocrino />
                            </Link>
                            <Grid.Row>
                                <Button>Incompleto</Button>
                                <Button>Editar</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Sistema endocrino</p>
                            </Grid.Row>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="row-carpetas">
                    <Grid.Column width={3}>
                        <div className="carpeta">
                            <Link
                                to={{
                                    pathname: "/lista-enfermedades",
                                    state: { humanSystem: 'respiratorio' }
                                }}
                            >
                                <CarpRespiratorio />
                            </Link>
                            <Grid.Row>
                                <Button>Incompleto</Button>
                                <Button>Editar</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Sistema respiratorio</p>
                            </Grid.Row>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div className="carpeta">
                            <Link
                                to={{
                                    pathname: "/lista-enfermedades",
                                    state: { humanSystem: 'piel' }
                                }}
                            >
                                <CarpPiel />
                            </Link>
                            <Grid.Row>
                                <Button>Incompleto</Button>
                                <Button>Editar</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Piel</p>
                            </Grid.Row>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
