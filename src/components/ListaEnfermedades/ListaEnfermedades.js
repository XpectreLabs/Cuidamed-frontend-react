import React, { useState, useEffect } from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';

import { arrayIconHumanSys } from './data';

//DRAG ANDD DROP
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { TouchBackend } from 'react-dnd-touch-backend'
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

import Item from '../DragAndDrop/Item';
import DropWrapper from '../DragAndDrop/DropWrapper';
import Col from '../DragAndDrop/Col';

import ModalComponent from '../ModalComponent';
import { Carpeta } from '../../images/icons/icons';

import { useHistory } from 'react-router-dom';
import { CONECTION } from '../../conection';
import { VERIFICAR, VERIFICADO } from './types';
import { useDispatch } from 'react-redux';

import { saveIllnessSystem } from '../../redux/actions/UserAction';
import { types } from '../../redux/types';
import Swal from 'sweetalert2';
//

const ListaEnfermedades = React.memo(() => {
  const history = useHistory();
  const { name } = JSON.parse(localStorage.getItem('user'));
  const { humanSystem, color, carpetaId, systemId } = history.location.state;

  //DRAG AND DROP
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: types.loading});
    fetch(`${CONECTION}api/IllnessBySystem/${systemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'x-auth-token': localStorage.getItem('refreshToken'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          const newData = data.data.map((d) => {
            const commonDiseases = JSON.parse(
              localStorage.getItem('commonDiseases')
            );
            if (commonDiseases) {
              commonDiseases.map((disease) => {
                if (disease.trim() === d.name.trim()) {
                  d.status = VERIFICADO;
                }
                return disease;
              });
            }
            //console.log(commonDiseases);
            d.isShow = true;
            return d;
          });
          setItems(newData);
        }
        dispatch({type: types.loaded});
      });
  }, []);

  // console.log(arrayData);
  const [dragItem, setDragItem] = useState([]);
  const [btnAddExp, setBtnAddExp] = useState(null);

  useEffect(() => {
    setDragItem((state) => {
      const itemsFound = items.filter((st) => st.status === VERIFICADO);
      itemsFound.concat(state);
      return [...itemsFound];
    });
  }, [items]);

  useEffect(() => {
    fetch(`${CONECTION}api/relation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'x-auth-token': localStorage.getItem('refreshToken'),
      },
      body: JSON.stringify({ systemId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          data.data.forEach((d) => {
            console.log(d.illnessId.name);
            setItems((prevState) =>
              prevState.map((i) => {
                if (i.name === d.illnessId.name) {
                  i.status = VERIFICADO;
                }
                return i;
              })
            );
          });
        }
      });
  }, []);

  const saveAndContinue = (e) => {
    const obj = {
      illness: JSON.stringify(dragItem),
      carpetaId,
      systemId,
    };
    dispatch(saveIllnessSystem(obj, history));
  };

  useEffect(() => {
    if (dragItem.length > 0) {
      setBtnAddExp('Ingresar a expediente');
    } else {
      setBtnAddExp('No tengo ninguna de estas enfermedades');
    }
  }, [dragItem]);

  const onDrop = (item, monitor, status = '') => {
    // const mapping = statuses.find((si) => si.status === status);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status });
      console.log(newItems);
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  const [open, setOpen] = useState(false);

  const handleSearch = async (e) => {
    const search = e.currentTarget.value;
    if (search.length >= 3) {
      fetch(`${CONECTION}api/filter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'x-auth-token': localStorage.getItem('refreshToken'),
        },
        body: JSON.stringify({
          name: search,
          limit: 5,
          human_systems_Id: systemId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            console.log(data.data);
            /*let newDatas = [];
            items.forEach((item) => {
              newDatas = data.data.filter((d) => d.id !== item.id);
            });*/
            const newData = data.data.filter((d, index) => {
              d.isShow = false;
              items.forEach((item) => {
                if (item.id === d.id) {
                  console.log(item);
                  d.isShow = true;
                }
              });
              //d.isShow = true;
              return d;
            });
            setItems((prevState) => {
              const newItems = prevState
                .filter(
                  (data) =>
                    !data.name.toUpperCase().includes(search.toUpperCase())
                )
                .map((itemd) => {
                  itemd.isShow = false;
                  return itemd;
                })
                .concat(...newData);
              return [...newItems];
            });
          }
        });
      // const newItemsTrue = items
      //   .filter((item) => item.name.toUpperCase()
      //     .includes(search.toUpperCase()))
      //   .map((itemx, index) => {
      //     itemx.isShow = true;
      //     return itemx;
      //   });

      // console.log(newItemsTrue);
    } else {
      setItems((prevState) => {
        console.log(prevState);
        const newItems = prevState.map((itemdx, index) => {
          if (index < 7) {
            itemdx.isShow = true;
          } else {
            itemdx.isShow = false;
          }
          return itemdx;
        });
        return [...newItems];
      });
    }
  };

  const [addDiseaNotExist, setAddDiseaNotExist] = useState();

  const handleAddDiseaNotExist = async () => {
    dispatch({type: types.loading});
    try {
      const request = await fetch(`${CONECTION}api/Illness`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'x-auth-token': localStorage.getItem('refreshToken'),
        },
        body: JSON.stringify({name: addDiseaNotExist,status: 'VERIFICADO',human_systems_Id: systemId })
      });
      const response = await request.json();
      const item = {
        id: response.data.id,
        status: VERIFICADO,
        name: addDiseaNotExist,
        isShow: false,
      };
      setItems((prevState) => {
        const newDragItem = prevState.concat(item);
        return [...newDragItem];
      });
      setDragItem((prevState) => {
        const newDragItem = prevState.concat(item);
        return [...newDragItem];
      });
      
      dispatch({type: types.loaded});
      setOpen(false);
    }catch(e) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar la enfermedad'
      })  
      dispatch({type: types.loaded});
    }
  };

  function isMobile() {
    return (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/BlackBerry/i)
    );
  }

  return (
    <div>
      <Grid centered className="lista-enfermedades">
        <Grid.Row>
          {arrayIconHumanSys
            .filter((icon) => icon.system === humanSystem)
            .map((icon, index) => (
              <h1 key={index} className="title-list">
                <span className="title-list-icon">{icon.component}</span>{' '}
                <span style={{ color: color }}>{icon.system}</span>
              </h1>
            ))}
        </Grid.Row>
        <Grid.Row className="instructions" centered>
          <h3>Arrastre las enfermedades que tenga a mis enfermedades</h3>
        </Grid.Row>
        <Grid.Row columns="2" className="container-diseases" centered>
          <Grid.Column
            className="diseases left"
            computer={8}
            tablet={16}
            mobile={16}>
            <Grid.Row>
              <h3>Enfermedades</h3>
            </Grid.Row>
            <Grid.Row className="plate-diseases">
              <Icon name="search" />
              <input
                type="text"
                id="search"
                placeholder="Buscar"
                onKeyUp={handleSearch}
              />
              <DndProvider
                backend={isMobile() !== null ? TouchBackend : HTML5Backend}>
                <div className={'row list-diseases'}>
                  <div className={'col-wrapper'}>
                    <DropWrapper onDrop={onDrop} status={VERIFICAR}>
                      <Col>
                        {items
                          .filter(
                            (i, index) => i.status === VERIFICAR && i.isShow
                          )
                          .map((i, idx) => (
                            <Item
                              key={i.id}
                              item={i}
                              index={idx}
                              moveItem={moveItem}
                            />
                          ))}
                      </Col>
                    </DropWrapper>
                  </div>
                </div>
              </DndProvider>
              <Grid.Row className="no-disease">
                <Button onClick={() => setOpen(true)}>
                  No encuentro mi enfermedad
                </Button>
              </Grid.Row>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column
            className="diseases right"
            computer={7}
            tablet={14}
            mobile={14}>
            <Grid.Row>
              <h3>Mis enfermedades</h3>
            </Grid.Row>
            <Grid.Row className="eyelash" style={{ backgroundColor: color }}>
              <Grid.Row className="pacient">
                <p>{name}</p>
              </Grid.Row>
            </Grid.Row>
            <Grid.Row
              className="folder"
              style={{ border: `3px solid ${color}` }}>
              <Grid.Row className="drag">
                <DndProvider
                  backend={isMobile() !== null ? TouchBackend : HTML5Backend}>
                  <div className={'row'}>
                    <div className={'col-wrapper'}>
                      <DropWrapper onDrop={onDrop} status={VERIFICADO}>
                        <Col>
                          {dragItem
                            .filter((i) => i.status === VERIFICADO)
                            .map((i, idx) => (
                              <Item
                                key={i.id}
                                item={i}
                                index={idx}
                                moveItem={moveItem}
                                status={color}
                              />
                            ))}
                        </Col>
                      </DropWrapper>
                    </div>
                  </div>
                </DndProvider>
              </Grid.Row>
              <Grid.Row className="no-disease">
                <Button onClick={saveAndContinue}>{btnAddExp}</Button>
              </Grid.Row>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ModalComponent
        open={open}
        onClose={() => setOpen(false)}
        title="¿Qué enfermedad tienes?"
        textModal="Ingrese la enfermedad que tenga en el sistema."
        buttonText="Ingresar al expediente"
        placeholder="Enfermedad"
        Icon={Carpeta}
        setInputData={(e) => {
          setAddDiseaNotExist(e);
        }}
        onClick={handleAddDiseaNotExist}
      />
    </div>
  );
});

export default ListaEnfermedades;
