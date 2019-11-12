import * as React from 'react';
import { Button } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import api from '../../helpers/api';
import AphorismsTable from '../../components/AphorismsTable';
import AphorismsFilter from '../../components/AphorismsFilter';
import AphorismModal from '../../components/AphorismModal';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';

const LinkModal = React.forwardRef((props: any, ref) => <Link innerRef={ref} {...props} />);

interface IAphorism {
  _id?: string;
  author: string;
  body: string;
  tags: any;
}

const AphorismsPage = ({ history }: RouteComponentProps) => {
  const [aphorisms, setAphorisms] = React.useState({ data: [] });

  React.useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await api('/admin/aphorisms?random=false', 'GET');
        setAphorisms(res.data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchAuth();
  }, []);

  const addNewAphorism = async ({ author, body, tags }: IAphorism) => {
    try {
      const res: any = await api('/admin/aphorisms', 'POST', {
        author,
        body,
        tags: tags.split(','),
      });
      const newAphorisms = {
        _id: res.data._id,
        author,
        body,
        tags: tags.split(','),
      };

      history.goBack();
      setAphorisms((oldState: any) => {
        const newArr: IAphorism[] = [...oldState.data];
        newArr.unshift(newAphorisms);
        return { ...oldState, data: newArr };
      });

      return true;
    } catch (error) {
      // TODO: Обработать ошибку
      console.log(error);
    }
  };
  const changeAphorism = async ({ author, body, tags }: IAphorism) => {
    // try {
    //   const res: any = await api('/admin/aphorisms', 'PUT', {
    //     author,
    //     body,
    //     tags: tags.split(','),
    //   });
    //   const newAphorisms = {
    //     _id: res.data._id,
    //     author,
    //     body,
    //     tags: tags.split(','),
    //   };
    //   history.goBack();
    //   setAphorisms((oldState: any) => {
    //     const newArr: IAphorism[] = [...oldState.data];
    //     newArr.unshift(newAphorisms);
    //     return { ...oldState, data: newArr };
    //   });
    //   return true;
    // } catch (error) {
    //   // TODO: Обработать ошибку
    //   console.log(error);
    // }
  };

  const deleteAphorism = async (e: any) => {
    if (e.target.closest('.deleteIcon')) {
      const _id = e.target.closest('.deleteIcon').id;
      try {
        const res = await api('/admin/aphorisms', 'DELETE', { _id });

        if (res.status === 200) {
          setAphorisms((oldState: any) => {
            let newArr: IAphorism[] = [...oldState.data];
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

  const handlerInput = async (data: any) => {
    const currentInput: any = Object.keys(data);
    const checkIsEmpty = data[currentInput] ? `&${currentInput}=${data[currentInput]}` : '';
    const builtUrl = `/admin/aphorisms?random=false${checkIsEmpty}`;
    const res = await api(builtUrl, 'GET');
    setAphorisms(res.data);
  };

  return (
    <div>
      <Button
        component={LinkModal}
        to="/admin/aphorisms/add-aphorism"
        style={{ margin: '20px' }}
        variant="contained"
      >
        Добавить афоризм
      </Button>
      <ModalRoute
        path="/admin/aphorisms/add-aphorism"
        parentPath="/admin/aphorisms"
        component={AphorismModal}
        props={{ textButton: 'Добавить', requestHandler: addNewAphorism }}
      />
      <ModalRoute
        path="/admin/aphorisms/change-aphorism"
        parentPath="/admin/aphorisms"
        component={AphorismModal}
        props={{ textButton: 'Изменить', requestHandler: changeAphorism }}
      />
      <ModalContainer />
      <AphorismsFilter handlerInput={handlerInput} />
      <AphorismsTable aphorisms={aphorisms} deleteAphorism={deleteAphorism} />
    </div>
  );
};

export default AphorismsPage;
