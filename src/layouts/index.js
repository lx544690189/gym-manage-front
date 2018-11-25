import Layout from '../components/layout/index';

function BasicLayout(props) {
  if (props.location.pathname === '/login') {
    return (
      <div>
        {props.children}
      </div>
    )
  }
  return (
    <Layout>
      {props.children}
    </Layout>
  );
}

export default BasicLayout;
