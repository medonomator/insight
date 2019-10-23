import React from 'react';
import api from '../../helpers/api';
import AphorismsTable from '../../components/AphorismsTable';
import { Button } from '@material-ui/core';
import ModalForm from '../../components/ModalForm';

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
    } catch (error) {
      // TODO: Обработать ошибку
      console.log(error);
    }
  };

  const getDataFromModalForm = data => {
    addNewAphorism(data);
  };

  return (
    <div>
      <Button onClick={inverterModalForm} style={{ margin: '20px' }} variant="contained">
        Добавить афоризм
      </Button>
      <ModalForm getDataFromModalForm={getDataFromModalForm} inverterModalForm={inverterModalForm} isOpen={isOpen} />
      <div>AforismsFilter</div>
      <AphorismsTable aphorisms={aphorisms} />
    </div>
  );
};

export default AphorismsPage;
