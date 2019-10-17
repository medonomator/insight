import React from 'react';
import api from '../../helpers/api';
import AphorismsTable from '../../components/AphorismsTable';

const AphorismsPage = () => {
  const [aphorisms, setAphorisms] = React.useState({});
  React.useEffect(() => {
    const fetchAuth = async () => {
      const res = await api('/admin/aphorisms?isAdmin=true', 'GET');
      setAphorisms(res.data);
    };
    fetchAuth();
  }, []);

  return (
    <div>
      {console.log(aphorisms)}
      <div>AforismsFilter</div>
      <div>ModalFormNewAforisms</div>
      <AphorismsTable aphorisms={aphorisms} />
    </div>
  );
};

export default AphorismsPage;
