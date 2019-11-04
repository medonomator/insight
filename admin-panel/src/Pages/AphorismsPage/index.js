import * as React from 'react';
import api from '../../helpers/api';
import AphorismsTable from '../../components/AphorismsTable';
import AphorismsFilter from '../../components/AphorismsFilter';
import { Button } from '@material-ui/core';
import ModalForm from '../../components/ModalForm';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { Link } from 'react-router-dom';
import 'react-router-modal/css/react-router-modal.css';

const LinkModal = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const AphorismsPage = () => {
  const [isOpen, inverter] = React.useState(false);
  const [aphorisms, setAphorisms] = React.useState({ data: [] });

  React.useEffect(() => {
    const fetchAuth = async () => {
      const res = await api('/admin/aphorisms?random=false', 'GET');
      setAphorisms(res.data);
    };
    fetchAuth();
  }, []);

  const inverterModalForm = () => inverter(!isOpen);

  const addNewAphorism = async ({ author, body, tags }) => {
    try {
      const res = await api('/admin/aphorisms', 'POST', { author, body, tags: tags.split(',') });
      const newAphorisms = {
        _id: res._id,
        author,
        body,
        tags: tags.split(','),
      };

      setAphorisms(oldState => {
        const newArr = [...oldState.data];
        newArr.unshift(newAphorisms);
        return { ...oldState, data: newArr };
      });
      return true;
    } catch (error) {
      // TODO: Обработать ошибку
      console.log(error);
    }
  };

  const getDataFromModalForm = async data => {
    return await addNewAphorism(data);
  };

  const deleteAphorism = async e => {
    if (e.target.closest('.deleteIcon')) {
      const _id = e.target.closest('.deleteIcon').id;
      try {
        const res = await api('/admin/aphorisms', 'DELETE', { _id });

        if (res.status === 200) {
          setAphorisms(oldState => {
            let newArr = [...oldState.data];
            newArr = newArr.filter(item => item._id !== _id);
            return { ...oldState, data: newArr };
          });
        }
      } catch (error) {
        // TODO: Обработать ошибку
        console.log(error);
      }
    }
  };

  const handlerInput = async data => {
    const currentInput = Object.keys(data);
    const checkIsEmpty = data[currentInput] ? `&${currentInput}=${data[currentInput]}` : '';
    const builtUrl = `/admin/aphorisms?random=false${checkIsEmpty}`;
    const res = await api(builtUrl, 'GET');
    setAphorisms(res.data);
  };

  return (
    <div>
      <ModalRoute path="/admin/aphorisms/modal-test" parentPath="/admin/aphorisms">
        Hello
      </ModalRoute>
      <ModalContainer />

      <Button
        // onClick={inverterModalForm}
        component={LinkModal}
        to="/admin/aphorisms/modal-test"
        style={{ margin: '20px' }}
        variant="contained"
      >
        Добавить афоризм
      </Button>

      <ModalForm
        textButton="Добавить"
        getDataFromModalForm={getDataFromModalForm}
        inverterModalForm={inverterModalForm}
        isOpen={isOpen}
      />
      <AphorismsFilter handlerInput={handlerInput} />

      <AphorismsTable aphorisms={aphorisms} deleteAphorism={deleteAphorism} />
    </div>
  );
};

export default AphorismsPage;
