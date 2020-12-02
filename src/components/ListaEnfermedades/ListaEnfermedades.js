import React, { useState, useEffect } from 'react'
import { Grid, Button, Icon } from 'semantic-ui-react'

import { arrayIconHumanSys } from './data';

//DRAG ANDD DROP
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Item from '../DragAndDrop/Item';
import DropWrapper from '../DragAndDrop/DropWrapper';
import Col from '../DragAndDrop/Col';
// import { statuses } from '../DragAndDrop/data';
// import { Redirect } from 'react-router-dom';
import ModalComponent from '../ModalComponent';

//

const ListaEnfermedades = React.memo(() => {

  const { name } = JSON.parse(localStorage.getItem('user'));
  const { humanSystem, arrayData, color } = window.history.state.state;

  //DRAG AND DROP
  const [items, setItems] = useState(arrayData);
  // console.log(arrayData);
  const [dragItem, setDragItem] = useState([]);
  const [btnAddExp, setBtnAddExp] = useState(null);

  useEffect(() => {
    setDragItem((state) => {
      const itemsFound = items.filter((st) => st.status === 'misEnfermedades');
      return [...itemsFound];
    });
  }, [items]);

  useEffect(() => {
    if (dragItem.length > 0) {
      setBtnAddExp(<Button>Ingresar a expediente</Button>);
    } else {
      setBtnAddExp(<Button>No tengo ninguna de estas enfermedades</Button>);
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
    const search = e.currentTarget.value
    if (search.length >= 3) {
      const newItemsTrue = items
        .filter((item) => item.content.toUpperCase()
          .includes(search.toUpperCase()))
        .map((itemx, index) => {
          itemx.isShow = true;
          return itemx;
        });

      setItems((prevState) => {
        const newItems = prevState
          .filter((data) => !data.content.toUpperCase().includes(search.toUpperCase()))
          .map((itemd) => {
            itemd.isShow = false;
            return itemd;
          })
          .concat(...newItemsTrue);

        return [...newItems];
      })

      // const newItemsSearch = items.filter((data) => data.content.toUpperCase().includes(search.toUpperCase()));
      // if (newItemsSearch.length > 0 && newItemsSearch.length < 5) {
      //   setItems(newItemsSearch);
      // } else {

      // }
    } else {
      setItems((prevState) => {
        const newItems = prevState.map((itemdx, index) => {
          if (itemdx.id < 7) {
            itemdx.isShow = true;
          } else {
            itemdx.isShow = false;
          }
          return itemdx;
        })
        return [...newItems];
      })
    }
  }

  const [addDiseaNotExist, setAddDiseaNotExist] = useState();

  const handleAddDiseaNotExist = () => {
    setOpen(false);
    const item = {
      id: items.length + Math.floor((Math.random() * 100) + 1),
      status: "misEnfermedades",
      content: addDiseaNotExist,
      isShow: false,
    }
    setItems((prevState) => {
      const newDragItem = prevState.concat(item);
      return [...newDragItem]
    })
    setDragItem((prevState) => {
      const newDragItem = prevState.concat(item);
      return [...newDragItem]
    })

  }

  return (
    <div>
      <Grid centered className="lista-enfermedades">
        <Grid.Row>
          {arrayIconHumanSys
            .filter((icon) => icon.name === humanSystem)
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
        <Grid.Row columns="2" className="container-diseases">
          <Grid.Column className="diseases left">
            <Grid.Row>
              <h3>Enfermedades</h3>
            </Grid.Row>
            <Grid.Row className="plate">
              <Icon name='search' />
              <input type='text' id='search' placeholder='Buscar' onKeyUp={handleSearch} />
              <DndProvider backend={HTML5Backend}>
                <div className={'row'}>
                  <div className={'col-wrapper'}>
                    <DropWrapper onDrop={onDrop} status={'enfermedades'}>
                      <Col>
                        {items
                          .filter((i, index) => (i.status === 'enfermedades' && i.isShow))
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
                <Button onClick={() => setOpen(true)}>No encuentro mi enfermedad</Button>
              </Grid.Row>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column className="diseases right">
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
                <DndProvider backend={HTML5Backend}>
                  <div className={'row'}>
                    <div className={'col-wrapper'}>
                      <DropWrapper onDrop={onDrop} status={'misEnfermedades'}>
                        <Col>
                          {dragItem
                            .filter((i) => i.status === 'misEnfermedades')
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
              <Grid.Row className="no-disease">{btnAddExp}</Grid.Row>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ModalComponent
        open={open}
        onClose={() => setOpen(false)}
        title='¿Qué enfermedad tienes?'
        textModal='Ingrese la enfermedad que tenga en el sistema.'
        buttonText='Ingresar al expediente'
        placeholder='Enfermedad'
        icon={true}
        setInputData={(e) => { setAddDiseaNotExist(e) }}
        onClick={handleAddDiseaNotExist}
      />
    </div>
  );
});

export default ListaEnfermedades;
